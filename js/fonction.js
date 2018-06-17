//  timer du memory
var milli = 0;//on crée une variable pour chaque unité de mesure
var seconde = 0;
var minute = 0;
var timer = document.querySelector(".timer");//on recupere la class timer
                                            //de notre div
  timer.style.color = "white";//pour styliser le timer
  timer.style.fontSize = "30px";

var interval;//cette variable va servir à appeler la fonction.
var visible = document.getElementById("cardDeck");//on recupere l'id
var regle = document.getElementById("regle");//on recupere l'id
function startTimer(){
  visible.classList.toggle('cacher');//ajouter ou supprimer la classe suivant si elle est ou non deja présente
  regle.classList.toggle('cacher');//cache les règles
  compteur.classList.toggle('cacher');//rend visible le compteur
    interval = setInterval(function(){
        timer.innerHTML = "Timer " + minute+":"+seconde +"." + milli;
        milli++;
        if(milli >99){//si les milli depasse 99
            seconde++;//on incremente les secondes de 1
            milli=0;//eton passe les milli a 0
        }
        if(seconde > 59){//idem
            minute++;
            seconde = 0;
        }
        if(minute > 59){//idem
            minute = 0;
        }
    },10);// 10 millisecondes
}


//memory

//on crée un tableau avec nos 10 cartes à l'interieur
//on les met en double.
var motifsCartes=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

//on crée un 2eme tableau pour les dos de cartes.
var etatsCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//on crée un autre tableau qui va contenir les cartes retournées.
var cartesRetournees=[];

//variable qui va compter le nombre de paire trouver
var nbPairesTrouvees=0;

//variable qui va récupérer toute les images dans notre jeu de cartes.
var imgCartes=document.getElementById("cardDeck").getElementsByTagName("img");

//variable pour le nombre de Cliques
var coups = 0;

//on recupere la classe pour les clique
var counter = document.querySelector(".coups");

//fonction qui permet de compter le nbr de cliques
function nbrCoups(){
    coups++;
    counter.innerHTML ="Coups : " + coups;
  }
//on parcourt le tableau d'objet des éléments img et on ajoute la fonction controleJeu
//en cliquant sur la chaque carte.
var form = document.getElementById("formu");//on récupère le formulaire
var chrono = document.getElementById("time");//on récupère le chrono
for(var i=0;i<imgCartes.length;i++){
	imgCartes[i].noCarte=i; //Ajout de la propriété noCarte à l'objet img
	imgCartes[i].onclick=function(){
		controleJeu(this.noCarte);
	}
}
//fonction qui change l'état des cartes
function majAffichage(noCarte){
	switch(etatsCartes[noCarte]){
    //état 0 : carte face cachée, on affichage l'image de dos de carte
		case 0:
			imgCartes[noCarte].src="img/dos.png";
			break;
      //carte retournée, on affiche l'image du motif correspondant
      //au numero de carte.
		case 1:
			imgCartes[noCarte].src="img/carte"+motifsCartes[noCarte]+".png";
			break;
      //les cartes reste retournées et on applique un style
		case -1:
		//	imgCartes[noCarte].style.border="5px solid green";
    imgCartes[noCarte].classList.add('styleCard');
			break;
	}
}
//fonction permet de stop le chrono.
function stop(){
//le clearInterval
  clearInterval(interval);
  var finalTime = timer.innerHTML;//variable qui recupere le temps de jeu
  var compteurCoups = counter.innerHTML;//var qui recupere le nbr de coups
  time.classList.toggle('cacher');//cacher le chrono
  visible.classList.toggle('cacher');//cache le jeu
  formu.classList.toggle('cacher');//montre le formulaire
  compteur.classList.toggle('cacher');//on cache le compteur
  document.getElementById("totalTime").innerHTML = finalTime;//affiche le temps de jeu dans le formulaire
  document.getElementById("totalCoups").innerHTML = compteurCoups;//affiche le nbr de coup dans le formulaire
}
function rejouer() {
  	location.reload();//réinitialise le jeu.
    time.classList.toggle('cacher');//cacher le chrono
    visible.classList.toggle('cacher');//cache le jeu
    formu.classList.toggle('cacher');//cache le formulaire

}
// fonction qui mélange le jeu elle se lance sur la bouton start
function initialiseJeu(){
	for(var position=motifsCartes.length-1; position>=1; position--){
    //on utilise math.random() pour generer de l'aleatoire
    //var hasard recoit un nbr entre 0 et position +1
		var hasard=Math.floor(Math.random()*(position+1));
    //on stock la position de la carte dans une variable
		var sauve=motifsCartes[position];
    //on dit que sa position est hasard(aleatoire)
		motifsCartes[position]=motifsCartes[hasard];
    //sa nouvelle position devient sa position de base
		motifsCartes[hasard]=sauve;
	}
}
//fonction qui fait fonctionné le jeu en lui meme.
function controleJeu(noCarte){
  //la longueur du tableau ne depasse pas 2
  //sa permet de ne pas avoir plus de deux cartes retournées
  //si on a moin de deux cartes retournées
  if(cartesRetournees.length<2){
    //si la carte est de dos
    if(etatsCartes[noCarte]==0){
      //on passe son état à 1
			etatsCartes[noCarte]=1;
      //on ajoute son numéro au tableau cartesRetournees
			cartesRetournees.push(noCarte);
      //on fait la mise a jour de l'affichage.
			majAffichage(noCarte);
		}
    //si on a deux cartes retournées.
    if(cartesRetournees.length==2){
      //on creer une variable =0 ( = à l'état 0)
			var nouveauEtat=0;
      //si les deux cartes sont identiques( on le meme numéro)
			if(motifsCartes[cartesRetournees[0]]==motifsCartes[cartesRetournees[1]]){
        //on change leur état en -1
        nouveauEtat=-1;
        //on incremnte le nbr de paire
				nbPairesTrouvees++;
			}
        //sinon on change leur état en 0 (on les retourne)
			etatsCartes[cartesRetournees[0]]=nouveauEtat;
			etatsCartes[cartesRetournees[1]]=nouveauEtat;
      //on fait un setTimeout de 500ms pour ralentir le changement d'etat
      setTimeout(function(){
    majAffichage(cartesRetournees[0]);
    majAffichage(cartesRetournees[1]);
    cartesRetournees=[];
    nbrCoups()//on appel la fonction qui compte le nbr de coups
                // 1 clique = 2 images retournées.

    if(nbPairesTrouvees==10){
      stop();//si le nombre de paires = 10 on lance la fonction stop
            //qui fait apparaitre le formulaire
    }
  },500);
}
}
}


//formulaire

function validationForm() {
    var x = document.forms["formcard"]["nom"].value;//recupere les données entrées
    var y = document.forms["formcard"]["prenom"].value;//recupere les données entrées
    if (x == "" && y =="") {//si le nom et prenom sont vide
        alert("Veuillez indiquer votre nom et votre prénom");
        return false;
      }
    else if (x == "") {//si le nom est vide
      alert("Veuillez indiquer votre nom")
      return false;
      }
    else if (y =="") {//si le prenom est vide
      alert("Veuillez indiquer votre prénom")
      return false;
    }
    else {//sinon on relance le jeu
      rejouer();
    }
}
