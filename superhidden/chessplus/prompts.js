const drawPromotionPrompt = function() {
	prctx.clearRect(0,0,prc.width,prc.height);
	
	if (!promoting) {
		return;
	}
	
	let unit = c.width/8;
	prctx.fillStyle = "#FFFFFF88";
	roundRect(unit*1.8, unit*3.3, unit*4.4, unit*1.4, unit/5);
	
	prctx.drawImage(sp[select.color].queen, unit*2, unit*3.5, unit, unit);
	prctx.drawImage(sp[select.color].rook, unit*3, unit*3.5, unit, unit);
	prctx.drawImage(sp[select.color].bishop, unit*4, unit*3.5, unit, unit);
	prctx.drawImage(sp[select.color].knight, unit*5, unit*3.5, unit, unit);
}

const blurBoard = function() {
	if (promoting) {
		c.style.opacity = 0.95*Number(c.style.opacity) + 0.05*0.7;
		blurAmt = 0.95*blurAmt + 0.05*3;
		ctx.filter = "blur("+Math.round(blurAmt)+"px)";
	} else {
		c.style.opacity = 0.9*Number(c.style.opacity) + 0.1*1;
		blurAmt = 0.7*blurAmt + 0.3*0;
		ctx.filter = "blur("+Math.round(blurAmt)+"px)";
	}
}

const roundRect = function(x, y, width, height, r) {
	prctx.beginPath();
	prctx.moveTo(x + r, y);
	prctx.lineTo(x + width - r, y);
	prctx.quadraticCurveTo(x + width, y, x + width, y + r);
	prctx.lineTo(x + width, y + height - r);
	prctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
	prctx.lineTo(x + r, y + height);
	prctx.quadraticCurveTo(x, y + height, x, y + height - r);
	prctx.lineTo(x, y + r);
	prctx.quadraticCurveTo(x, y, x + r, y);
	prctx.closePath();
	prctx.fill();
}