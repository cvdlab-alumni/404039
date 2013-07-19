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

  //override of T function without clone() invocation.

  var T =
  fun.T =
  fun.TRANSLATE = function (dims) {
    return function (values) {
      return function (object) {
       return object.translate(dims, values);
      };
    };
  };

  //override of R function without clone() invocation.
  var R =
  fun.R = 
  fun.ROTATE = function (dims) {
    return function (angle) {
      return function (object) {
        return object.rotate(dims, angle);
      };
    };
  };

  //override of S function without clone() invocation

  var S =
  fun.S =
  fun.SCALE = function (dims) {
    return function (values) {
      return function (object) {
        return object.scale(dims, values);
      };
    };
  };


var domain_cuscino =  INTERVALS(1)(30);
  var domain_cuscino_2d =  DOMAIN([[0,1],[0,1]])([30,40]);
  var domain_coppa_2d = DOMAIN([[0,8],[0,1]])([30,40]);

  var viola = [115/255,107/255, 148/255];
  var giallo = [234/255,189/255,8/255];
  var bianco = [1,1,1];


//divano 

 var cuscino_front_cp1 = [[6.2, 4.43,0], [5.95, 4,0],  [5.52, 3.65,0],[5.62, 3.2,0]];
  var cuscino_front_bezier1 = BEZIER(S0)(cuscino_front_cp1);

  var cuscino_front_cp2 = [[6.2, 4.43,6], [5.95, 4,6],  [5.52, 3.65,6],[5.62, 3.2,6]];
  var cuscino_front_bezier2 = BEZIER(S0)(cuscino_front_cp2);

  var cuscino_front_bez = BEZIER(S1)([cuscino_front_bezier1,cuscino_front_bezier2]);
  var cuscino_front_mapped = MAP(cuscino_front_bez)(domain_cuscino_2d);


  var cuscino_top_cp1=[[6.2, 4.43,0], [6.32, 4.43,0], [6.43, 4.52,0], [6.77, 4.39,0]];
  var cuscino_top_bez1 = BEZIER(S0)(cuscino_top_cp1);

  var cuscino_top_cp2=[[6.2, 4.43,6], [6.32, 4.43,6], [6.43, 4.52,6], [6.77, 4.39,6]];
  var cuscino_top_bez2 = BEZIER(S0)(cuscino_top_cp2);

  var cuscino_top_bez = BEZIER(S1)([cuscino_top_bez1,cuscino_top_bez2]);
  var cuscino_top_mapped = MAP(cuscino_top_bez)(domain_cuscino_2d);


  var cuscino_bottom_cp1 = [[5.62, 3.18,0], [6.05, 3.08,0], [6.39, 3.05,0], [6.68, 3.03,0]];
  var cuscino_bottom_bez1 = BEZIER(S0)(cuscino_bottom_cp1);

  var cuscino_bottom_cp2 = [[5.62, 3.18,6], [6.05, 3.08,6], [6.39, 3.05,6], [6.68, 3.03,6]];
  var cuscino_bottom_bez2 = BEZIER(S0)(cuscino_bottom_cp2);

  var cuscino_bottom_bez = BEZIER(S1)([cuscino_bottom_bez1,cuscino_bottom_bez2]);
  var cuscino_bottom_mapped = MAP(cuscino_bottom_bez)(domain_cuscino_2d);

  var cuscino_back_cp1 = [[6.77, 4.39,0], [6.73, 3.71,0], [6.73, 3.44,0], [6.68, 3.03,0]];
  var cuscino_back_bez1 = BEZIER(S0)(cuscino_back_cp1);

  var cuscino_back_cp2 = [[6.77, 4.39,6], [6.73, 3.71,6], [6.73, 3.44,6], [6.68, 3.03,6]];
  var cuscino_back_bez2 = BEZIER(S0)(cuscino_back_cp2);

  var cuscino_back_bez = BEZIER(S1)([cuscino_back_bez1,cuscino_back_bez2]);
  var cuscino_back_mapped = MAP(cuscino_back_bez)(domain_cuscino_2d);

  var cuscino_mid_cp = [[6.47, 4.6,0], [6.46, 3.98,0], [6.42, 3.64,0], [6.35, 3.06,0]];
  var cuscino_mid_bezier = BEZIER(S0)(cuscino_mid_cp);

  var cuscino_back_cp = [[6.77, 4.39,0], [6.73, 3.71,0], [6.73, 3.44,0], [6.68, 3.03,0]];
  var cuscino_back_bezier = BEZIER(S0)(cuscino_back_cp);

  var cuscino_bez = BEZIER(S1)([cuscino_back_bez1,cuscino_mid_bezier,cuscino_front_bezier1]);
  var cuscino_mapped = MAP(cuscino_bez)(domain_cuscino_2d);

  var cuscino_mapped2 = T([2])([6])(MAP(cuscino_bez)(domain_cuscino_2d));

  var cuscino_rigido = COLOR(giallo)(S([0,1,2])([1.5,2,2.5])(T([0,1,2])([6.6,7.5,-1.1])(R([0,1])([PI])(R([1,2])([PI/2])(R([0,2])([PI/2])(STRUCT([cuscino_front_mapped,cuscino_back_mapped,cuscino_bottom_mapped,cuscino_top_mapped,cuscino_mapped,cuscino_mapped2])))))));



  var attaccatura_cuscino_cp1 = [[6.57, 4.35, 0], [6.57, 4.05, 0], [6.57, 3.42, 0], [6.57, 2.9, 0]];
  var attaccatura_cuscino_bez1 = BEZIER(S0)(attaccatura_cuscino_cp1);

  var curva_cuscino_cp1 = [[6.58, 4.37,0.2], [5.89, 4.28, 0.2], [5.91, 3.19, 0.2], [6.58, 3.02, 0.2]];
  var curva_cuscino_bez1 = BEZIER(S0)(curva_cuscino_cp1);

  var curva_cuscino_cp2 = [[6.58, 4.37,2.6], [5.89, 4.28, 2.6], [5.91, 3.19, 2.6], [6.58, 3.02, 2.6]];
  var curva_cuscino_bez2 = BEZIER(S0)(curva_cuscino_cp2);

  var attaccatura_cuscino_cp2 = [[6.57, 4.35, 2.8], [6.57, 4.05, 2.8], [6.57, 3.42, 2.8], [6.57, 2.9, 2.8]];
  var attaccatura_cuscino_bez2 = BEZIER(S0)(attaccatura_cuscino_cp2);

  var lato_cuscino_bez1 = BEZIER(S1)([attaccatura_cuscino_bez1, curva_cuscino_bez1, curva_cuscino_bez2, attaccatura_cuscino_bez2]);
  var lato_cuscino_mapped = MAP(lato_cuscino_bez1)(domain_cuscino_2d);

  var curva2_cuscino_cp1 = [[6.58, 4.37, 0.2], [7.49, 4.28, 0.2], [7.38, 3, 0.2], [6.58, 3.02, 0.2]];
  var curva2_cuscino_bez1 = BEZIER(S0)(curva2_cuscino_cp1);

  var curva2_cuscino_cp2 = [[6.58, 4.37, 2.6], [7.49, 4.28, 2.6], [7.38, 3, 2.6], [6.58, 3.02, 2.6]];
  var curva2_cuscino_bez2 = BEZIER(S0)(curva2_cuscino_cp2);

  var lato_cuscino_bez2 = BEZIER(S1)([attaccatura_cuscino_bez1, curva2_cuscino_bez1, curva2_cuscino_bez2, attaccatura_cuscino_bez2]);
  var lato2_cuscino_mapped = MAP(lato_cuscino_bez2)(domain_cuscino_2d);

  var cuscino_morbido = COLOR(giallo)(T([0,1,2])([2,-7,-15.4])(S([0,1,2])([2.4,2.4,3.8])(R([1,2])([PI/1.6])(R([0,2])([PI/2])(STRUCT([lato2_cuscino_mapped, lato_cuscino_mapped]))))));


  var chiusura_divano_cp1 = [[0,15.5,1.85+3],[3,15.5+1,1.85+3],[8,15.5+1,1.85+3],[11,15.5,1.85+3]];
  var chiusura_divano_bez1 = BEZIER(S0)(chiusura_divano_cp1);
  var chiusura_divano_cp2 = [[0,15.5,1.85],[3,15.5+1,1.85],[8,15.5+1,1.85],[11,15.5,1.85]];
  var chiusura_divano_bez2 = BEZIER(S0)(chiusura_divano_cp2);


  var chiusura_divano_superiore_bez1 = BEZIER(S1)([chiusura_divano_bez1,chiusura_divano_bez2]);
  var imbottitura = COLOR(giallo)(MAP(chiusura_divano_superiore_bez1)(domain_cuscino_2d));

  var chiusura_superiore_fill_cp1 = [[0,15.5,1.85+3],[3,15.5,1.85+3],[8,15.5,1.85+3],[11,15.5,1.85+3]];
  var chiusura_superiore_fill_bez1 = BEZIER(S0)(chiusura_superiore_fill_cp1);

  var chiusura_superiore_fill_cp2 = [[0,15.5,1.85],[3,15.5,1.85],[8,15.5,1.85],[11,15.5,1.85]];
  var chiusura_superiore_fill_bez2 = BEZIER(S0)(chiusura_superiore_fill_cp2);


  var chiusura_inferiore_fill_bez = BEZIER(S1)([chiusura_superiore_fill_bez2,chiusura_divano_bez2]);
  var chiusura_inferiore_fill = COLOR(giallo)(MAP(chiusura_inferiore_fill_bez)(domain_cuscino_2d));

  var chiusura_superiore_fill_bez = BEZIER(S1)([chiusura_superiore_fill_bez1,chiusura_divano_bez1]);
  var chiusura_superiore_fill1 = COLOR(giallo)(MAP(chiusura_superiore_fill_bez)(domain_cuscino_2d));


  var appoggio_basso_cp1basso =  [[0,15.5,0.9],[3,15.5+1,0.9],[8,15.5+1,0.9],[11,15.5,0.9]];
  var appoggio_basso_bez1basso = BEZIER(S0)(appoggio_basso_cp1basso);

  var appoggio_basso_cp2basso = [[0,15.5,0.9+0.9],[3,15.5+1,0.9+0.9],[8,15.5+1,0.9+0.9],[11,15.5,0.9+0.9]];
  var appoggio_basso_bez2basso = BEZIER(S0)(appoggio_basso_cp2basso);

  var imbottitura_bassa_bez = BEZIER(S1)([appoggio_basso_bez1basso,appoggio_basso_bez2basso]);
  var imbottitura_bassa = COLOR(giallo)(MAP(imbottitura_bassa_bez)(domain_cuscino_2d));

  var chiusura_bassa_appoggio_cp1 = [[0,15.5,0.9],[3,15.5,0.9],[8,15.5,0.9],[11,15.5,0.9]];
  var chiusura_bassa_appoggio_bez1 = BEZIER(S0)(chiusura_bassa_appoggio_cp1);

  var chiusura_bassa_bez = BEZIER(S1)([chiusura_bassa_appoggio_bez1,appoggio_basso_bez1basso]);
  var chiusura_bassa_appoggio1 = COLOR(giallo)(MAP(chiusura_bassa_bez)(domain_cuscino_2d));

  var chiusura_bassa_appoggio_cp2 = [[0,15.5,0.9+0.9],[3,15.5,0.9+0.9],[8,15.5,0.9+0.9],[11,15.5,0.9+0.9]];
  var chiusura_bassa_appoggio_bez2 = BEZIER(S0)(chiusura_bassa_appoggio_cp2);

  var imbottitura_bassa_2_bez = BEZIER(S1)([chiusura_bassa_appoggio_bez2,appoggio_basso_bez2basso]);
  var imbottitura_bassa_2 = COLOR(giallo)(MAP(imbottitura_bassa_2_bez)(domain_cuscino_2d));

  var appoggio_metallo1 = T([0,1])([0.4+1,0.4+1])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo2 = T([0,1])([-0.4-1+11,0.4+1])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo3 = T([0,1])([-0.4-1+11,0.4-1+14])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo4 = T([0,1])([0.4+1,0.4-1+14])(CYLINDER([0.4,0.9])(10));

  var appoggi_metallo = STRUCT([appoggio_metallo1,appoggio_metallo2,appoggio_metallo3, appoggio_metallo4]);

  var materassone = T([1,2])([1.5,1.85])(COLOR(giallo)(CUBOID([11,14,3])));

  var appoggio_basso = T([2])([0.9])(COLOR(giallo)(CUBOID([11,15.5,0.9])));

  var schienale = T([2])([1.8])(COLOR(giallo)(CUBOID([11,1.4,5])));


  var divano = STRUCT([imbottitura_bassa, chiusura_bassa_appoggio1,imbottitura_bassa_2, chiusura_superiore_fill1,chiusura_inferiore_fill, imbottitura, appoggi_metallo,cuscino_morbido,cuscino_rigido, schienale,materassone,appoggio_basso]);
  
//tavolino

  var zampa_1 = CUBOID([0.1,0.1,4]);
  var zampa_2 = T([1])([3])(CUBOID([0.1,0.1,4]));
  var zampa_3 = T([0])([0.1])(CUBOID([4,0.1,0.1]));
  var zampa_4 = T([0,1])([0.1,3])(CUBOID([4,0.1,0.1]));
  var zampa_5 = T([0])([4.1])(CUBOID([0.1,3.1,0.1]));

  var appoggio_tavolino = T([2])([4])(CUBOID([0.1,3.1,0.1]));

  var ripiano_tavolino = T([2])([4.1])(COLOR([0,0,0])(CUBOID([4,3.1,0.3])));


  var tavolino = T([0,1,2])([36,27,0.4])(R([0,1])([PI])(S([0,1,2])([1.2,1.2,1.2])(STRUCT([zampa_1, zampa_2,zampa_3, zampa_4, zampa_5, appoggio_tavolino, ripiano_tavolino]))));

  var struttura = STRUCT([tavolino,T([0,1,2])([35,35,0.04])(R([0,1])([PI])(divano))]);

  DRAW(struttura);