//Esercizio 1

function x(punto){
  return punto[0];
}

function y(punto){
  return punto[1];
}

function terrain(punto){
u = x(punto);
v = y(punto);
w = z(u,v);

return [u,v,w];
}

function z(u,v) {
	var zeta;
	if((u>2 && u<12 && v<14)||(u>50 && v<10) || (u>8 && u<25 && v>35 & v<55) ||(u>8 && u<13 && v>14 && v<36))  //pianura
		zeta = mediaHsuolo/14;
	else if((u<24 && v < 29) || (u>41 && v<19))  //lieve pendio
		zeta = Math.random()*2*mediaHsuolo/10;
	else if((u>35 && u<41 && v>44 && v<49))
		zeta = Math.random()*2*mediaHsuolo/3 -5;   //lago
	else zeta = Math.random()*2*mediaHsuolo/5;
	return zeta;
}

var mediaHsuolo = 10;

var dominio2D = DOMAIN([[0,60],[0,60]])([40,40]);

var mappa = COLOR([0.5,0.22,0.08])(MAP(terrain)(dominio2D));


/*Esercizio 2*/

var blue = COLOR([0.5,1,0.5]);
var lago = T([0,1,2])([35,44,0.5])(blue(CUBOID([6,5,0.1])));

var model = STRUCT([mappa,lago]);