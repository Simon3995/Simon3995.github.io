const MAP_NAME = "nl_gemeenten";

const regionNames = {};
const nameInput = document.getElementById("name-input");

let originalViewBox = null;
let activeAnimationId = null;
let currentPathId = null;

async function loadMap() {
	try {
		// 1 - fetch and parse tab-separated txt file
		const txtResponse = await fetch(`/maps/${MAP_NAME}.txt`);
		const txtData = await txtResponse.text();

		txtData.split('\n').forEach(line => {
			const parts = line.split('\t');
			if (parts.length === 2) {
				const id = parts[0].trim();
				const name = parts[1].trim();
				regionNames[id] = name;
			}
		});

		// 2 - fetch and inject svg file
		const svgResponse = await fetch(`/maps/${MAP_NAME}.svg`);
		const svgData = await svgResponse.text();
		const container = document.getElementById("map-container");
		container.innerHTML = svgData;

		// 3 - store the original viewBox
		const svgElement = container.querySelector('svg');
		if (svgElement) {
			originalViewBox = svgElement.getAttribute('viewBox');
		}

		console.log("Map loaded successfully. Region names loaded:", Object.keys(regionNames).length);
	} catch (error) {
		console.error("Error loading map assets:", error);
	}
}

function animateViewBox(targetX, targetY, targetW, targetH, duration=500) {
	const svgElement = document.querySelector("#map-container svg");
	if (!svgElement) return;

	const currentVB = (svgElement.getAttribute('viewBox') || `${targetX} ${targetY} ${targetW} ${targetH}`)
		.split(' ')
		.map(Number);
	
	const startX = currentVB[0];
	const startY = currentVB[1];
	const startW = currentVB[2];
	const startH = currentVB[3];

	const startTime = performance.now();

	if (activeAnimationId) cancelAnimationFrame(activeAnimationId);

	function step(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const ease = progress < 0.5
			? 2 * progress * progress
			: -1 + (4 - 2 * progress) * progress;

		const currentX = startX + (targetX - startX) * ease;
        const currentY = startY + (targetY - startY) * ease;
        const currentW = startW + (targetW - startW) * ease;
        const currentH = startH + (targetH - startH) * ease;

		svgElement.setAttribute('viewBox', `${currentX} ${currentY} ${currentW} ${currentH}`);
		
		if (progress < 1) {
			activeAnimationId = requestAnimationFrame(step);
		}
	}

	activeAnimationId = requestAnimationFrame(step);
}

function highlight(path_id) {
	// remove current highlights
	const currentHighlights = document.querySelectorAll('.highlighted');
	currentHighlights.forEach(el => el.classList.remove('highlighted'));

	// add highlight to target
	const target = document.getElementById(path_id);
	if (target) {
		target.classList.add('highlighted');
	}
}

function zoomTo(path_id) {
	const target = document.getElementById(path_id);
	const svgElement = document.querySelector("#map-container svg");

	if (target && svgElement) {
		const bbox = target.getBBox();

		const paddingX = bbox.width * 5;
		const paddingY = bbox.height * 5;

		const newX = bbox.x - paddingX;
		const newY = bbox.y - paddingY;
		const newWidth = bbox.width + (paddingX * 2);
		const newHeight = bbox.height + (paddingY * 2);

		animateViewBox(newX, newY, newWidth, newHeight);
	} else {
		console.warn(`Cannot zoom: Region ${path_id} or SVG not found.`);
	}
}

function resetZoom() {
	const svgElement = document.querySelector("#map-container svg");

	if (svgElement) {
		const bbox = svgElement.getBBox();

		const paddingX = bbox.width * 0.05;
		const paddingY = bbox.height * 0.05;

		const newX = bbox.x - paddingX;
		const newY = bbox.y - paddingY;
		const newWidth = bbox.width + (paddingX * 2);
		const newHeight = bbox.height + (paddingY * 2);

		animateViewBox(newX, newY, newWidth, newHeight);
	}
}

function normalizeName(str) {
	return str ? str.trim().toLowerCase() : '';
}

function nextQuestion() {
	const pathIds = Object.keys(regionNames);
	if (pathIds.length === 0) return;

	const randomIndex = Math.floor(Math.random() * pathIds.length);
	currentPathId = pathIds[randomIndex];

	highlight(currentPathId);
	zoomTo(currentPathId);

	nameInput.value = '';
	nameInput.focus();
}

function triggerFeedback(type) {
	nameInput.classList.remove('correct', 'incorrect');
	void nameInput.offsetWidth; // force DOM reflow so transition resets cleanly if triggered twice quickly
	nameInput.classList.add(type);
	requestAnimationFrame(() => {
		nameInput.classList.remove(type);
	})
}

function checkAnswer() {
	if (!currentPathId) return;

	const userGuess = normalizeName(nameInput.value);
	const correctAnswer = normalizeName(regionNames[currentPathId]);

	if (!userGuess) return; // ignore empty submission

	if (userGuess === correctAnswer) {
		triggerFeedback('correct');
		setTimeout(nextQuestion, 400);
	} else {
		triggerFeedback('incorrect');
		setTimeout(nextQuestion, 400);
	}
}

nameInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkAnswer();
	}
});

loadMap().then(nextQuestion);
