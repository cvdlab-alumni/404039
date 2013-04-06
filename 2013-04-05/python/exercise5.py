#stairs

#l is length a and p raise and step

l = 35.6
n = 12
g = 2
a = 35.0/n 
p = l/n

vertex = [[0,0],[0,g+a/2.0],[p,a/2.0],[p,g+a/2.0]]
cells = [[1,2,3,4]]


step2D = MKPOL([vertex,cells,None])


step3D = PROD([step2D,Q(12)])
step3D = MAP([S1,S3,S2])(step3D)
ramp = STRUCT(NN(n)([step3D,T([1,3])([p,a])]))

stair1 = T([1,2])([35,54])(ramp)

stair2 = T([1,2,3])([17.5,54,23])(ramp)

stair3 = T([1,2,3])([75,54,49])(ramp)

stairs =STRUCT([stair1,stair2,stair3])

