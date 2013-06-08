/* Da Wikipedia:

# List of Vertices, with (x,y,z[,w]) coordinates, w is optional and defaults to 1.0.
  v 0.123 0.234 0.345 1.0
  v ...
  ...

  # Texture coordinates, in (u ,v [,w]) coordinates, these will vary between 0 and 1, w is optional and default to 0.
  vt 0.500 1 [0]
  vt ...
  ...

  # Normals in (x,y,z) form; normals might not be unit.
  vn 0.707 0.000 0.707
  vn ...
  ...

  # Parameter space vertices in ( u [,v] [,w] ) form; free form geometry statement ( see below )
  vp 0.310000 3.210000 2.100000
  vp ...
  ...

  # Face Definitions (see below)
  f 1 2 3
  f 3/1 4/2 5/3
  f 6/4/1 3/5/3 7/6/5
  f ...
  ...


Punti random presi dalla slide per eseguire la prova ed invocare il metodo

*/


FV = [[0,1,6,7],[0,2,4,6],[4,5,6,7],[1,3,5,7],[2,3,4,5],[0,1,2,3]];

V = [[0,1],[0,2],[0,6],[1,3],[1,7],[2,3],[2,4],[3,5],[4,5],[4,6],[5,7],[6,7]];

var arrayLARmodel = [FV,V];

function lar_to_obj(modello){
	var V = modello[1];
	var FV = modello[0];
	var out = "";
	for (var i=0;i<V.length;i++){   //itero sulla lista dei punti 2d per la rappresentazione obj (genero vertici)
		out+= "v ";
		if(V[i][2] === undefined)
			out+= V[i][0]+" "+V[i][1];
		else
			out+=V[i][0]+" "+V[i][1]+" "+V[i][2];
		out+="\n";
	}
	out+="\n";

	for (i = 0; i < FV.length; i++){  //itero sulla lista dei punti 3d (faccette)
		out+="f ";
		for (var j = 0; j < FV[i].length; j++) {
			out+=FV[i][j] + " ";
		};
		out+="\n";
	}
return out;
}


console.log(lar_to_obj(arrayLARmodel));
