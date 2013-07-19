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


  

  var struttura = STRUCT([tv, coppa, cassetti, base, appoggia_libri]);

  DRAW(struttura);