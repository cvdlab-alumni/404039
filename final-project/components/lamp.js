CYLINDER = function (params) {
    var R = params[0];
    var h = params[1];
    return function (dims) {
      var domain = DOMAIN([[0,2*PI], [0,R]])([dims, 1]);
      var mapping = function (v) {
        var a = v[0];
        var r = v[1];
        return [r*COS(v[0]),r*SIN(v[0])];
      };
      var circle = MAP(mapping)(domain);
      return EXTRUDE([h])(circle);
    };
  };

  //override of T function without clone() invocation.

  var T =
  fun.T =
  fun.TRANSLATE = function (dims) {
    return function (values) {
      return function (object) {
       return object.translate(dims, values);
      };
    };
  };

  //override of R function without clone() invocation.
  var R =
  fun.R = 
  fun.ROTATE = function (dims) {
    return function (angle) {
      return function (object) {
        return object.rotate(dims, angle);
      };
    };
  };

  //override of S function without clone() invocation

  var S =
  fun.S =
  fun.SCALE = function (dims) {
    return function (values) {
      return function (object) {
        return object.scale(dims, values);
      };
    };
  };
 var baseLampada = CUBOID([3,3,0.2]);

  var astaLampada = T([0,1])([1.5,1.5])(CYLINDER([0.15,11])(15));

  var astaObliqua = CYLINDER([0.12,8.5])(15);

  var contrappeso = CUBOID([0.4,0.6,1.5]);

  var asta1 = T([0,1,2])([0.9,5,7])(R([1,2])([PI/4])(STRUCT([T([0,1,2])([0.4,0.4,1.5])(astaObliqua),contrappeso])));

  var asta2 =  T([0,1,2])([0.9,2.2,14.6])(R([1,2])([2.2*PI/4])(STRUCT([T([0,1,2])([-0.25,-0.1,-0.2])(astaObliqua),contrappeso])));

  var contenitore = CUBOID([3,3,0.5]);

  var vetro = T([0,1,2])([-0.4,-5,14])(R([1,2])([PI/19+PI])(T([2])([0.5])(COLOR([1.3,1.3,1.3])(CUBOID([3,3,0.07])))));

  var piatto_lampada = T([0,1,2])([-0.4,-5,14])(R([1,2])([PI/19+PI])(contenitore));

  var lampada = S([0,1,2])([1.4,1.4,1.4])(STRUCT([vetro,COLOR([0.4,0.4,0.4])(STRUCT([baseLampada,astaLampada,asta1,asta2,piatto_lampada]))]));

  DRAW(lampada);