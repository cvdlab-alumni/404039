#floor0

floor0 = CUBOID([114,68.5,0.1])

#floor1
floor_1_shape = T([3])([0.1+25])(CUBOID([114,68.5,2]))
floor_1_balcony = T([1,2,3])([-12.5,54.5,0.1+25])(CUBOID([12.5,12,2]))

floor1 = STRUCT([floor_1_shape,floor_1_balcony])

#floor2
floor2 = T([3])([0.1+25*2+2])(CUBOID([114,68.5,2]))

#floor3
floor3 = T([3])([0.1+25*3+2*2])(CUBOID([114,68.5,2]))
