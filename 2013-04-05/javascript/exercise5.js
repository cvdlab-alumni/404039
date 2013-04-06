//parameters to use python-like code

T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

//stairs


l = 35.6
n = 12
g = 2
a = 35.0/n 
p = l/n

vertex = [[0,0],[0,g+a/2.0],[p,a/2.0],[p,g+a/2.0]]
cells = [[1,2,3,4]]

var step2D = SIMPLICIAL_COMPLEX(vertex)([[0,2,1],[1,2,3]]);



step3D = MAP([S1,S3,S2])(EXTRUDE([15])(step2D))

ramp = STRUCT(NN(n)([step3D,T([1,3])([p,a])]))

stair1 = T([1,2])([35,54])(ramp)

stair2 = T([1,2,3])([17.5,54,23])(ramp)

stair3 = T([1,2,3])([75,54,49])(ramp)

stairs =STRUCT([stair1,stair2,stair3])

