//  timer du memory
var milli = 0;
var seconde = 0;
var minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+": "+seconde +": " + milli+".";
        milli++;
        if(milli >99){
            seconde++;
            milli=0;
        }
        if(seconde > 59){
            minute++;
            seconde = 0;
        }
        if(minute > 59){
            minute = 0;
        }
    },10);
}
//http://sciences-du-numerique.fr/projets-javascript/code-source-du-jeu-de-memory/60
//memory
var motifsCartes=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
var etatsCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var cartesRetournees=[];
var nbPairesTrouvees=0;
var imgCartes=document.getElementById("cardDeck").getElementsByTagName("img");
for(var i=0;i<imgCartes.length;i++){
	imgCartes[i].noCarte=i; //Ajout de la propriété noCarte à l'objet img
	imgCartes[i].onclick=function(){
		controleJeu(this.noCarte);
	}
}
function majAffichage(noCarte){
	switch(etatsCartes[noCarte]){
		case 0:
			imgCartes[noCarte].src="../img/dos.jpg";
			break;
		case 1:
			imgCartes[noCarte].src="../img/carte"+motifsCartes[noCarte]+".png";
			break;
		case -1:
			imgCartes[noCarte].style.border="5px solid green";
			break;
	}
}
function rejouer(){
	alert("Bravo !");
	location.reload();
}
function initialiseJeu(){
	for(var position=motifsCartes.length-1; position>=1; position--){
		var hasard=Math.floor(Math.random()*(position+1));
		var sauve=motifsCartes[position];
		motifsCartes[position]=motifsCartes[hasard];
		motifsCartes[hasard]=sauve;
	}
}

function controleJeu(noCarte){
  if(cartesRetournees.length<2){
    if(etatsCartes[noCarte]==0){
			etatsCartes[noCarte]=1;
			cartesRetournees.push(noCarte);
			majAffichage(noCarte);
		}
    if(cartesRetournees.length==2){
			var nouveauEtat=0;
			if(motifsCartes[cartesRetournees[0]]==motifsCartes[cartesRetournees[1]]){
				nouveauEtat=-1;
				nbPairesTrouvees++;
			}

			etatsCartes[cartesRetournees[0]]=nouveauEtat;
			etatsCartes[cartesRetournees[1]]=nouveauEtat;
      setTimeout(function(){
    majAffichage(cartesRetournees[0]);
    majAffichage(cartesRetournees[1]);
    cartesRetournees=[];
    if(nbPairesTrouvees==10){
      rejouer();
    }
  },750);
}
}
}
