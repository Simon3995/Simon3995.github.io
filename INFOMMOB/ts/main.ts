import {
  FilesetResolver,
  HandLandmarkerResult,
  DrawingUtils,
  GestureRecognizer,
  GestureRecognizerResult,
  Category,
  Landmark,
  NormalizedLandmark,
  BoundingBox
} from "@mediapipe/tasks-vision"

// Countdown timer

let countdown = 5; // Default time in seconds
const startCountdownTimer = async () => {
  for(let i = countdown; i > -1; --i)
  {
    await new Promise(r => { setTimeout(r, 1000); });
    console.log(i);
  }
};

// Access camera zoom
let zoomFactor = 1;

let gestureRecognizer = undefined as GestureRecognizer;
let drawingUtils = undefined as DrawingUtils;

// Download and create model
const createGestureRecognizer = async () => {

  const taskVisionWasmURL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
  const vision = await FilesetResolver.forVisionTasks(taskVisionWasmURL);
  
  const handModelURL = "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";
  const handsCount = 1;

  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: handModelURL,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: handsCount
  });

  let cpuContext = canvasElement.getContext("2d");
  let gpuContext = canvasElement.getContext("webgl2");
  drawingUtils = await new DrawingUtils(cpuContext, gpuContext);
};

// Check if webcam access is supported
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// HTML elements
const video = document.getElementById("video_stream") as HTMLVideoElement;
const canvasElement = document.getElementById("render_canvas") as HTMLCanvasElement;
const gestureElement = document.getElementById("gesture");
const gallery = document.getElementById("gallery");
const settings = document.getElementById("settings");
const captureButton = document.getElementById("capture_button");

let isWebcamRunning = false;

function enableWebcam() {
  if(!gestureRecognizer)
  {
    return false;  
  }

  isWebcamRunning = true;

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }).then((stream) => {
    video.srcObject = stream;
    video.addEventListener("loadeddata", onNewWebcamFrameReceived);
  }).catch(err => {
    // Permissions denied
    isWebcamRunning = false;
  });

  return true;
};

// Init app
createGestureRecognizer().then(() => { console.log(enableWebcam()); });

let lastVideoTickTime = -1;
let results = undefined as GestureRecognizerResult;
let lastUpdateTickTime = performance.now();

let capture_photo = () => {
  console.log("Picture timer started!");
  countdownTimer = 5;
  startCountdownTimer().then(() => { 
  
  if(flashEnabled)
  {
    flashIntensity = 1000;
  }
  
  areGesturesEnabled = true; 
});

};

let close_windows = () => {
  settings.style.display = "none";
  gallery.style.display = "none";
}

const open_gallery = () => {
  gallery.style.display = "inline-block";
  settings.style.display = "none";
}

const open_settings = function() {
  settings.style.display = "inline-block";
  gallery.style.display = "none";
}

/*

settings:
- photo taking timer -> 0-10 seconds
- panning speed -> 1-4x speed

gallery:
- displaying pictures

photo button:
- fill with color
- store picture

*/

// Plugging callbacks for HTML elements
document.getElementById("gallery_button").addEventListener("click", open_gallery);
document.getElementById("settings_button").addEventListener("click", open_settings);
document.getElementById("capture_button").addEventListener("click", capture_photo);
document.getElementById("settings_button_close").addEventListener("click", close_windows);
document.getElementById("gallery_button_close").addEventListener("click", close_windows);

const computeBaricenter = (landmarks: NormalizedLandmark[]) => {

  let cx = 0;
  let cy = 0;

  landmarks.forEach((lan: NormalizedLandmark) => {
    cx += lan.x;
    cy += lan.y;
  });

  const videoSize = video.getBoundingClientRect();
  cx = (cx / landmarks.length) * (videoSize.width);
  cy = (cy / landmarks.length) * (videoSize.height);
  return [cx, cy];
};

// Doesnt work
const computeZDepth = (landmarks: NormalizedLandmark[]) => {

  let cz = 0;

  landmarks.forEach((lan: NormalizedLandmark) => {
    cz += lan.z;
    //console.log(lan.z);
  });

  cz = (cz / landmarks.length) * video.videoWidth;

  return cz;
};

let currentGesture = "None";
let currentAnomalousGesture = "";
let timeSinceCurrentGesture = 0;
let timeSinceAnomalousGesture = 0;
let transitionTime = 0.1;
let areGesturesEnabled = true;

let isFirstFrame = true;
let panOriginX = 0;
let panOriginY = 0;
let lastDirX = 0;
let lastDirY = 0;
let flashEnabled = false;
let flashIntensity = 1;

let lmX = 0;
let lmY = 0;

let enableFlashToggle = true;

// put a setting in the UI to enable / disable this boolean
let depthBasedZoom = false;

let baseDepth = 0;
let currentDepth = 0;
let currentDepthSamples = 5;
let baseDepthSamplesCount = 0;
let currentDepthSamplesCount = 0;
let baseDepthSamples = 30;
let zoomingSpeed = 0.05;
let countdownTimer = 0;
let zoomingMethod = "thumb1";

let emojiMap : {[name: string] : string} = {};

emojiMap["Thumb_Up"] = "👍";
emojiMap["Thumb_Down"] = "👎";
emojiMap["Pointing_Up"] = "👆";
emojiMap["Open_Palm"] = "🤚";
emojiMap["Closed_Fist"] = "👊";
emojiMap["Victory"] = "✌️";
emojiMap["ILoveYou"] = "🤘";
emojiMap["None"] = "";

// update settings when changed
document.getElementById("zoomspeed").onchange = function(e) {
  let t = e.target as HTMLInputElement;
  zoomingSpeed = Number(t.value);
}
let methods = document.querySelectorAll('input[name="zoom_method"]');
for (const m of methods) {
  const method = m as HTMLInputElement;
  method.onchange = () => {
    let zoommethod_elem = document.querySelector(`input[name="zoom_method"]:checked`) as HTMLInputElement;
    zoomingMethod = zoommethod_elem.value;
  }
}

const GetTransformString = (applyZoom: boolean = true) => {
  const videoSize = video.getBoundingClientRect();

  const maxX = (videoSize.width - window.innerWidth) * 0.5;
  const minX = -maxX;
  const maxY = (videoSize.height - window.innerHeight) * 0.5;
  const minY = -maxY;
  
  lmX = Math.max(Math.min(maxX, lmX), minX);
  lmY = Math.max(Math.min(maxY, lmY), minY);
  
  return  "transform: translateX(calc(-50% + (clamp((" + minX + "px), (" + lmX + "px), (" + maxX + "px)))))" +
          "translateY(calc(-50% + (clamp((" + minY + "px), (" + lmY + "px), (" + maxY + "px)))))" +
          "rotateY(180deg)" + (applyZoom ? ("scale(" + zoomFactor + ")") : "");
};

const onNewWebcamFrameReceived = async () => {

  // Measure delta time
  let currentUpdateTickTime = performance.now();
  let deltaTime = (currentUpdateTickTime - lastUpdateTickTime) / 1000;
  lastUpdateTickTime = currentUpdateTickTime;

  // Adjust video
  const videoSize = video.getBoundingClientRect();
  canvasElement.style.width = videoSize.width + "px";
  canvasElement.style.height = videoSize.height + "px";
  canvasElement.width = videoSize.width;
  canvasElement.height = videoSize.height;

  if (lastVideoTickTime !== video.currentTime) 
  {
    lastVideoTickTime = video.currentTime;
    results = gestureRecognizer.recognizeForVideo(video, performance.now());

    // Update hands tracking and gestures data
    if(results.gestures.length > 0 && areGesturesEnabled)
    {
      const handIndex = 0;
      const bestGesture = results.gestures[handIndex].reduce((prev: Category, curr: Category) => {
        return prev.score > curr.score ? prev : curr;
      });
      
      //console.log(computeZDepth(results.landmarks[0]));

      let detectedGesture = bestGesture.categoryName;
      if(currentGesture === detectedGesture && currentGesture !== "None")
      {
        timeSinceCurrentGesture += deltaTime;
        //console.log(timeSinceCurrentGesture);
        let isFree = true;
        // Custom action triggers (hardcoded for now)

        if(zoomingMethod.includes("distance"))
        {
          if(isFree && (currentGesture == "Thumb_Up" || currentGesture == "Pointing_Up") && timeSinceCurrentGesture >= 2)
          {
            timeSinceCurrentGesture = 0;
            areGesturesEnabled = false;
            capture_photo();
            isFree = false;
          }
          // Zoom in-out commands
          if(isFree && currentGesture == "Open_Palm" && timeSinceCurrentGesture >= transitionTime)
          {
            if(isFirstFrame)
            {
              isFirstFrame = false;
              baseDepth = 0;
              baseDepthSamplesCount = 0;
              currentDepthSamplesCount = 0;
              currentDepth = 0;
            }
            else if(baseDepthSamplesCount < baseDepthSamples)
            {
              baseDepth += computeZDepth(results.landmarks[handIndex]) / baseDepthSamples;
              baseDepthSamplesCount += 1;
            }
            else if(currentDepthSamplesCount < currentDepthSamples)
            {
              currentDepth += computeZDepth(results.landmarks[handIndex]) / currentDepthSamples;
              currentDepthSamplesCount += 1;
            }
            else
            {
              // moving average
              currentDepth = currentDepth + (computeZDepth(results.landmarks[handIndex]) - currentDepth) / currentDepthSamples;

              if(Math.abs(currentDepth - baseDepth) > 1.0)
              {
                if (zoomingMethod == "distance1" || zoomingMethod == "distance2") {  
                  //console.log(currentDepth + ", " + baseDepth);
                  if((zoomingMethod == "distance1") ? (currentDepth > baseDepth) : (baseDepth > currentDepth))
                  {
                    // further away
                    zoomFactor = Math.max(1, zoomFactor - zoomingSpeed);
                  }
                  else
                  {
                    // closer
                    zoomFactor = Math.min(5, zoomFactor + zoomingSpeed);
                  }
                }
              }
            }

            video.setAttribute("style", GetTransformString());
            canvasElement.setAttribute("style", GetTransformString(false));
            isFree = false;
          }
        }
        else
        {
          if(isFree && currentGesture == "Open_Palm" && timeSinceCurrentGesture >= 2)
          {
            timeSinceCurrentGesture = 0;
            areGesturesEnabled = false;
            capture_photo();
            isFree = false;
          }
          if (zoomingMethod.includes("thumb")) {
            // Zoom in-out commands
            if(isFree && (currentGesture == "Thumb_Up" || currentGesture == "Pointing_Up") && timeSinceCurrentGesture >= transitionTime)
            {
              //timeSinceCurrentGesture = 0;
              zoomFactor = (zoomingMethod == "thumb1") ? Math.min(5, zoomFactor + zoomingSpeed) : Math.max(1, zoomFactor - zoomingSpeed);
              video.setAttribute("style", GetTransformString());
              canvasElement.setAttribute("style", GetTransformString(false));
              isFree = false;
            }
            if(isFree && currentGesture == "Thumb_Down" && timeSinceCurrentGesture >= transitionTime)
            {
              //timeSinceCurrentGesture = 0;
              zoomFactor = (zoomingMethod == "thumb1") ? Math.max(1, zoomFactor - zoomingSpeed) : Math.min(5, zoomFactor + zoomingSpeed);
              video.setAttribute("style", GetTransformString());
              canvasElement.setAttribute("style", GetTransformString(false));
              isFree = false;
            }
          }
        }

        // Panning
        if(isFree && currentGesture == "Closed_Fist" && timeSinceCurrentGesture >= 0.2)
        {
          isFree = false;
          let [cx, cy] = computeBaricenter(results.landmarks[handIndex]);
          if(isFirstFrame)
          {
            isFirstFrame = false;  
            panOriginX = cx;
            panOriginY = cy;
          }
          else
          {
            lastDirX = panOriginX - cx;
            lastDirY = cy - panOriginY;

            const norm = Math.sqrt(lastDirX*lastDirX+lastDirY*lastDirY);
            if(norm > 0.00001)
            {
              lastDirX /= norm;
              lastDirY /= norm;
            }
            else
            {
              lastDirX = 0;
              lastDirY = 0;
            }

            lmX += lastDirX * 300 * deltaTime;
            lmY += lastDirY * 300 * deltaTime;

            // TODO:We should decrease this value as the distance from the camera is increased
            if(norm > 30) // min distance from centroid to trigger panning
            {
              video.setAttribute("style", GetTransformString());
              canvasElement.setAttribute("style", GetTransformString(false));
            }
          }

          /*
          console.log(panOriginX + " - " + panOriginY);
          const bb: BoundingBox = {
            originX: panOriginX - 5,
            originY: panOriginY - 5,
            width: 10,
            height: 10,
            angle: 0
          };

          drawingUtils.drawBoundingBox(bb);
          */
        }
        // Flash
        if(isFree && currentGesture == "Victory" && timeSinceCurrentGesture >= 0.5 && enableFlashToggle)
        {
          flashEnabled = !flashEnabled;
          timeSinceCurrentGesture = 0;
          console.log("Flash " + (flashEnabled ? "enabled" : "disabled"));
          enableFlashToggle = false;
          isFree = false;
        }

        //console.log("Normal: " + currentGesture + " since " + timeSinceCurrentGesture + " seconds");
      }
      else
      {
        if(currentAnomalousGesture !== detectedGesture)
        {
          timeSinceAnomalousGesture = deltaTime;
          currentAnomalousGesture = detectedGesture;
        }
        else
        {
          timeSinceAnomalousGesture += deltaTime;
        }

        if(timeSinceAnomalousGesture >= transitionTime)
        {
          currentGesture = currentAnomalousGesture;
          timeSinceAnomalousGesture = 0;
          currentAnomalousGesture = "";
          timeSinceCurrentGesture = 0;
          isFirstFrame = true;
          enableFlashToggle = true;
        }
        else
        {
          //console.log("Anomalous: " + currentAnomalousGesture + " since " + timeSinceAnomalousGesture);
        }
      }
    }
    else
    {
      if(currentGesture !== "None")
      {
        timeSinceCurrentGesture = 0;
        isFirstFrame = true;
        enableFlashToggle = true;
        currentGesture = "None";
      }
      else
      {
        timeSinceCurrentGesture += deltaTime;
      }
    }
    
    if(currentGesture === "None")
    {
      gestureElement.style.setProperty("display", "none");
    }
    else
    {
      gestureElement.style.setProperty("display", "block");
      gestureElement.textContent = emojiMap[currentGesture];
    }

    
  }

  if (results.landmarks) 
  {
    // Debug / Feedback
    for (const landmarks of results.landmarks) 
    {
      drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
         color: "#00FF00",
         lineWidth: 5
      });
      drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
    }
  }

  if(flashEnabled)
  {
    video.style.filter = "brightness(" + flashIntensity + ")";
    flashIntensity = (flashIntensity + 1) / 2;
  }

  // Call this function again to keep predicting when the browser is ready.
  if (isWebcamRunning === true) 
  {
    window.requestAnimationFrame(onNewWebcamFrameReceived);
  }

  let cbc = countdownTimer ? "#0088cc" : "#00cc00"; // capture button colour
  let cbp = 0; // capture button progress bar [0-1]
  if (countdownTimer) {
    cbp = countdownTimer / countdown;
  } else if (currentGesture === "Open_Palm") {
    cbp = timeSinceCurrentGesture / 2;
  }
  captureButton.style.background = `linear-gradient(90deg, ${cbc} 0%, ${cbc} ${cbp*100}%, #fffa ${cbp*100}%)`;
  countdownTimer = Math.max(0, countdownTimer - deltaTime);

  // display current zoom level
  document.getElementById("zoomlevel").innerHTML = `${zoomFactor.toFixed(1)}x zoom`;
};
