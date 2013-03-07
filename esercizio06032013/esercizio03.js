var i;
var z;
var string1;
string1="";

for(i=1;i<11;i++){
for(z=1;z<11;z++){
	if(i===z)
    string1=string1.concat("1");
    else 
	string1=string1.concat("0");

if(z!==10)
string1=string1.concat(",\t");
}
string1=string1.concat("\n");
}
console.log(string1);

