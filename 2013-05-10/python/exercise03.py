#ESERCIZIO 1

#generazione profilo laterale
#ossia sezione per y=0

domain1 = INTERVALS(1)(30);

upper_back_side_cpoints=[[2.39, 5.47], [2.63, 5.43], [3.68, 5.71], [3.77, 5.81]];
upper_back_side_bez = BEZIER(S1)(upper_back_side_cpoints);
mapped_upper_back_side_cpoints = MAP(upper_back_side_bez)(domain1);


upper_side_cpoints = [[5.87, 5.52], [5.41, 5.69], [4.79, 5.98], [3.77, 5.81]];
upper_side_bez = BEZIER(S1)(upper_side_cpoints);
mapped_upper_side_cpoints = MAP(upper_side_bez)(domain1);

cofano_side_cpoints = [[5.87, 5.52], [6.01, 5.55], [6.82, 5.41], [7.37, 5.17]];
cofano_side_bez = BEZIER(S1)(cofano_side_cpoints);
mapped_cofano_side_cpoints = MAP(cofano_side_bez)(domain1);

cofano_side_front_offset = [[7.32, 4.88], [7.34, 4.99], [7.41, 4.92], [7.37, 5.17]];
cofano_side_front_bez = BEZIER(S1)(cofano_side_front_offset);
mapped_cofano_side_front_offset = MAP(cofano_side_front_bez)(domain1);

cofano_lower_front_offset_cpoints = [[7.32, 4.89], [7.34, 4.95], [7.36, 4.73], [7.36, 4.81]];
cofano_lower_front_offset_bez = BEZIER(S1)(cofano_lower_front_offset_cpoints);
mapped_cofano_lower_front = MAP(cofano_lower_front_offset_bez)(domain1);

lower_side_front_cpoints = [[6.55, 4.81], [7.06, 4.83], [7.31, 4.75], [7.35, 4.84]];
lower_side_front_bez = BEZIER(S1)(lower_side_front_cpoints);
mapped_lower_side_front = MAP(lower_side_front_bez)(domain1);

lower_side_front_tire_cpoints= [[6.55, 4.81], [6.55, 5.62], [5.65, 5.48], [5.76, 4.77]];
lower_side_front_tire_bez = BEZIER(S1)(lower_side_front_tire_cpoints);
mapped_lower_side_front_tire = MAP(lower_side_front_tire_bez)(domain1);

front_low_side_cpoints = [[3.7, 4.75], [3.7, 5.68], [2.69, 5.39], [2.83, 4.8]];
front_low_side_bez = BEZIER(S1)(front_low_side_cpoints);
mapped_front_low_side_cpoints = MAP(front_low_side_bez)(domain1);

lower_side_cpoints = [[3.7, 4.75], [4.01, 4.77], [4.85, 4.74], [5.76, 4.77]];
lower_side_bez = BEZIER(S1)(lower_side_cpoints);
mapped_lower_side_cpoints = MAP(lower_side_bez)(domain1);

lower_back_side_cpoints = [[2.35, 5.17], [2.27, 5.04], [2.58, 4.86], [2.83, 4.8]];
lower_back_side_bez = BEZIER(S1)(lower_back_side_cpoints);
mapped_lower_back_side_cpoints = MAP(lower_back_side_bez)(domain1);

back_side_cpoints = [[2.35, 5.17], [2.55, 5.14], [2.55, 5.16], [2.54, 5.38]];
back_side_bez = BEZIER(S1)(back_side_cpoints);
mapped_back_side_cpoints = MAP(back_side_bez)(domain1);

back_cpoints = [[2.4, 5.47], [2.4, 5.36], [2.39, 5.39], [2.54, 5.38]];
back_bez = BEZIER(S1)(back_cpoints);
mapped_back = MAP(back_bez)(domain1);

side_profile = STRUCT([mapped_cofano_side_front_offset, mapped_back_side_cpoints, mapped_back, mapped_lower_back_side_cpoints, mapped_lower_side_cpoints, mapped_upper_back_side_cpoints, mapped_upper_side_cpoints, mapped_cofano_side_cpoints, mapped_cofano_lower_front, mapped_lower_side_front, mapped_lower_side_front_tire, mapped_front_low_side_cpoints]);
r_side_profile = R([2,3])(PI/2)(side_profile);
t_side_profile = T([1,2,3])([-4.89,0.2,-5.26])(r_side_profile);

#frontal section

front_lower_right_cpoints = [[0.1, 3.86], [0.04, 3.47], [0.01, 3.15], [0.3, 3.14]];
front_lower_right_bez = BEZIER(S1)(front_lower_right_cpoints);
mapped_front_lower_right_cpoints = MAP(front_lower_right_bez)(domain1);


front_lower_cpoints = [[2.04, 3.16], [1.34, 3.09], [0.35, 3.05], [0.17, 3.19]];
front_lower_bez = BEZIER(S1)(front_lower_cpoints);
mapped_front_lower_cpoints = MAP(front_lower_bez)(domain1);

front_lower_left_cpoints = [[2.04, 3.16], [2.25, 3.17], [2.31, 3.72], [2.18, 3.86]];
front_lower_left_bez = BEZIER(S1)(front_lower_left_cpoints);
mapped_front_lower_left_cpoints = MAP(front_lower_left_bez)(domain1);


front_upper_left_cpoints = [[1.75, 4.23], [1.85, 4.07], [1.94, 3.85], [2.18, 3.86]];
front_upper_left_bez = BEZIER(S1)(front_upper_left_cpoints);
mapped_front_upper_left_cpoints = MAP(front_upper_left_bez)(domain1);

front_upper_cpoints = [[1.75, 4.23], [1.51, 4.34], [0.76, 4.32], [0.56, 4.25]];
front_upper_bez = BEZIER(S1)(front_upper_cpoints);
mapped_front_upper_cpoints = MAP(front_upper_bez)(domain1);

front_upper_right_cpoints = [[0.09, 3.85], [0.5, 3.93], [0.4, 4.17], [0.56, 4.25]];
front_upper_right_bez = BEZIER(S1)(front_upper_right_cpoints);
mapped_front_upper_right_cpoints = MAP(front_upper_right_bez)(domain1);

front_profile = STRUCT([mapped_front_lower_right_cpoints,mapped_front_lower_cpoints,mapped_front_lower_left_cpoints,mapped_front_upper_left_cpoints,mapped_front_upper_cpoints,mapped_front_upper_right_cpoints]);
r_front_profile = R([1,3])(PI/2)(front_profile);
rr_front_profile = R([2,3])(PI/2)(r_front_profile);
t_front_profile = T([2,3])([1.46,-3.65])(rr_front_profile);
s_front_profile = S([1,2,3])([9.06/10,9.06/10,9.06/10])(t_front_profile);
#upper section

back_upper_cpoints = [[2.65, 2.5], [2.39, 2.57], [2.43, 4.42], [2.65, 4.45]];
back_upper_bez = BEZIER(S1)(back_upper_cpoints);
mapped_back_upper_cpoints = MAP(back_upper_bez)(domain1);

left_upper_cpoints =[[5.59, 4.4], [3.78, 4.51], [2.99, 4.47], [2.65, 4.45]];
left_upper_bez = BEZIER(S1)(left_upper_cpoints);
mapped_left_upper_cpoints = MAP(left_upper_bez)(domain1);


left_front_upper_cpoints = [[5.59, 4.4], [7.2, 4.4], [7.13, 4.25], [7.25, 3.85]];
left_front_upper_bez = BEZIER(S1)(left_front_upper_cpoints);
mapped_left_front_upper_cpoints = MAP(left_front_upper_bez)(domain1);

frontal_upper_cpoints = [[7.25, 3.08], [7.29, 3.34], [7.23, 3.82], [7.25, 3.85]];
frontal_upper_bez = BEZIER(S1)(frontal_upper_cpoints);
mapped_frontal_upper_cpoints = MAP(frontal_upper_bez)(domain1);


right_front_upper_cpoints = [[7.25, 3.08], [7.26, 2.61], [6.86, 2.49], [5.83, 2.52]];
right_front_upper_bez = BEZIER(S1)(right_front_upper_cpoints);
mapped_right_front_upper_cpoints = MAP(right_front_upper_bez)(domain1);

right_upper_cpoints = [[3.43, 2.46], [4.37, 2.46], [5.05, 2.48], [5.83, 2.52]];
right_upper_bez = BEZIER(S1)(right_upper_cpoints);
mapped_right_upper_cpoints = MAP(right_upper_bez)(domain1);

right_back_upper_cpoints = [[2.65, 2.49], [3.82, 2.41], [5.05, 2.48], [5.83, 2.52]];
right_back_upper_bez = BEZIER(S1)(right_back_upper_cpoints);
mapped_right_back_upper_cpoints = MAP(right_back_upper_bez)(domain1);

upper_profile = STRUCT([mapped_back_upper_cpoints,mapped_left_upper_cpoints,mapped_frontal_upper_cpoints,mapped_left_front_upper_cpoints,mapped_right_front_upper_cpoints,mapped_right_front_upper_cpoints, mapped_right_upper_cpoints, mapped_right_back_upper_cpoints]);
t_upper_profile = T([1,2,3])([-4.87,-3.2,-0.13])(upper_profile);
s_upper_profile = S([1])([1.066])(t_upper_profile);


#ESERCIZIO 2

cerchione_esterno = CIRCLE(4.6)([200,1]);
cerchione_interno = CIRCLE(4.3)([200,1]);
cerchione = PROD([DIFFERENCE([cerchione_esterno,cerchione_interno]), Q(2)]);

small_cerchione_esterno = CIRCLE(4.3)([200,1]);
small_cerchione_interno = CIRCLE(4.05)([200,1]); 
small_cerchione = T([3])([0.25])(PROD([DIFFERENCE([small_cerchione_esterno,small_cerchione_interno]), Q(1.5)]));

pneumatico_interno = CIRCLE(4.6)([200,1]);
pneumatico_esterno = CIRCLE(5.4)([200,1]);
pneumatico = COLOR(BLACK)(PROD([DIFFERENCE([pneumatico_esterno,pneumatico_interno]), Q(2)]));


pentagono1 = MKPOL([[[5.35,7.66],[3.18,6.17],[3.92,3.56],[5.35,7.66]],[[1,2,3,4]],None]);
pentagono2 = MKPOL([[[5.35,7.66],[3.92,3.56],[6.67,3.49],[5.35,7.66]],[[1,2,3,4]],None]);
pentagono3 =  MKPOL([[[5.35,7.66],[6.67,3.49],[7.44,6.03],[5.35,7.66]],[[1,2,3,4]],None]);

onetriangolo1 = MKPOL([[[3.92,3.56],[4.66,1.31],[6.67,3.49],[3.92,3.56]],[[1,2,3,4]],None]);
onetriangolo2 = MKPOL([[[3.92,3.56],[5.86,1.31],[6.67,3.49],[3.92,3.56]],[[1,2,3,4]],None]);
onetriangolo3 =  MKPOL([[[4.66,1.31],[5.86,1.31],[3.92,3.56],[4.66,1.31]],[[1,2,3,4]],None]);

twotriangolo1 = MKPOL([[[3.18,6.17],[1.27,4.97],[3.92,3.56],[3.18,6.17]],[[1,2,3,4]],None]);
twotriangolo2 = MKPOL([[[3.18,6.17],[1.69,3.56],[3.92,3.56],[3.18,6.17]],[[1,2,3,4]],None]);
twotriangolo3 = MKPOL([[[1.27,4.97],[1.69,3.56],[3.18,6.17],[1.27,4.97]],[[1,2,3,4]],None]);

threetriangolo1 = MKPOL([[[2.43,8.18],[3.18,6.17],[5.35,7.66],[2.43,8.18]],[[1,2,3,4]],None]);
threetriangolo2 = MKPOL([[[3.63,8.96],[5.35,7.66],[3.18,6.17],[3.63,8.96]],[[1,2,3,4]],None]);
threetriangolo3 = MKPOL([[[2.43,8.18],[3.63,8.96],[3.18,6.17],[2.43,8.18]],[[1,2,3,4]],None]);

fourtriangolo1 = MKPOL([[[5.35,7.66],[7.16,8.89],[7.44,6.03],[5.35,7.66]],[[1,2,3,4]],None]);
fourtriangolo2 = MKPOL([[[5.35,7.66],[8.11,8.11],[7.44,6.03],[5.35,7.66]],[[1,2,3,4]],None]);
fourtriangolo3 = MKPOL([[[7.16,8.89],[8.11,8.11],[5.35,7.66],[7.16,8.89]],[[1,2,3,4]],None]);

fivetriangolo1 = MKPOL([[[6.67,3.49],[8.96,3.49],[7.44,6.03],[6.67,3.49]],[[1,2,3,4]],None]);
fivetriangolo2 = MKPOL([[[6.67,3.49],[9.28,4.73],[7.44,6.03],[6.67,3.49]],[[1,2,3,4]],None]);
fivetriangolo3 = MKPOL([[[8.96,3.49],[9.28,4.73],[6.67,3.49],[8.96,3.49]],[[1,2,3,4]],None]);

stemma = T([3])([0.25])(COLOR(YELLOW)(CYLINDER([1,0.8])(80)))
bullone1 = T([1,2,3])([1.7,-0.6,0.25])(CYLINDER([0.4,1])(80));
bullone2 = T([1,2,3])([1.1,1.4,0.25])(CYLINDER([0.4,1])(80));
bullone3 = T([1,2,3])([0,-1.7,0.25])(CYLINDER([0.4,1])(80));
bullone4 = T([1,2,3])([-1.7,-0.3,0.25])(CYLINDER([0.4,1])(80));
bullone5 = T([1,2,3])([-1,1.4,0.25])(CYLINDER([0.4,1])(80));

bulloni = COLOR(BLACK)(STRUCT([bullone1,bullone2,bullone3,bullone4,bullone5]));

triangolo1 = STRUCT([onetriangolo1,onetriangolo2,onetriangolo3]);
triangolo2 = STRUCT([twotriangolo1,twotriangolo2,twotriangolo3]);
triangolo3 = STRUCT([threetriangolo1,threetriangolo2,threetriangolo3]);
triangolo4 = STRUCT([fourtriangolo1,fourtriangolo2,fourtriangolo3]);
triangolo5 = STRUCT([fivetriangolo1,fivetriangolo2,fivetriangolo3]);

pentagono_st = STRUCT([pentagono1,pentagono2,pentagono3]);
interno = STRUCT([triangolo1,triangolo2,triangolo3,triangolo4,triangolo5,pentagono_st]);
cerchio = S([1,2,3])([1.1,1.1,1.1])(T([1,2,3])([-5.4,-5.4,0.45])(PROD([interno,Q(1.1)])));

back = T([3])([1.8])(COLOR(RED)(CYLINDER([4.6,0.1])(80)));


ruota = S([1,2,3])([1./8,1./18,1./18])(R([1,3])(PI/2)(STRUCT([back,bulloni,stemma,cerchione,cerchio,pneumatico,small_cerchione])));
ruota1 = T([1,2,3])([1.25,1.3,-0.3])(R([1,2])(PI/2)(ruota));
ruota2 = T([1])([-2.87])(ruota1);
ruota3 = T([2,3])([0.54,-0.6])(R([2,3])((PI))(ruota1));
ruota4 = T([1])([-2.87])(ruota3);

ruote = STRUCT([ruota1,ruota2,ruota3,ruota4]);

VIEW(STRUCT([s_upper_profile,s_front_profile,t_side_profile,ruote]));
