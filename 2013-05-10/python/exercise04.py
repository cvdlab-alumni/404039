#LEGGIMI!
#il volante è stato volutamente lasciato separato dal resto del modello perchè. quando immerso nel modello, genera problemi di rendering. la schermata risulta lentissima, non mi permette di ruotare la visuale e genera molti artefatti.
#questo è probabilmente dovuto a una questione di mapping del dominio e di poligoni usati per generare il toroide.
#ho preferito quindi lasciarlo fuori dal modello ed esporlo a sè stante per una questione di semplicità di visualizzazione del modello. questo esercizio comprende quindi il solo volante, e di conseguenza anche nell'esercizio 5 non ho immerso il volante
#nel modello


from pyplasm import *

#esercizio 4
 
def TORUS (radius):
    r1 , r2 = radius
    def TORUS0 (subds):
        N , M = subds
        a=0.5*(r2-r1)
        c=0.5*(r1+r2)
        domain=Plasm.power(  INTERVALS(2*PI)(N),  INTERVALS(2*PI)(M)  )
        fx =   lambda p: (c+a*math.cos(p[1])) * math.cos(p[0])
        fy =   lambda p: (c+a*math.cos(p[1])) * math.sin (p[0])
        fz =   lambda p: a*math.sin(p[1])
        return MAP(([fx,fy,fz]))(domain)
    return TORUS0
	
def DOMAIN(dims):
	def DOMAIN0(divs):
		g = GRID(divs)
		i = 1
		for item in dims:
			a = item[0]
			b = item[1]
			g = T([i])([a])(SCALE([i])([b-a])(g))
			i = i+1
		return g
	return DOMAIN0
	
def GRID(args):
	model = ([[]],[[0]])
	for k,steps in enumerate(args):
		model = larExtrude(model,steps*[1])
	V,cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])
	
	
	
domain1 = INTERVALS(1)(30)
domain2 = DOMAIN([[0,1],[0,1]])([30,30])

	
razza_cuboid_1 = COLOR(BLACK)(CUBOID([0.5,0.15,0.03]));
razza_cuboid_2 = T([1,2])([0.5,-0.02])(COLOR(BLACK)(CUBOID([0.26,0.19,0.05])));

razza = STRUCT([razza_cuboid_1,razza_cuboid_2]);

razza1 = T([1,2,3])([0.18,-0.06,0.01])(R([1,3])(PI/17)(razza));
razza2 = R([1,2])(2*PI/3)(razza1);
razza3 = R([1,2])(2*PI/3)(razza2);

razze = STRUCT([razza1,razza2,razza3]);

centro = COLOR(BLACK)(CYLINDER([2,0.5])(80));
rifinitura = COLOR(GRAY)(CYLINDER([1.3,0.7])(80));
stemma = COLOR(YELLOW)(CYLINDER([1,0.8])(80));


volante = T([3])([1.4])(COLOR(BLACK)(TORUS([8.5,10])([80,80])));
esterno = S([1,2,3])([1./10,1./10,1./10])(STRUCT([centro,volante,rifinitura,stemma]));

volante_completo = R([2,3])(PI/2)(S([1,2,3])([1./60,1./60,1./60])(STRUCT([esterno,razze])));



VIEW(volante_completo);