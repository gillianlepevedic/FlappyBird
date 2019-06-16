class Bird {
	constructor(nom, chemin1, chemin2, chemin3) {
	this.name = nom;
	this.ailes;
	this.picture1 = picture ("picture1", chemin1);
	this.picture2 = picture ("picture1", chemin2);	
	this.picture3 = picture ("picture1", chemin3);
	this.coordonxerX= 197;
	this.coordonxerY= 290;
	this.vitesse=0;
	}
}

class Pipe {
	constructor (nom, niveau){
	this.name = nom;
	this.pictureH = picture ("imageBas", "./Images/tubeH.png");
	this.pictureB = picture ("imageHaut", "./Images/tubeB.png");
	this.coordonxerX=450;
	this.coordonxerY=100+(350*niveau);
	this.niveau = niveau
	}
}

let flappyBird = new Bird("oiseau","./Images/oiseau1.png","./Images/oiseau2.png","./Images/oiseau3.png");
let bond;
let tuyau=[];

function draw () {
	let ctx = document.getElementById('canvas').getContext('2d');
	let fond = picture ("fond","./Images/fond.png")
	let sol = picture ("sol","./Images/sol.png");
	console.log (fond);
	console.log (sol);
	console.log (flappyBird);
	setInterval(defilement,1,ctx, sol,fond);
	setInterval(randomPipe,2000);
}


function picture (nom, chemin){
	nom = new Image();
	nom.src = chemin;
	return nom
}

function defilement (canva, imgsol, imgfond) {
	animationBird ();
	let time = new Date();
	canva.clearRect(0,0,550,800);
	canva.drawImage(imgfond, 0, 0);
	imgsol.X= time.getMilliseconds()/15.4;
	if (flappyBird.coordonxerY> 587){
		clearInterval (bond);
	}

	canva.drawImage(flappyBird.ailes, flappyBird.coordonxerX, flappyBird.coordonxerY);
	for (let i =tuyau.length-1; i > tuyau.length-4; i=i-1) {
		if (i>1) {
			tuyau[i].coordonxerX = tuyau[i].coordonxerX-0.5;
			canva.drawImage(tuyau[i].pictureH,tuyau[i].coordonxerX, tuyau[i].coordonxerY-496);
			canva.drawImage(tuyau[i].pictureB,tuyau[i].coordonxerX, tuyau[i].coordonxerY+150);
		}
	}
	canva.drawImage(imgsol,-imgsol.X, 627);
}

document.addEventListener('keydown', saut);

function saut() {
	clearInterval (bond);
	//console.log ("touche");
	let t0 = new Date();
	bond =setInterval(vol,1,t0,flappyBird.coordonxerY);
}

function vol (t0,Y){
	let vitesseAvant = flappyBird.coordonxerY;
	let time= new Date();
	let deltaT = time-t0;
	if (deltaT < 1000) {
		flappyBird.coordonxerY = Y+75*Math.sin(deltaT/318+3.14);
	}else{
		flappyBird.coordonxerY = flappyBird.coordonxerY-flappyBird.vitesse;
	}
	flappyBird.vitesse = vitesseAvant-flappyBird.coordonxerY;
	//console.log (flappyBird.vitesse);
}

function animationBird() {
	let time= new Date();
	for (let i = 0; i <=3; i=i+3) {
		if (time.getMilliseconds()<(i+1)*166.7) {
			flappyBird.ailes = flappyBird.picture1;
			return
		}
		if (time.getMilliseconds()<(i+2)*166.7) {
			flappyBird.ailes = flappyBird.picture2;
			return
		}
		if (time.getMilliseconds()<(i+3)*166.7) {
			flappyBird.ailes = flappyBird.picture3;
			return
		}
	}
}

function randomPipe() {
	tuyau[tuyau.length] = new Pipe ("pipe"+tuyau.length,Math.random());
	//console.log (tuyau);
}