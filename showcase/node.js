!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
 
//Ho cercato di parametrizzare il piu possibile e di usare una varietà più ampia possibile tra le funzioni disponibili nell'ambiente, come ad esempio CYLINDRICAL_SURFACE. 
//Inoltre ho definito molte funzioni nuove, come ad esempio "circl" e "circl_xz" che mi permettono di creare un cerchio tramite approssimazione di BEZIER
//rendendo comunque possibile l'uso di queste funzioni per creare superfici di BEZIER. In particolare, "circl_xz" permette anche di traslare di un certo offset
//i cerchi generati.

//Il progetto riguarda la modellazione di un fucile da pesca, nella fattispecie un arbalete ad elastici artigianale in legno ( di cui si possono trovare varie immagini, ovviamente
//diverse di volta in volta, sul web), in quanto è una forma che mi permette di usare una buona varietà delle tecniche imparate finora.
//--------------------------------------------


//Definizione funzioni:

var torus = function (R, r){  //una funzione da me implementata che mi permette, giocando con il dominio
return function (v) {         //di generare tori "mozzi", usati ad esempio per gli elastici
var a = v[0];
var b = v[1];

var u = (r * COS(a) + R) * COS(b);
var v = (r * COS(a) + R) * SIN(b);
var w = (r * SIN(a));

return [u,v,w];
};
};

CYLINDER = function (params) {
  var R = params[0];
  var h = params[1];
  return function (dims) {
    var domain = DOMAIN([[0,2*PI], [0,R]])([dims, 1]);
    var mapping = function (v) {
      var a = v[0];
      var r = v[1];
      return [r*COS(v[0]),r*SIN(v[0])];
    };
    var circle = MAP(mapping)(domain);
    return EXTRUDE([h])(circle);
  };
};

function circl (sel) {
return function (r) {
return function (d_z) {
return function (p) {
return [ r*COS(sel(p)), r*SIN(sel(p)), d_z ];
};
};
};
}

function circl_xz (sel) {
return function (r) {
return function (d_z) {
return function(d_x) {
return function (p) {
return [ r*COS(sel(p))+d_x, r*SIN(sel(p)), d_z ];
};
};
};
};
  }

function arc (alpha, r, R) {

  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);

  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    return [r*COS(a), r*SIN(a)];
  };

  var model = MAP(mapping)(domain);

  return model;
}

//--------------------------------------------------------------------------
//Modello

//Mulinello:

var t_Spire = T([2])([0.075]);
var spira = TORUS_SURFACE([0.07,2.9])([30,10]);
var imbobinatura = COLOR([0,0,1])(T([2])([0.07])(STRUCT(REPLICA(20)([spira,t_Spire]))));

var t_supporto_plastica = T([2])([1.5]);
var supporto_plastica = COLOR([0,0,0])(STRUCT(REPLICA(2)([CYLINDER([3.6,0.2])(80),t_supporto_plastica])));
var sella = COLOR([0.5,0.5,0.5])(T([2])([1.7])(CUBOID([1,1,0.3])));

var pirolo =  COLOR([0.5,0.5,0.5])(T([0,2])([3,-0.6])(CYLINDER([0.2,0.6])(10)));

var mulinello = T([0,1,2])([3.5,0.6,-0.7])(SCALE([0,1,2])([0.2,0.2,0.4])(STRUCT([sella,supporto_plastica,imbobinatura,pirolo])));


//Grilletto in metallo

var grilletto = T([0,1,2])([1.5,0.5,-0.4])(R([0,1])([PI])(R([1,2])([PI/2])(EXTRUDE([0.1])(arc(PI/4,0.6,0.7)))));
var elsa = T([0,1,2])([0.8,0.5,-0.3])(R([0,2])([PI/2])(R([1,2])(PI/2)(EXTRUDE([0.1])(arc(PI/1.5,0.6,0.7)))));


//Asta in metallo

var domain_punta = PROD1x1([INTERVALS(7)(20),INTERVALS(1)(6)]);

var apice_asta = [0,0,1];
var base_asta = circl(S0)(0.1)(0);
var punta = MAP(CONICAL_SURFACE(apice_asta)(base_asta))(domain_punta);
var punta_asta = T([2])([13])(punta);

var corpo_asta = CYLINDER([0.1,13])(60);

var asta = T([0,1,2])([8,0.6,0.6])(R([0,2])([PI/2])(STRUCT([punta_asta,corpo_asta])));


//Fusto in legno

var domain_carico =  INTERVALS(1)(30);
var domain_carico_2D =  DOMAIN([[0,1],[0,1]])([30,40]);

var blocco_centrale_left = COLOR([0.71,0.35,0.1])(CUBOID([15,0.5,0.7]));
var guida_asta = COLOR([0.71,0.35,0.1])(T([1])([0.5])(CUBOID([15,0.25,0.6])));
var blocco_centrale_right = COLOR([0.71,0.35,0.1])(T([1])([0.75])(CUBOID([15,0.5,0.7])));

var upper_left_carico_cp = [[0,0,0.7],[-0.5,0.4,0.7],[-1,0.4,0.7],[-1.5,0,0.7]];
var upper_left_carico_bez = BEZIER(S0)(upper_left_carico_cp);

var upper_right_carico_cp = [[0,1.25,0.7],[-0.5,0.85,0.7],[-1,0.85,0.7],[-1.5,1.25,0.7]];
var upper_right_carico_bez = BEZIER(S0)(upper_right_carico_cp);

var upper_carico_bez = BEZIER(S1)([upper_left_carico_bez,upper_right_carico_bez]);
var upper_carico_surface = MAP(upper_carico_bez)(domain_carico_2D);

var lower_left_carico_cp = [[0,0,0],[-0.5,0.4,0],[-1,0.4,0],[-1.5,0,0]];
var lower_left_carico_bez = BEZIER(S0)(lower_left_carico_cp);

var lower_right_carico_cp = [[0,1.25,0],[-0.5,0.85,0],[-1,0.85,0],[-1.5,1.25,0]];
var lower_right_carico_bez = BEZIER(S0)(lower_right_carico_cp);

var lower_carico_bez = BEZIER(S1)([lower_left_carico_bez,lower_right_carico_bez]);
var lower_carico_surface = MAP(lower_carico_bez)(domain_carico_2D);

var left_carico_bez = BEZIER(S1)([upper_left_carico_bez,lower_left_carico_bez]);
var left_carico_surface = MAP(left_carico_bez)(domain_carico_2D);

var right_carico_bez = BEZIER(S1)([upper_right_carico_bez,lower_right_carico_bez]);
var right_carico_surface = MAP(right_carico_bez)(domain_carico_2D);

var appoggio_sterno = T([0])([-1.5])(CUBOID ([0.01,1.25,0.7]));
var carico_sternale = COLOR([0.71,0.35,0.1])(STRUCT([appoggio_sterno, upper_carico_surface,lower_carico_surface,left_carico_surface,right_carico_surface]));

var scatto = COLOR([0,0,0])(T([1,2])([0.45,0.7])(CUBOID([0.4,0.3,0.04])));

var fusto = STRUCT([elsa, scatto, carico_sternale, blocco_centrale_left,guida_asta,blocco_centrale_right]);


//Elastici

var domain_elastici = DOMAIN([[0,2*PI],[0,1.7*PI]])([36,72]);

var supporto_ogiva_continua = circl(S0)(0.2)(0);
var supporto_ogiva_base = circl(S0)(0.2)(0.34);
var supporto_ogiva_medio = circl(S0)(0.1)(0.4);
var supporto_ogiva_punta = circl(S0)(0.001)(0.56);

var ogiva_bez = BEZIER(S1)([supporto_ogiva_continua, supporto_ogiva_medio,supporto_ogiva_base,supporto_ogiva_punta]);
var ogiva_mapped = COLOR([0,0,0])(MAP(ogiva_bez)(domain_punta));

var elastico_toroide = torus(3.3,0.2);
var elastico1 = COLOR([1,0,0])(MAP(elastico_toroide)(domain_elastici));
var elastico2 = COLOR([0,0.4,0.2])(MAP(elastico_toroide)(domain_elastici));

var supporto_ogiva_1 =T([0,1])([3.3,0])(R([1,2])([PI/2])(ogiva_mapped));
var supporto_ogiva_2 = T([0,1])([1.92,-2.68])(R([0,1])([[-PI/3.22]])((R([1,2])([-PI/2])(ogiva_mapped))));

var filo =  T([0,1])([2.3,-2.4])(R([0,1])([PI/2.89])(R([0,2])([PI/2])(COLOR([0,0,0.5])(CYLINDER([0.02,2.3])([50])))));

var elastico_lontano = T([0,1,2])([15,0.7,1.8])(R([0,2])([-PI/3])(R([0,1])([PI/4.5])(SCALE([0,1,2])([0.55,0.55,0.55])(STRUCT([filo,elastico1,supporto_ogiva_1,supporto_ogiva_2])))));
var elastico_vicino =  T([0,1,2])([13.5,0.7,1.8])(R([0,2])([-PI/1.6])(R([0,1])([PI/4.5])(SCALE([0,1,2])([0.55,0.55,0.55])(STRUCT([filo,elastico2,supporto_ogiva_1,supporto_ogiva_2])))));


//Manico

var domain_manico =  DOMAIN([[0,8],[0,1]])([40,40]);

var ring_1 = circl_xz(S0)(1.2)(0)(0);
var ring_11 = circl_xz(S0)(1.2)(0.3)(0);

var ring_2 = circl_xz(S0)(2)(0.5)(0.2);
var ring_22 = circl_xz(S0)(2)(0.8)(0.2);

var ring_3 = circl_xz(S0)(0.3)(1)(0.4);
var ring_33 = circl_xz(S0)(0.3)(1.3)(0.4);

var ring_4 = circl_xz(S0)(2)(1.5)(0.6);
var ring_44 = circl_xz(S0)(2)(1.8)(0.6);

var ring_5 = circl_xz(S0)(0.3)(2)(0.8);
var ring_55 = circl_xz(S0)(0.3)(2.3)(0.8);

var ring_6 = circl_xz(S0)(2)(2.5)(1);
var ring_66 = circl_xz(S0)(2)(2.8)(1);

var ring_7 = circl_xz(S0)(1)(3)(1.2);
var ring_77 = circl_xz(S0)(1)(3.1)(1.2);

var ring_8 = circl_xz(S0)(2)(3.3)(1.4);

var manico_bez = BEZIER(S1)([ring_1,ring_11,ring_2,ring_22,ring_3,ring_33,ring_4,ring_44,ring_5,ring_55,ring_6,ring_66,ring_7,ring_77,ring_8]);

var impugnatura = MAP(manico_bez)(domain_manico);

var base_manico = T([0,2])([1.4,3.3])(CYLINDER([2,0.3])(30));

var manico = COLOR([0.71,0.35,0.1])(T([1])([0.6])(SCALE([0,1,2])([0.35,0.35,0.6])(R([0,2])([PI])(STRUCT([impugnatura, base_manico])))));


var model = STRUCT([grilletto, manico, mulinello, asta, elastico_lontano, elastico_vicino, fusto]);

  return model;
  })();

  exports.author = 'DeliriumCordia';
  exports.category = 'Sports';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('C:/showcase/data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));