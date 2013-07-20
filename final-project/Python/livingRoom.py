def DOMAIN(dims):
  def DOMAIN0(divs):
    g = GRID(divs)
    i = 1
    for item in dims:
      a = item[0]
      b = item[1]
      g = T([i])([a])(SCALE([i])([b-a])(g))
      i = i+1
    return g
  return DOMAIN0
  
domain_cuscino =  INTERVALS(1)(30);
domain_cuscino_2d =  DOMAIN([[0,1],[0,1]])([30,40]);
domain_coppa_2d = DOMAIN([[0,8],[0,1]])([30,40]);

bianco = [1,1,1];

base_back = CUBOID([0.4,32,19]);
base_piccola = CUBOID([4,32,0.7]);
base_grande = T([3])([0.7])(CUBOID([7,32,0.2]));
base = COLOR([0.2,0.2,0.2])(STRUCT([base_back,base_grande,base_piccola]));

spessore_cassetto = 2.5;
larghezza_cassetto = 2.4;
altezza_cassetto = 10;
cassetto_armadio = CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto]);


cassetto1 = COLOR(YELLOW)(T([1,3])([0.4,6])(CUBOID([2.5,2.4,10])));
cassetto2 = COLOR(PURPLE)(T([1,2,3])([0.4,larghezza_cassetto,7.3])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
cassetto3 = COLOR(bianco)(T([1,2,3])([0.4,larghezza_cassetto*2,5])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
cassetto4 = COLOR(PURPLE)(T([1,2,3])([0.4,larghezza_cassetto*3,4])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));
cassetto5 = COLOR(YELLOW)(T([1,2,3])([0.4,larghezza_cassetto*4,6.7])(CUBOID([spessore_cassetto,larghezza_cassetto,altezza_cassetto])));

cassetto_basso1 = T([1,2,3])([0.4,11,0.9])(COLOR(bianco)(CUBOID([4.5,10,2])));
cassetto_basso2 =  T([1,2,3])([0.4,21.15,0.9])(COLOR(bianco)(CUBOID([4.5,10,2])));

supporto_cassetti_bassi = T([1,2,3])([0.4,11,2.9])(COLOR([0.1,0.1,0.1])(CUBOID([4.9,20.15,0.3])));

cassetti = STRUCT([cassetto1,cassetto2,cassetto3,cassetto4,cassetto5,cassetto_basso1,cassetto_basso2,supporto_cassetti_bassi]);

appoggia_libri_verticale = T([1,2,3])([0.6,18,3.2])(COLOR(YELLOW)(CUBOID([1.5,1.5,3])));
appoggia_libri_orizzontale =  T([1,2,3])([0.6,16.5,6.2])(COLOR(YELLOW)(CUBOID([1.5,3,1.5])));

appoggia_libri = T([2])([4])(S([1,2,3])([0.85,0.85,0.85])(STRUCT([appoggia_libri_orizzontale,appoggia_libri_verticale])));


pannello_tv_superiore = T([3])([3.1+0.6])(COLOR([0,0,0])(CUBOID([0.1,6.4,0.2])));
pannello_tv_inferiore = COLOR([0,0,0])(CUBOID([0.1,6.2,0.6]));
pannello_tv_sinistra = COLOR([0,0,0])(CUBOID([0.1,0.2,3.7]));
pannello_tv_destra = T([2])([6.2])(COLOR([0,0,0])(CUBOID([0.1,0.2,3.7])));
fascia_tv_audio = T([3])([-0.3])(CUBOID([0.1,6.4,0.3]));
pannello_retro = T([1])([-0.1])(COLOR([0,0,0])(CUBOID([0.1,6.4,3.9])));

larghezza_rettangolo_immagine = 6.1/3;

r_gb = T([2,3])([0.1,0.6])(COLOR([1,0,0])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));
r_g_b = T([2,3])([0.1+larghezza_rettangolo_immagine,0.6])(COLOR([0,1,0])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));
rg_b = T([2,3])([0.1+2*larghezza_rettangolo_immagine,0.6])(COLOR([0,0,1])(CUBOID([0.08,larghezza_rettangolo_immagine,3.1])));

immagine = STRUCT([r_gb,r_g_b,rg_b]);


tv = T([1,2,3])([0.4,20,8])(S([1,2,3])([3,1.45,1.45])(STRUCT([pannello_retro,immagine,fascia_tv_audio,pannello_tv_superiore, pannello_tv_inferiore, pannello_tv_sinistra, pannello_tv_destra])));

struttura = STRUCT([tv, cassetti, base, appoggia_libri]);

VIEW(struttura);