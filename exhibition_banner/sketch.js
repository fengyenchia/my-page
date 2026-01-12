// let mainHue;
// let overAllTexture;

// function preload() {
// 	overAllTexture = loadImage(
// 		"https://fengyenchia.github.io/archive-storage/openprocessing/texture/4.jpg"
// 	);
// }

// let myCase;
// let mycolor_index = 0;
// async function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	background(20);
// 	colorMode(HSB, 360, 100, 100, 100);
// 	noLoop();
// 	mainHue = random(360);
// 	myCase = random();
// }

// async function draw() {
// 	translate(width / 2, height / 2);
// 	let counts = width * 2;

// 	push();
// 	let h = mainHue;
// 	let s = random(40, 60);
// 	let b = random(80, 100);
// 	for (let i = 0; i < counts; i++) {

// 		if (myCase < 0) {
// 			fill(h+random(-30, 30), s, b - i / 5);
// 			if(random()<0.1){
// 				fill(h+random(-30, 30), 0, 100 - i / 6);
// 			}
// 		}
// 		else {
// 			fill(100 - (10 + i / 5));
// 		}
// 		noStroke();
// 		rectMode(CENTER);
// 		rect(random(-width / 20, width / 20), -20 - random(10) - i, i/8+width / 16, i/8+width / 10, width / 200);
// 		await sleep(5);
// 		rotate(PI / 10);
// 	}
// 	pop();

// 	push();
// 	blendMode(MULTIPLY)	;
// 	image(overAllTexture, -width / 2, -height / 2, width, height);
// 	pop();
// }

// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

let mainHue;
let overAllTexture;

let myCase;
let drawingTask = null; // 用來中斷舊的 async 繪圖

function preload() {
	overAllTexture = loadImage(
		"https://fengyenchia.github.io/archive-storage/openprocessing/texture/4.jpg"
	);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(3);
	colorMode(HSB, 360, 100, 100, 100);
	noStroke();
	startGenerate();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	startGenerate(); // resize 時重新生成
}

function startGenerate() {
	mainHue = random(360);
	myCase = random();

	// 建立一個新的 task reference
	const task = {};
	drawingTask = task;

	generate(task);
}

async function generate(task) {
	background(20);

	// 🔒 鎖住 transform 狀態，避免旋轉累積
	push();
	push()
	resetMatrix();
	
	let counts = floor(width * 2);
	
	let h = mainHue;
	let s = random(40, 60);
	let b = random(80, 100);
	
	translate(width / 2, height / 2);
	for (let i = 0; i < counts; i++) {
		
		// ❌ 如果這不是目前最新的 task，就中斷
		if (drawingTask !== task) {
			pop();
			translate(width / 2, height / 2);
			return;
		}
		
		if (myCase < 0.5) {
			fill(h + random(-30, 30), s, b - i / 5);
			if (random() < 0.1) {
				fill(h + random(-30, 30), 0, 100 - i / 6);
			}
		} else {
			fill(0, 0, 100 - (10 + i / 5));
		}

		rectMode(CENTER);
		rect(
			random(-width / 20, width / 20),
			-20 - random(10) - i,
			i / 8 + width / 16,
			i / 8 + width / 10,
			width / 200
		);

		rotate(PI / 10);
		await sleep(5);
	}

	pop(); // 🔓 還原 transform 狀態
	// 疊材質
	blendMode(MULTIPLY);
	image(overAllTexture, 0, 0, width, height);
	blendMode(BLEND);
	
	pop();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
