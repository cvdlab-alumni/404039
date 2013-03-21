function Point2D(x,y){
	this.x=x;
	this.y=y;
}

function Edge(p1,p2){
this.x1=p1.x;
this.x2=p2.x;
this.y1=p1.y;
this.y2=p2.y;
}

function length(e){
	var len=Math.sqrt(Math.pow(e.x2-e.x1,2)+Math.pow(e.y2-e.y1,2));
	return len;
}

function Triangle(e1,e2,e3){
	this.edge1=e1;
	this.edge2=e2;
	this.edge3=e3;
}

function perimeter(t){
	var perimeter=length(t.edge1)+length(t.edge2)+length(t.edge3);
	return perimeter;
}

function area(t){
	var p=perimeter(t)/2;
	var area=Math.sqrt(p*(p-length(t.edge1))*(p-length(t.edge2))*(p-length(t.edge3)));
	return area;
}

