#1 = 0,1 m

#floor 0 pillars

r_column_f0 = 1.25    #column radius is 12.5 cm
h_column_f0 = 25      #column height is 2.5m
bottom_round_pillar_translation = T([1])([27.5])  

round_pillar = T([1,2,3])([1.25,1.25,0.1])((CYLINDER([r_column_f0,h_column_f0])(80)))  #translation on z to place floor
square_pillar = CUBOID([2.5,2.5,25])

bottom_round_pillars = STRUCT(NN(5)([round_pillar,bottom_round_pillar_translation]))

upper_round_pillar=T([2])([52+2.5])(round_pillar)
upper_round_pillars=STRUCT(NN(2)([upper_round_pillar,T([1])([110])(upper_round_pillar)]))

round_pillars = STRUCT([bottom_round_pillars,upper_round_pillars])

GRID = COMP([INSR(PROD),AA(QUOTE)])

square_pillars_f0 = T([1,2])([25+2.5,52+2.5])(STRUCT(NN(3)([square_pillar,T([1])([25+2.5])])))

pillars0 = STRUCT([round_pillars,square_pillars_f0])


#floor 1 pillars

square_pillars_f1 = GRID([[2.5,-25,2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,25]])
lone_square_pillar_f1 = T([1,3])([3*2.5+3*25,25+2])(square_pillar)
lone_round_pillar_f1 = T([1,2,3])([3*2.5+3*25,52+2.5,25+2])(round_pillar)

pillars1 = STRUCT([square_pillars_f1,lone_round_pillar_f1,lone_square_pillar_f1])


#floor 2 pillars
square_pillars_f2 = GRID([[2.5,-25,2.5,-25,-2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,-25,-2,25]])
lone_square_pillars_f2 = T([1,2,3])([2.5*2+25*2,52+2.5,25*2+2*2])(STRUCT(NN(2)([square_pillar,T([1])([25+2.5])])))

pillars2 = STRUCT([square_pillars_f2, lone_square_pillars_f2])


#floor 3 pillars 

square_pillars_f3 = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,-25,-2,-25,-2,25]])
upper_square_pillars_f3 =  GRID([[-0.5,1.5,-0.5-25,-0.5,1.5,-0.5-25,-2.5,-25,2.5,-25],[-2.5,-52,2.5],[-25,-2,-25,-2,-25,-2,25]])
pillars3 = STRUCT([square_pillars_f3,upper_square_pillars_f3])

building = STRUCT([pillars0,pillars1,pillars2,pillars3]) 

VIEW(building)