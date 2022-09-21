// @ts-check
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const textInput = document.querySelector('textarea');
const defaultText = textInput.value;
let inverted = false;
let bgColor = 'white';
let textColor = 'black';

const commonInstance = new NfcEIWCommon(canvas);
const clearCanvas = commonInstance.clearCanvas.bind(commonInstance);

/**
 * Adapted from https://stackoverflow.com/a/65433398/11447682
 * @param {string} text
 * @param {string} fontFace
 */
function fitAndFillHuisnummer(text, fontFace = 'Arial', paddingW = 4) {
	if (!text) {
		clearCanvas();
		return;
	}
	const { height: canvasH, width: canvasW } = canvas;
	let fontSize=0;

	if (!textInputline1.value && !textInputline2.value){
			 fontSize = getFontSizeToFit(text, fontFace, canvasW - (paddingW * 2), canvasH);

		} else{
				 fontSize = getFontSizeToFit(text, fontFace, canvasW - 20, canvasH);

		if (fontSize>50) { fontSize=45;}
		}

	ctx.fillStyle = textColor;
	ctx.font = fontSize + `px ${fontFace}`;

	ctx.textBaseline = 'top';
	if (!textInputline1.value && !textInputline2.value){
		ctx.textBaseline = 'middle';

	ctx.textAlign = 'center';
}else
{
	ctx.textAlign = 'left';

}

	const x = 0;
	const y = 0;
	const lines = text.match(/[^\r\n]+/g);
	for (let i = 0; i < lines.length; i++) {
		let xL = (canvasW - x) / 2;
		let yL = y + (canvasH / (lines.length + 1)) * (i + 1);
	if (!textInputline1.value && !textInputline2.value){
			ctx.fillText(lines[i], xL, yL);

} else {
		ctx.fillText(lines[i], 10, 10);
		}
	}
}
function fitAndFillsecond(text, fontFace = 'Arial', paddingW = 4,lijn) {
if (!text) {
		return;
	}
	const { height: canvasH, width: canvasW } = canvas;
	let fontSize = getFontSizeToFit(text, fontFace, canvasW - 20, 25);

	ctx.fillStyle = textColor;
	ctx.font = fontSize + `px ${fontFace}`;

	ctx.textBaseline = 'top';

	const x = 0;
	const y = 0;
	const lines = text.match(/[^\r\n]+/g);
	for (let i = 0; i < lines.length; i++) {
		let xL = (canvasW - x) / 2;
		let yL = y + (canvasH / (lines.length + 1)) * (i + 1);

		ctx.fillText(lines[i], 10, 35+(lijn*25));
	}
}

/**
 * Adapted from https://stackoverflow.com/a/65433398/11447682
 * @param {string} text
 * @param {string} fontFace
 * @param {number} width
 * @param {number} height
 */
function getFontSizeToFit(text, fontFace, width, height) {
	const lineSpacingPercent = 20;
	ctx.font = `1px ${fontFace}`;

	let fitFontWidth = Number.MAX_VALUE;
	let lineCount = 1;
	const lines = text.match(/[^\r\n]+/g);
	if (lines) {
		lineCount = lines.length;
		lines.forEach((line) => {
			fitFontWidth = Math.min(fitFontWidth, width / ctx.measureText(line).width);
		});
	}
	let fitFontHeight = height / (lineCount * (1 + (lineSpacingPercent / 100)));
	return Math.min(fitFontHeight, fitFontWidth);
}

/**
 * Normal operation is black text on white, but you can set inverted
 * @param {boolean} [updatedInverted]
 */
function setInverted(updatedInverted) {
	inverted = typeof updatedInverted === 'boolean' ? updatedInverted : !inverted;
	if (inverted) {
		bgColor = 'black';
		textColor = 'white';
	} else {
		bgColor = 'white';
		textColor = 'black';
	}
	renderToCanvas();
}

function drawBg() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderToCanvas() {
	clearCanvas();
	drawBg();
	fitAndFillHuisnummer(textInput.value);
	fitAndFillsecond(textInputline1.value,'Arial',4,1);
	fitAndFillsecond(textInputline2.value,'Arial',4,2);

}

renderToCanvas();
setTimeout(renderToCanvas, 200);
	setInverted();

// Attach listeners
textInput.addEventListener('keyup', renderToCanvas);
textInputline1.addEventListener('keyup', renderToCanvas);
textInputline2.addEventListener('keyup', renderToCanvas);

textInputline1.addEventListener("keydown", function(e){
    /*
     * keyCode: 8
     * keyIdentifier: "U+0008"
    */
    console.log(e.key);
    if(e.key == 'Backspace') {
setTimeout(renderToCanvas, 200);
    }
});
textInputline2.addEventListener("keydown", function(e){
    /*
     * keyCode: 8
     * keyIdentifier: "U+0008"
    */
    console.log(e.key);
    if(e.key == 'Backspace') {
setTimeout(renderToCanvas, 200);
    }
});
textInput.addEventListener("keydown", function(e){
    /*
     * keyCode: 8
     * keyIdentifier: "U+0008"
    */
    console.log(e.key);
    if(e.key == 'Backspace') {
setTimeout(renderToCanvas, 200);
    }
});

document.querySelector('button#reset').addEventListener('click', () => {
	textInput.value = defaultText;
	setInverted(false);
	renderToCanvas();
});
document.querySelector('button#setInverted').addEventListener('click', () => {
	setInverted();
});
