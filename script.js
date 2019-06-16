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

let flappyBird = new Bird("oiseau","./Images/oiseau1.png","./Images/oiseau2.png","./Images/oiseau3.png");//creation du flappyBird
let bond;
let tuyau=[];
let finish=[];

function draw () {
	finish[0]=false;
	let ctx = document.getElementById('canvas').getContext('2d');// craetion canva
	let fond = picture ("fond","./Images/fond.png")
	let sol = picture ("sol","./Images/sol.png");
	console.log (fond);
	console.log (sol);
	console.log (flappyBird);
	randomPipe();
	finish[1] = setInterval(verif,1);
	finish[2] = setInterval(defilement,1,ctx, sol,fond);
	saut();
}


function picture (nom, chemin){							//function pour s'implifier le chargement d'une image
	nom = new Image();
	nom.src = chemin;
	return nom
}

function defilement (canva, imgsol, imgfond) {
	animationBird ();
	let time = new Date();
	canva.clearRect(0,0,550,800);						//netoyage du canva
	canva.drawImage(imgfond, 0, 0);						//image de fond
	imgsol.X= time.getMilliseconds()/15.4;				//decalage sol
	if (flappyBird.coordonxerY> 587){					//stop oiseau si il touche le bas
		stop ();
		clearInterval (finish[2]);
	}
	for (let i =0; i <=tuyau.length-1; i++) {			//decalage des tuyaux
			tuyau[i].coordonxerX = tuyau[i].coordonxerX-0.5;
			canva.drawImage(tuyau[i].pictureH,tuyau[i].coordonxerX, tuyau[i].coordonxerY-496);
			canva.drawImage(tuyau[i].pictureB,tuyau[i].coordonxerX, tuyau[i].coordonxerY+150);
	}
	canva.drawImage(flappyBird.ailes, flappyBird.coordonxerX, flappyBird.coordonxerY);// place l'oiseaux a ces coordonner
	canva.drawImage(imgsol,-imgsol.X, 627);
	for (let i =0; i <= tuyau.length-1; i++) {			//reinitialisation des tuyau quand on arrive au bout
		if (tuyau[i].coordonxerX< -80) {
			tuyau[i]= new Pipe ("pipe"+tuyau.length,Math.random());
		}
	}
}

document.addEventListener('keydown', saut);				//lance function saut si on apuis sur une touche

function saut() {
	if (finish[0]== false){
		clearInterval (bond);							//stop l'oiseau
		//console.log ("touche");
		let t0 = new Date();
		bond =setInterval(vol,1,t0,flappyBird.coordonxerY);	//relance l'oiseau au debut d'un saut
	}
}

function vol (t0,Y){
	let vitesseAvant = flappyBird.coordonxerY;
	let time= new Date();
	let deltaT = time-t0;
	if (deltaT < 1000) {
		flappyBird.coordonxerY = Y+75*Math.sin(deltaT/318+3.14);//parabole 
	}else{
		flappyBird.coordonxerY = flappyBird.coordonxerY-flappyBird.vitesse;//fin de la chute
	}
	flappyBird.vitesse = vitesseAvant-flappyBird.coordonxerY;//calcul vitesse oiseau
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
	while (tuyau.length<2){								//rempli le tableau des tuyaux
		tuyau[tuyau.length] = new Pipe ("pipe"+tuyau.length,Math.random());
		//tuyau[tuyau.length-2].coordonxerX= tuyau[tuyau.length-2].coordonxerX+200;
		console.log (tuyau);
	}
	for (let i = 0; i<= tuyau.length-1; i++) {			//décale les tuyaux entre eut de 261px 		
		tuyau[i].coordonxerX= tuyau[i].coordonxerX+265*i;
	}
}

function verif (){
	for (let i=0 ; i<=tuyau.length-1; i++){
		if (flappyBird.coordonxerX > tuyau[i].coordonxerX-56) {
			if (flappyBird.coordonxerX < tuyau[i].coordonxerX+80){
				if(flappyBird.coordonxerY>tuyau[i].coordonxerY+110){
					//console.log(1);
					stop();
				}
				if(flappyBird.coordonxerY<tuyau[i].coordonxerY){
					//console.log(2);
					stop();
				}	
			}
		}
	}
}

function stop() {
	finish[0] = true;
	console.log("stop");
	//clearInterval (stopD);
	clearInterval (bond);
	clearInterval (finish[1]);
	setInterval(fin,10);
}

function fin() {
	flappyBird.coordonxerY = flappyBird.coordonxerY+5
}