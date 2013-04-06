//ex1

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

// end of configuration

CYLINDER = function (params) {
  var R = params[0];
  var h = params[1];
  return function (dims) {
    var domain = DOMAIN([[0,2*PI], [0,R]])([dims, 1]);
    var mapping = function (v) {
      var a = v[0];
      var r = v[1];
      return [r*COS(v[0]),r*SIN(v[0])]
    }
    var circle = MAP(mapping)(domain);
    return EXTRUDE([h])(circle)
  }
}

  //1 = 0,1 m

//floor 0 pillars

r_column_f0 = 1.25    //column radius is 12.5 cm
h_column_f0 = 25      //column height is 2.5m
bottom_round_pillar_translation = T([1])([27.5])  

round_pillar = T([1,2,3])([1.25,1.25,0.1])((CYLINDER([r_column_f0,h_column_f0])(80)))  //translation on z to place floor
square_pillar = CUBOID([2.5,2.5,25])

bottom_round_pillars = STRUCT(NN(5)([round_pillar,bottom_round_pillar_translation]))

upper_round_pillar=T([2])([52+2.5])(round_pillar)
upper_round_pillars=STRUCT(NN(2)([upper_round_pillar,T([1])([110])(upper_round_pillar)]))

round_pillars = STRUCT([bottom_round_pillars,upper_round_pillars])


square_pillars_f0 = T([1,2])([25+2.5,52+2.5])(STRUCT(NN(3)([square_pillar,T([1])([25+2.5])])))

pillars0 = STRUCT([round_pillars,square_pillars_f0])

//floor 1 pillars

square_pillars_f11 = GRID([[2.5,-25,2.5,-25],[2.5,-52,2.5],[-0.1,-25,-2,25*2+2]])
square_pillars_f12 = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,25*2+2]])
lone_square_pillar_f1 = T([1,3])([3*2.5+3*25,25+2])(square_pillar)
lone_round_pillar_f1 = T([1,2,3])([3*2.5+3*25,52+2.5,25+2])(round_pillar)
square_pillars_f1 = STRUCT([square_pillars_f11,square_pillars_f12])
pillars1 = STRUCT([square_pillars_f1,lone_round_pillar_f1,lone_square_pillar_f1])


//floor 2 pillars  (they are only two, because wall pillars start from floor 1)
square_pillars_f2 = GRID([[-2.5,-25,-2.5,-25,-2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,-25,-2,25]])
lone_square_pillars_f2 = T([1,2,3])([2.5*2+25*2,52+2.5,25*2+2*2])(STRUCT(NN(2)([square_pillar,T([1])([25+2.5])])))

pillars2 = STRUCT([square_pillars_f2, lone_square_pillars_f2])


//floor 3 pillars 

square_pillars_f3 = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[2.5,-52,2.5],[-0.1,-25,-2,-25,-2,-25,-2,25]])
upper_square_pillars_f3 =  GRID([[-0.5,-1.5,-0.5-25,-0.5,-1.5,-0.5-25,-2.5,-25,2.5,-25],[-2.5,-52,2.5],[-25,-2,-25,-2,-25,-2,25]])
pillars3 = STRUCT([square_pillars_f3,upper_square_pillars_f3])

pillars = STRUCT([pillars0,pillars1,pillars2,pillars3])

//ex 2

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


//ex 3

//WEST 

right_part_west = GRID([[-50.4,63.4],[2],[106.45]])
upper_centre_west = GRID([[-25.21,25.21],[2],[-51.50,54.94]])
left_middle_west = GRID([[14.77],[2],[-25.21,81.23]])
upper_window_west= GRID([[-14.76,8.28],[2],[-73.84,32.61]])
inner_window_west= GRID([[-17.2,5.4],[2],[-62.85,13]])
upper_wall_west = GRID([[114],[2],[-73.84,32.61]])
between_windows_west = GRID([[114],[2],[-51.5,13.6]])
low_wall_west = GRID([[-17.55,17.55,-5,4,17.55],[2],[4.77]])
low_window_grid_west = GRID([[-34.94,5.43],[2],[18.19,-5.4,16.12]])
mid_window_offset_west = GRID([[-40.3,14.40],[2],[39.8]])
mid_window_offset2_west = GRID([[-17.46,17.46],[2],[39.8]])
window_fill_west = GRID([[25.2],[2],[-25.21,27.5]])

west_side = STRUCT([right_part_west, upper_centre_west,upper_window_west,inner_window_west,left_middle_west,upper_wall_west,between_windows_west,low_wall_west,low_window_grid_west,window_fill_west, mid_window_offset_west,mid_window_offset2_west])
west_r = R([1,2])(PI)(west_side)

west = T([1,2])([114,68.5])(west_r)

//NORTH

north_wall_1 = GRID([[2.52],[2],[106.4]])
north_wall_2 = GRID([[-2.52,50.6],[2],[-25,13.69,-10.08,13.69,-10.08,14.05,-10.08,9.8]])
north_wall_3 = GRID([[-53.12,8.6,-2.40,4.3],[2],[-25,81.4]])
north_wall_4 = GRID([[-61.5,2.9],[2],[-25,2.88,-25.21,2.88,-21.61,2.88,-21.61,3.93]])

north_side = STRUCT([north_wall_1,north_wall_2,north_wall_3,north_wall_4])
north_r = R([1,2])(PI/2)(north_side)

north = T([1])([114])(north_r)

//EAST
east_wall_1 = GRID([[55.29],[2],[-25,59.8,-11.99,11.6]])
east_wall_2 = GRID([[-55.29,3.3,-25.21,30.98],[2],[-25,81.4]])
east_wall_3 = GRID([[-58.35,25.9],[2],[-25,13.75,-10.08,13.75,-10.08,13.75,-10.08,9.91]])

east = STRUCT([east_wall_1,east_wall_2,east_wall_3])

//SOUTH
south_wall_1 = GRID([[68.5],[2],[-25,1.8,-22.51,4.32,-22.51,11.53,-10.99,7.74]])
south_wall_2 = GRID([[14.66,-50.68,3.16],[2],[-53.12,24.53]])
south_wall_3 = GRID([[2.5,-10.8,1.45],[2],[-25,-0.09,24.5]])
south_wall_4 = GRID([[-65.37,3.12],[2],[-25,60.15]])
south_wall_5 = GRID([[0.36,-12.06,0.36],[2],[-85,15.6]])
south_side = STRUCT([south_wall_1,south_wall_2,south_wall_3,south_wall_4,south_wall_5])
south_r= R([1,2])(-PI/2)(south_side)

south = T([2])([68.5])(south_r)

walls = STRUCT([south,north,east,west])

//ex 4

window_1 = CUBOID([25,2,10.08])

window_1_t = T([1,3])([58.35,39])(window_1)

final_windows = STRUCT(NN(3)([COLOR([0.8, 0.4, 0.2, 0.7])(window_1_t),T([3])([23.5])]))  //3xblack windows

// ex 5

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

stair1 = T([1,2])([35,53])(ramp)

stair2 = T([1,2,3])([17.5,53,23])(ramp)

stair3 = T([1,2,3])([75,53,49])(ramp)

stairs =STRUCT([stair1,stair2,stair3])


building = STRUCT([pillars,floors,final_windows,walls,stairs])

VIEW(building)