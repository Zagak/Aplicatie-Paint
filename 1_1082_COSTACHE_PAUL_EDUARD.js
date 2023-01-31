class Forma{
    constructor(foaie,tip,x,y,width,height,grosime,culoare,stil=[]){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.tip=tip;
        this.foaie=foaie;
        this.grosime=grosime;
        this.culoare=culoare;
        this.stil=stil;
    }

    deseneaza(){
        let foaiectx=this.foaie.getContext('2d');

        foaiectx.beginPath();
        foaiectx.setLineDash(this.stil);
        foaiectx.fillStyle = this.culoare;
        foaiectx.lineWidth=this.grosime;
        if(this.tip==='dreptunghi')foaiectx.rect(this.x,this.y,this.width,this.height);
        else if(this.tip==='elipsa')foaiectx.ellipse(this.x,this.y,this.width,this.height, 0, 0,2*Math.PI);
        else if(this.tip==='linie') {foaiectx.moveTo(this.x,this.y);foaiectx.lineTo(this.width,this.height);}
        foaiectx.fill();
        foaiectx.stroke();
        
    }
    setGrosime(gros){
        this.grosime=gros;
    }

    setCuloare(color){
        this.culoare=color;
    }

    toString(){
        return new String(this.tip);
    }
}

function ChangeVisibility(tabel,id){
    document.querySelectorAll('.tabel').forEach((item)=>{item.setAttribute('style','visibility:hidden')})
    if((getComputedStyle(tabel)).visibility=="hidden"){
       
        tabel.setAttribute('style','visibility:visible');
    }else{
        tabel.setAttribute('style','visibility:hidden');
    }
    ceColoram=id;
}

let forma='none';

let btn_elipsa=document.getElementById("t_elipsa");
let btn_dreptunghi=document.getElementById("t_dreptunghi");
let btn_linie=document.getElementById("t_linie");

btn_elipsa.addEventListener('click',()=>{forma='elipsa'});
btn_dreptunghi.addEventListener('click',()=>{forma='dreptunghi'});
btn_linie.addEventListener('click',()=>{forma='linie'});

let foaie=document.getElementById('canvasuMeu')
const c = document.getElementsByClassName('forma')
let foaiectx=foaie.getContext('2d');

let lista=document.getElementById('lista');
let lista_el;
let lista_div=document.getElementById("lista_div");

let desenam=false;
let mouseX;
let mouseY;
let forme=[];

let gross;
let grosime=document.getElementById("ranger");
let imageData;

let x;
let y;
let forma_line_Width=2;
let forma_width;
let forma_height;
let forma_stroke_style='black';
let forma_stroke_fill='black';
let dr=null;
let i=0;

let canvasInitial=foaiectx.getImageData(0, 0, foaie.width - 1, foaie.height - 1);

let j=-1;
let k;
//pentru miscare
let pozitieX;
let pozitieY;
let lungime;
let latime;
let miscam=false;
let lungimee;
let latimee;

let ceColoram='none';

let dimensionam=false;


foaie.addEventListener("click",function draw(event){
    desenam=!desenam;
    
    mouseX=event.clientX-foaie.getBoundingClientRect().left;
    
    mouseY=event.clientY-foaie.getBoundingClientRect().top;

    canvasBack = document.createElement("canvas");
    imageData = foaiectx.getImageData(0, 0, foaie.width - 1, foaie.height - 1);
    
    if(event.clientX-foaie.getBoundingClientRect().left>lungime+pozitieX&&event.clientX-foaie.getBoundingClientRect().left<pozitieX&&event.clientY-foaie.getBoundingClientRect().top>latime+pozitieY&&event.clientY-foaie.getBoundingClientRect().top<pozitieY){
        miscam=true;
        lungimee=(mouseX)-forme[j].x;
        latimee=(mouseY)-forme[j].y;
       

    }else if(event.clientX-foaie.getBoundingClientRect().left>pozitieX-lungime&&event.clientX-foaie.getBoundingClientRect().left<pozitieX+lungime&&event.clientY-foaie.getBoundingClientRect().top>pozitieY-latime&&event.clientY-foaie.getBoundingClientRect().top<pozitieY+latime){
        miscam=true;
        lungimee=mouseX-(forme[j].x);
        latimee=mouseY-(forme[j].y);
       
    }
    

    if(!desenam) miscam=false;

})
    
foaie.addEventListener("dblclick",(event)=>{
     //redimensionam o forna
     if(event.clientX-foaie.getBoundingClientRect().left>lungime+pozitieX&&event.clientX-foaie.getBoundingClientRect().left<pozitieX&&event.clientY-foaie.getBoundingClientRect().top>latime+pozitieY&&event.clientY-foaie.getBoundingClientRect().top<pozitieY){
        //dimensionam=true;
        lungimee=(mouseX)-forme[j].x;
        latimee=(mouseY)-forme[j].y;
        

    }else if(event.clientX-foaie.getBoundingClientRect().left>pozitieX-lungime&&event.clientX-foaie.getBoundingClientRect().left<pozitieX+lungime&&event.clientY-foaie.getBoundingClientRect().top>pozitieY-latime&&event.clientY-foaie.getBoundingClientRect().top<pozitieY+latime){
        //dimensionam=true;
        lungimee=mouseX-(forme[j].x);
        latimee=mouseY-(forme[j].y);
       
    }
  
    dimensionam=!dimensionam;
});


foaie.addEventListener("mousemove",function sizeit(event){

    if(dimensionam){


        forme[j].width=Math.abs((event.clientX-foaie.getBoundingClientRect().left));
        forme[j].height=Math.abs((event.clientY-foaie.getBoundingClientRect().top));

        
        foaiectx.putImageData(canvasInitial, 0, 0);
        forme.forEach((desen)=>{
            desen.deseneaza();
        });

    }
    
    if(miscam&&!dimensionam){

        forme[j].x=Math.abs((event.clientX-foaie.getBoundingClientRect().left)-(lungimee));
        forme[j].y=Math.abs((event.clientY-foaie.getBoundingClientRect().top)-(latimee));

       
        foaiectx.putImageData(canvasInitial, 0, 0);
        forme.forEach((desen)=>{
            desen.deseneaza();
        });
       
        
    }


    if(desenam&&!miscam&&!dimensionam){
        if(forma==='dreptunghi'){
            dr=new Forma(foaie,'dreptunghi',event.clientX-foaie.getBoundingClientRect().left,event.clientY-foaie.getBoundingClientRect().top,mouseX-(event.clientX-foaie.getBoundingClientRect().left),mouseY-(event.clientY-foaie.getBoundingClientRect().top),forma_line_Width,forma_stroke_fill);
            foaiectx.putImageData(imageData, 0, 0);
            dr.deseneaza();
        }else if(forma==='elipsa'){
            foaiectx.putImageData(imageData, 0, 0);  
            let width = Math.abs((event.clientX-foaie.getBoundingClientRect().left)-mouseX)/2;
            let height= Math.abs((event.clientY-foaie.getBoundingClientRect().top)-mouseY)/2;
            dr=new Forma(foaie,'elipsa',mouseX+width,mouseY+height,width,height,forma_line_Width,forma_stroke_fill);
            dr.deseneaza();
        }else if(forma==='linie'){
            foaiectx.putImageData(imageData, 0, 0);     
            dr=new Forma(foaie,'linie',mouseX,mouseY,event.clientX-foaie.getBoundingClientRect().left,event.clientY-foaie.getBoundingClientRect().top,forma_line_Width,forma_stroke_fill);
            dr.deseneaza();
        }
    }       
})

foaie.addEventListener("mouseup",()=>{

    if(desenam&&!miscam&&!dimensionam){
    let copil=document.createElement("li");
    copil.append(dr.toString());
    copil.style = "background-color:"+forma_stroke_fill;
    copil.setAttribute("value",i.toString());
    copil.setAttribute("id",i.toString());
    lista.appendChild(copil);
    forme[i++]=dr;
    }

});

lista.addEventListener("dblclick",(event)=>{
  

    if(!desenam) miscam=false;

    if(!desenam){
       
       
        let element=document.getElementById(event.target.value.toString());
      
        lista.removeChild(element);

       
        for(let i=event.target.value;i<forme.length;i++){
            forme[i]=forme[i+1];
        }
        let ul = document.querySelectorAll('ol li');
       
       
        for (let i = event.target.value; i < ul.length; i++) {
            ul[i].value=(ul[i].value-1).toString();
         
        }
    
        forme.length--;
       
        i--;
       
        foaiectx.putImageData(canvasInitial, 0, 0);
        forme.forEach((desen)=>{
            desen.deseneaza();
        });
    }
    
});


lista.addEventListener('click',(event)=>{
    if(!desenam){
        forme[event.target.value].culoare= forma_stroke_fill;
        forme[event.target.value].grosime= forma_line_Width;

        foaiectx.putImageData(canvasInitial, 0, 0);
        forme.forEach((desen)=>{
            desen.deseneaza();
        });
    }
});


lista.addEventListener("mouseover",(event)=>{
    if(!desenam){
       
        
        k=j;

        if(k!==(parseInt(event.target.value))&&k!==-1)forme[j].stil=[];

        j=parseInt(event.target.value);
      

        forme[j].stil=[20, 5];
        
        //miscare
        if(forma!=='dreptunghi'){
        pozitieX=forme[j].x;
        pozitieY=forme[j].y;
        lungime=forme[j].width;
        latime=forme[j].height;
        }else{
        if(forme[j].width<0&&forme[j].height<0){
        pozitieX=forme[j].x;
        pozitieY=forme[j].y;
        lungime=forme[j].width;
        latime=forme[j].height;
      
        }else if(forme[j].width>0&&forme[j].height<0){
        pozitieX=forme[j].x+forme[j].width;
        pozitieY=forme[j].y;
        lungime=-1*forme[j].width;
        latime=forme[j].height;
       
        }else if(forme[j].height>0&&forme[j].width<0){
        pozitieX=forme[j].x;
        pozitieY=forme[j].y+forme[j].height;
        lungime=forme[j].width;
        latime=-1*forme[j].height;
      
        }else if(forme[j].height>0){
            pozitieX=forme[j].x+forme[j].width;
            pozitieY=forme[j].y+forme[j].height;
            lungime=-1*forme[j].width;
            latime=-1*forme[j].height;
       
        }
    }
       
        foaiectx.putImageData(canvasInitial, 0, 0);


        forme.forEach((desen)=>{
            desen.deseneaza();
        });
    }
});

function Coloreaza(object){
    if(ceColoram==='culoare')forma_stroke_fill=object.style["background-color"];
    else if(ceColoram==='background')foaie.style["background-color"]=object.style["background-color"];
}

grosime.addEventListener('change',()=>{
    forma_line_Width=grosime.value;
    
});

function SalvarePNG(){
        
    var link = document.createElement('a');
    link.download = 'imagine_PNG.png';
    link.href = document.getElementById('canvasuMeu').toDataURL()
    link.click();
          
}


  

