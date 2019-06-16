class Bird {
	constructor(nom, chemin1, chemin2, chemin3) {
	this.name = nom;
	this.ailes;
	this.picture = [picture (chemin1),picture (chemin2),picture (chemin3)];//mets les differnet type d'ailes dans une tableau
	this.coordoneeX= 197;
	this.coordoneeY= 290;
	this.vitesse=0;
	}
}
class Pipe {
	constructor (nom, niveau){
	this.name = nom;
	this.pictureH = picture ("./Images/tubeH.png");
	this.pictureB = picture ("./Images/tubeB.png");
	this.coordoneeX=450;
	this.coordoneeY=100+(350*niveau);
	this.niveau = niveau;
	}
}

const flappyBird = new Bird("oiseau","./Images/oiseau1.png","./Images/oiseau2.png","./Images/oiseau3.png");//creation du flappyBird
let canva;
let tuyau=[];
let finish=false;
let start =false;
let id=[];				//ID0=verif ID1=defillement ID2=vol ID3=fin

function draw () {
	canva = document.getElementById('canvas').getContext('2d');// craetion canva
	let fond = picture ("./Images/fond.png");
	let sol = picture ("./Images/sol.png");
	let gameOver= picture("./Images/GameOver.png");
	console.log (fond);
	console.log (sol);
	console.log (gameOver);
	console.log (flappyBird);
	randomPipe();											//initialise les pipes
	id[0] = setInterval(verif,1);							//lance la verif
	id[1] = setInterval(defilement,1, sol,fond,gameOver);	//lance les annimations
}


function picture (chemin){								//function pour s'implifier le chargement d'une image
	let nom = new Image();
	nom.src = chemin;
	return nom;
}

function defilement (imgsol, imgfond,gameOver) {
	animationBird ();
	let time = new Date();
	canva.clearRect(0,0,550,800);							//nettoyage du canva
	canva.drawImage(imgfond, 0, 0);							//image de fond
	if (finish==false) {
		imgsol.X= time.getMilliseconds()/15.4;				//decalage du sol
	}
	if (start ==true) {
		for (let i=0;i <=tuyau.length-1; i++) {			//decalage des tuyaux
			if (finish == false) {
				tuyau[i].coordoneeX = tuyau[i].coordoneeX-0.5;
			}
			canva.drawImage(tuyau[i].pictureH,tuyau[i].coordoneeX, tuyau[i].coordoneeY-496);
			canva.drawImage(tuyau[i].pictureB,tuyau[i].coordoneeX, tuyau[i].coordoneeY+150);
		}
	}
	canva.drawImage(flappyBird.ailes, flappyBird.coordoneeX, flappyBird.coordoneeY);// place l'oiseaux a ses coordonner
	canva.drawImage(imgsol,-imgsol.X, 627);					//place l'image du sol
	for (let i =0; i <= tuyau.length-1; i++) {				//reinitialisation des tuyau quand on arrive au bout
		if (tuyau[i].coordoneeX< -80) {
			tuyau[i]= new Pipe ("pipe"+tuyau.length,Math.random());
		}
	}
	if (flappyBird.coordoneeY> 587){						//stop oiseau si il touche le bas
		stop ();
		canva.drawImage(flappyBird.ailes, flappyBird.coordoneeX,587);//place FlappyBird a ca position final
	}
	if (finish==true){										//place le GameOver
		canva.drawImage(gameOver, 81.5,100);
	}
}


function saut() {											//initialise le vol de l'oiseaux
	start = true;
	if (finish == false){
		clearInterval (id[2]);								//stop l'oiseau
		//console.log ("touche");
		let t0 = new Date();
		id[2] =setInterval(vol,1,t0,flappyBird.coordoneeY);//relance l'oiseau au debut d'un saut
	}
}

function vol (t0,Y){
	let vitesseAvant = flappyBird.coordoneeY;				//prepare pour calculer la vitesse
	let time= new Date();
	let deltaT = (time-t0-400)/100;							//calcule le decalage pour que l'animation reste constante
	flappyBird.coordoneeY =Y+deltaT*deltaT*4-64;			//parabole 
	flappyBird.vitesse = vitesseAvant-flappyBird.coordoneeY;//calcul vitesse oiseau
}

function animationBird() {									//modifie la forme des ailes
	let time= new Date();
	for (var i = 0;i<=2 ; i++) {
		if (time.getMilliseconds()*2>i*333) {
			flappyBird.ailes = flappyBird.picture[i];		//alterne entre trois forme d'ailes en fonction du temps
		}
	}
}

function randomPipe() {
	while (tuyau.length<2){									//rempli le tableau des tuyaux
		tuyau[tuyau.length] = new Pipe ("pipe"+tuyau.length,Math.random());
		console.log (tuyau);
	}
	for (let i = 0; i<= tuyau.length-1; i++) {				//décale les tuyaux entre eut de 261px pour pas qu'il soit coller
		tuyau[i].coordoneeX= tuyau[i].coordoneeX+265*i;
	}
}

function verif (){											//verifie si flappyBird ne touche pas un tuyau
	for (let i=0 ; i<=tuyau.length-1; i++){
		if (flappyBird.coordoneeX > tuyau[i].coordoneeX-56) {
			if (flappyBird.coordoneeX < tuyau[i].coordoneeX+80){
				if(flappyBird.coordoneeY>tuyau[i].coordoneeY+110){
					//console.log(1);
					stop();
				}
				if(flappyBird.coordoneeY<tuyau[i].coordoneeY){
					//console.log(2);
					stop();
				}	
			}
		}
	}
}

function stop() {											//si flappyBird touche le fond ou un tuyau initialisation de la fin
	if (flappyBird.coordoneeY<586) {
		finish = true;
		console.log("stop");
		clearInterval (id[2]);								//stop vol
		clearInterval (id[0]);								//stop verif
		id[3]= setInterval (fin);
	}
}

function fin() {
	flappyBird.coordoneeY=flappyBird.coordoneeY+5;			//chute di l'oiseau jusqu'à ce qu'il disparaisse
}

document.addEventListener('keydown', saut);					//lance function saut si on apuis sur une touche