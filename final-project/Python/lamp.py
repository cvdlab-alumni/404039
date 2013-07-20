
baseLampada = CUBOID([3,3,0.2]);
astaLampada = T([1,2])([1.5,1.5])(CYLINDER([0.15,11])(15));

astaObliqua = CYLINDER([0.12,8.5])(15);

contrappeso = CUBOID([0.4,0.6,1.5]);

asta1 = T([1,2,3])([0.9,5,7])(R([2,3])(PI/4)(STRUCT([T([1,2,3])([0.4,0.4,1.5])(astaObliqua),contrappeso])));

asta2 =  T([1,2,3])([0.9,2.2,14.6])(R([2,3])(2.2*PI/4)(STRUCT([T([1,2,3])([-0.25,-0.1,-0.2])(astaObliqua),contrappeso])));

contenitore = CUBOID([3,3,0.5]);

vetro = T([1,2,3])([-0.4,-5,14])(R([2,3])(PI/19+PI)(T([3])([0.5])(COLOR([1,1,1])(CUBOID([3,3,0.07])))));

piatto_lampada = T([1,2,3])([-0.4,-5,14])(R([2,3])(PI/19+PI)(contenitore));

lampada = S([1,2,3])([1,1,1])(STRUCT([vetro,COLOR([0.4,0.4,0.4])(STRUCT([baseLampada,astaLampada,asta1,asta2,piatto_lampada]))]));

VIEW(lampada);