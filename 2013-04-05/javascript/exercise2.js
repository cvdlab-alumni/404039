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



//floor0

floor0 = CUBOID([114,68.5,0.1])



//floor1

floor_1_base = T([3])([0.1+25])(GRID([[31,-30.8,50.5],[68.5],[2]]))
floor_1_offset = T([3])([0.1+25])(GRID([[-31,30.8,50.5],[56.7],[2]]))
floor_1_balcony = T([1,2,3])([-12.5,54.5,0.1+25])(CUBOID([12.5,12,2]))
floor_1_stairs_support = T([3])([0.1+25])(GRID([[-31,30.8,-50.5],[-66.5,2],[2]]))
floor1 = STRUCT([floor_1_balcony,floor_1_base,floor_1_offset,floor_1_stairs_support])

//floor 2
var points = [[10.3,0],[13.5,0],[13.5,55.5],[0,55.5]]
var cells = [[0,2,3],[0,1,2]]
var triangular_balcony_2D = SIMPLICIAL_COMPLEX(points)(cells)
var triangular_balcony_3D = EXTRUDE([2])(triangular_balcony_2D)


triangular_balcuny_floor_2 = T([1,3])([45,0.1+25*2+2])(triangular_balcony_3D)
floor_2_offset = T([3])([0.1+25*2+2])(GRID([[-54.9,57.4],[68.5],[2]]))
floor_2_stairs_offset = T([3])([0.1+25*2+2])(GRID([[12.24],[-53.9,14.58],[2]]))
floor_2_stairs_support = T([3])([0.1+25*2+2])(GRID([[-12.24,34.8],[-66.5,2],[2]]))
floor_2_small_offset = T([3])([0.1+25*2+2])(GRID([[-47,14.6],[-55.22,13.12],[2]]))
floor2 = STRUCT([triangular_balcuny_floor_2,floor_2_offset,floor_2_stairs_offset,floor_2_stairs_support,floor_2_small_offset])


//floor3
lower_floor_3 = T([3])([0.1+25*3+2*2])(GRID([[58.35,-30.8,23.25],[68.5],[2]]))
upper_floor_3 = T([3])([0.1+25*3+2*2])(GRID([[-58.35,30.8],[55.8],[2]]))
floor_3_stairs_support = T([3])([0.1+25*3+2*2])(GRID([[-58.35,30.8,-23.25],[-66.5,2],[2]]))

floor3=STRUCT([lower_floor_3,upper_floor_3,floor_3_stairs_support])

//floor4 
upper_floor_4 = T([3])([0.1+25*4+2*3])(GRID([[114],[-54.82,13.68],[2]]))
lower_floor_4 = T([3])([0.1+25*4+2*3])(GRID([[-55,59],[68.5],[2]]))

floor4 = STRUCT([upper_floor_4,lower_floor_4]) 


floors = STRUCT([floor0,floor1,floor2,floor3,floor4])

