  function circl_xz (sel) {   //una funzione da me creata che crea cerchi completi usabili con bezier, che prevedono inoltre
  return function (r) {       //una traslazione sugli assi
  return function (d_z) {
  return function(d_x) {
  return function (p) {
  return [ r*COS(sel(p))+d_x, r*SIN(sel(p)), d_z ];
  };
  };
  };
  };
    }

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

  //end of function definitions.
  //--------------------------------------------------------

  var domain_cuscino =  INTERVALS(1)(30);
  var domain_cuscino_2d =  DOMAIN([[0,1],[0,1]])([30,40]);
  var domain_coppa_2d = DOMAIN([[0,8],[0,1]])([30,40]);

  var viola = [115/255,107/255, 148/255];
  var giallo = [234/255,189/255,8/255];
  var bianco = [1,1,1];


  //cassetti,armadi, coppa, tv

  var base_back = CUBOID([0.4,32,19]);
  var base_piccola = CUBOID([4,32,0.7]);
  var base_grande = T([2])([0.7])(CUBOID([7,32,0.2]));
  var base = COLOR([0.2,0.2,0.2])(STRUCT([base_back,base_grande,base_piccola]));

  var spessore_cassetto = 2.5;
  var larghezza_cassetto = 2.4;
  var altezza_cassetto = 10;
  var cassetto_armadio = CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto]);


  var cassetto1 = COLOR(giallo)(T([0,2])([0.4,6])(CUBOID([2.5,2.4,10])));
  var cassetto2 = COLOR(viola)(T([0,1,2])([0.4,larghezza_cassetto,7.3])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
  var cassetto3 = COLOR(bianco)(T([0,1,2])([0.4,larghezza_cassetto*2,5])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
  var cassetto4 = COLOR(viola)(T([0,1,2])([0.4,larghezza_cassetto*3,4])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
  var cassetto5 = COLOR(giallo)(T([0,1,2])([0.4,larghezza_cassetto*4,6.7])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));

  var cassetto_basso1 = T([0,1,2])([0.4,11,0.9])(COLOR(bianco)(CUBOID([4.5,10,2])));
  var cassetto_basso2 =  T([0,1,2])([0.4,21.15,0.9])(COLOR(bianco)(CUBOID([4.5,10,2])));

  var supporto_cassetti_bassi = T([0,1,2])([0.4,11,2.9])(COLOR([0.1,0.1,0.1])(CUBOID([4.9,20.15,0.3])));

  var cassetti = STRUCT([cassetto1,cassetto2,cassetto3,cassetto4,cassetto5,cassetto_basso1,cassetto_basso2,supporto_cassetti_bassi]);

  var appoggia_libri_verticale = T([0,1,2])([0.6,18,3.2])(COLOR(giallo)(CUBOID([1.5,1.5,3])));
  var appoggia_libri_orizzontale =  T([0,1,2])([0.6,16.5,6.2])(COLOR(giallo)(CUBOID([1.5,3,1.5])));

  var appoggia_libri = T([1])([4])(S([0,1,2])([0.85,0.85,0.85])(STRUCT([appoggia_libri_orizzontale,appoggia_libri_verticale])));

  //coppa
  var ring_1 = circl_xz(S0)(1.2)(0)(0);
  var ring_2 = circl_xz(S0)(0.3)(0.2)(0);
  var ring_3 = circl_xz(S0)(0.3)(0.6)(0);
  var ring_4 = circl_xz(S0)(0.3)(0.8)(0);

  var ring_5 = circl_xz(S0)(0.3)(0.9)(0);
  var ring_6 = circl_xz(S0)(0.3)(1.3)(0);

  var ring_7 = circl_xz(S0)(0.3)(1.45)(0);
  var ring_8 = circl_xz(S0)(1.5)(2.3)(0);
  var ring_9 = circl_xz(S0)(1.8)(3)(0);
  var ring_10 = circl_xz(S0)(2.1)(3.3)(0);
  var ring_11 = circl_xz(S0)(0.3)(3.5)(0);
  var ring_12 = circl_xz(S0)(0.3)(3.8)(0);

  var ring_13 = circl_xz(S0)(0.3)(4.2)(0);
  var ring_14 = circl_xz(S0)(0.3)(4.7)(0);
  var ring_15 = circl_xz(S0)(0.01)(5)(0);


  var decorazione_1 = T([2])([0.8])(TORUS_SOLID([0.1, 0.3])([20,20,5]));
  var decorazione_2 = T([2])([1.3])(TORUS_SOLID([0.1, 0.3])([20,20,5]));
  var decorazione_3 = T([2])([3.9])(TORUS_SOLID([0.1, 0.3])([20,20,5]));
  var decorazione_4 = T([2])([4.1])(TORUS_SOLID([0.1,0.3])([20,20,5]));



  var coppa_inferiore_bez = BEZIER(S1)([ring_1,ring_2, ring_3, ring_4]);
  var coppa_intermedia1_bez = BEZIER(S1)([ring_5,ring_6]);
  var coppa_intermedia2_bez = BEZIER(S1)([ring_7,ring_8,ring_9,ring_10,ring_11,ring_12]);
  var coppa_superiore_bez  = BEZIER(S1)([ring_13,ring_14,ring_15]);

  var coppa_inferiore = STRUCT([MAP(coppa_intermedia1_bez)(domain_coppa_2d), MAP(coppa_inferiore_bez)(domain_coppa_2d),decorazione_1,decorazione_2]);
  var coppa_intermedia = MAP(coppa_intermedia2_bez)(domain_coppa_2d);
  var cappello = MAP(coppa_superiore_bez)(domain_coppa_2d);
  var coppa_superiore = STRUCT([decorazione_3,decorazione_4,cappello]);

  coppa = T([0,1,2])([3.2,16,3.2])(S([0,1,2])([1.3,1.3,1.3])(COLOR([1,1,1,0.6])(STRUCT([coppa_intermedia,coppa_inferiore,coppa_superiore]))));

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
  var imbottitura = MAP(chiusura_divano_superiore_bez1)(domain_cuscino_2d);

  var chiusura_superiore_fill_cp1 = [[0,15.5,1.85+3],[3,15.5,1.85+3],[8,15.5,1.85+3],[11,15.5,1.85+3]];
  var chiusura_superiore_fill_bez1 = BEZIER(S0)(chiusura_superiore_fill_cp1);

  var chiusura_superiore_fill_cp2 = [[0,15.5,1.85],[3,15.5,1.85],[8,15.5,1.85],[11,15.5,1.85]];
  var chiusura_superiore_fill_bez2 = BEZIER(S0)(chiusura_superiore_fill_cp2);


  var chiusura_inferiore_fill_bez = BEZIER(S1)([chiusura_superiore_fill_bez2,chiusura_divano_bez2]);
  var chiusura_inferiore_fill = MAP(chiusura_inferiore_fill_bez)(domain_cuscino_2d);

  var chiusura_superiore_fill_bez = BEZIER(S1)([chiusura_superiore_fill_bez1,chiusura_divano_bez1]);
  var chiusura_superiore_fill1 = MAP(chiusura_superiore_fill_bez)(domain_cuscino_2d);


  var appoggio_basso_cp1basso =  [[0,15.5,0.9],[3,15.5+1,0.9],[8,15.5+1,0.9],[11,15.5,0.9]];
  var appoggio_basso_bez1basso = BEZIER(S0)(appoggio_basso_cp1basso);

  var appoggio_basso_cp2basso = [[0,15.5,0.9+0.9],[3,15.5+1,0.9+0.9],[8,15.5+1,0.9+0.9],[11,15.5,0.9+0.9]];
  var appoggio_basso_bez2basso = BEZIER(S0)(appoggio_basso_cp2basso);

  var imbottitura_bassa_bez = BEZIER(S1)([appoggio_basso_bez1basso,appoggio_basso_bez2basso]);
  var imbottitura_bassa = MAP(imbottitura_bassa_bez)(domain_cuscino_2d);

  var chiusura_bassa_appoggio_cp1 = [[0,15.5,0.9],[3,15.5,0.9],[8,15.5,0.9],[11,15.5,0.9]];
  var chiusura_bassa_appoggio_bez1 = BEZIER(S0)(chiusura_bassa_appoggio_cp1);

  var chiusura_bassa_bez = BEZIER(S1)([chiusura_bassa_appoggio_bez1,appoggio_basso_bez1basso]);
  var chiusura_bassa_appoggio1 = MAP(chiusura_bassa_bez)(domain_cuscino_2d);

  var chiusura_bassa_appoggio_cp2 = [[0,15.5,0.9+0.9],[3,15.5,0.9+0.9],[8,15.5,0.9+0.9],[11,15.5,0.9+0.9]];
  var chiusura_bassa_appoggio_bez2 = BEZIER(S0)(chiusura_bassa_appoggio_cp2);

  var imbottitura_bassa_2_bez = BEZIER(S1)([chiusura_bassa_appoggio_bez2,appoggio_basso_bez2basso]);
  var imbottitura_bassa_2 = MAP(imbottitura_bassa_2_bez)(domain_cuscino_2d);

  var appoggio_metallo1 = T([0,1])([0.4+1,0.4+1])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo2 = T([0,1])([-0.4-1+11,0.4+1])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo3 = T([0,1])([-0.4-1+11,0.4-1+14])(CYLINDER([0.4,0.9])(10));
  var appoggio_metallo4 = T([0,1])([0.4+1,0.4-1+14])(CYLINDER([0.4,0.9])(10));

  var appoggi_metallo = STRUCT([appoggio_metallo1,appoggio_metallo2,appoggio_metallo3, appoggio_metallo4]);

  var materassone = T([1,2])([1.5,1.85])(COLOR(giallo)(CUBOID([11,14,3])));

  var appoggio_basso = T([2])([0.9])(COLOR(giallo)(CUBOID([11,15.5,0.9])));

  var schienale = T([2])([1.8])(COLOR(giallo)(CUBOID([11,1.4,5])));


  var divano = COLOR(giallo)(STRUCT([imbottitura_bassa, chiusura_bassa_appoggio1,imbottitura_bassa_2, chiusura_superiore_fill1,chiusura_inferiore_fill, imbottitura, appoggi_metallo,cuscino_morbido,cuscino_rigido, schienale,materassone,appoggio_basso]));


  //tv

  var pannello_tv_superiore = T([2])([3.1+0.6])(COLOR([0,0,0])(CUBOID([0.1,6.4,0.2])));
  var pannello_tv_inferiore = COLOR([0,0,0])(CUBOID([0.1,6.2,0.6]));
  var pannello_tv_sinistra = COLOR([0,0,0])(CUBOID([0.1,0.2,3.7]));
  var pannello_tv_destra = T([1])([6.2])(COLOR([0,0,0])(CUBOID([0.1,0.2,3.7])));
  var fascia_tv_audio = T([2])([-0.3])(CUBOID([0.1,6.4,0.3]));
  var pannello_retro = T([0])([-0.1])(COLOR([0,0,0])(CUBOID([0.1,6.4,3.9])));

  var larghezza_rettangolo_immagine = 6.1/3;

  var r_gb = T([1,2])([0.1,0.6])(COLOR([1,0,0])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));
  var r_g_b = T([1,2])([0.1+larghezza_rettangolo_immagine,0.6])(COLOR([0,1,0])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));
  var rg_b = T([1,2])([0.1+2*larghezza_rettangolo_immagine,0.6])(COLOR([0,0,1])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));

  var immagine = STRUCT([r_gb,r_g_b,rg_b]);


  var tv = T([0,1,2])([0.4,20,8])(S([0,1,2])([3,1.45,1.45])(STRUCT([pannello_retro,immagine,fascia_tv_audio,pannello_tv_superiore, pannello_tv_inferiore, pannello_tv_sinistra, pannello_tv_destra])));


  //lampada

  var baseLampada = CUBOID([3,3,0.2]);

  var astaLampada = T([0,1])([1.5,1.5])(CYLINDER([0.15,11])(15));

  var astaObliqua = CYLINDER([0.12,8.5])(15);

  var contrappeso = CUBOID([0.4,0.6,1.5]);

  var asta1 = T([0,1,2])([0.9,5,7])(R([1,2])([PI/4])(STRUCT([T([0,1,2])([0.4,0.4,1.5])(astaObliqua),contrappeso])));

  var asta2 =  T([0,1,2])([0.9,2.2,14.6])(R([1,2])([2.2*PI/4])(STRUCT([T([0,1,2])([-0.25,-0.1,-0.2])(astaObliqua),contrappeso])));

  var contenitore = CUBOID([3,3,0.5]);

  var vetro = T([0,1,2])([-0.4,-5,14])(R([1,2])([PI/19+PI])(T([2])([0.5])(COLOR([1.3,1.3,1.3])(CUBOID([3,3,0.07])))));

  var piatto_lampada = T([0,1,2])([-0.4,-5,14])(R([1,2])([PI/19+PI])(contenitore));

  var lampada = S([0,1,2])([1.4,1.4,1.4])(STRUCT([vetro,COLOR([0.4,0.4,0.4])(STRUCT([baseLampada,astaLampada,asta1,asta2,piatto_lampada]))]));


  //pavimento

  var pavimento = T([1,2])([-25,-0.04])(COLOR([0.95,0.95,0.95])(CUBOID([60,85,0.04])));

  var muro = T([0,1])([-0.02,-25])(COLOR([0.95,0.95,0.95])(CUBOID([0.02,85,38])));

  //tappeti

  var tappeto_1 = T([0,1,2])([30,20,0.016])(COLOR(viola)(CYLINDER([13, 0.04])(50)));

  var tappeto_2 =  T([0,1,2])([40,-6,0.016])(COLOR(viola)(CYLINDER([9, 0.04])(50)));

  var tappeti = STRUCT([tappeto_1,tappeto_2]);

  //tavolino
  var zampa_1 = CUBOID([0.1,0.1,4]);
  var zampa_2 = T([1])([3])(CUBOID([0.1,0.1,4]));
  var zampa_3 = T([0])([0.1])(CUBOID([4,0.1,0.1]));
  var zampa_4 = T([0,1])([0.1,3])(CUBOID([4,0.1,0.1]));
  var zampa_5 = T([0])([4.1])(CUBOID([0.1,3.1,0.1]));

  var appoggio_tavolino = T([2])([4])(CUBOID([0.1,3.1,0.1]));

  var ripiano_tavolino = T([2])([4.1])(COLOR([0,0,0])(CUBOID([4,3.1,0.3])));


  var tavolino = T([0,1,2])([36,27,0.04])(R([0,1])([PI])(S([0,1,2])([1.2,1.2,1.2])(STRUCT([zampa_1, zampa_2,zampa_3, zampa_4, zampa_5, appoggio_tavolino, ripiano_tavolino]))));


  var struttura = STRUCT([tv, T([0,1])([20,-8])(R([0,1])([PI])(lampada)), tavolino, tappeti, muro, pavimento, coppa, T([0,1,2])([35,35,0.04])(R([0,1])([PI])(divano)), cassetti, base, appoggia_libri]);

  DRAW(struttura);