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

var domain_cuscino =  INTERVALS(1)(30);
var domain_coppa_2d = DOMAIN([[0,8],[0,1]])([30,40]);

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