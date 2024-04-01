function enableDisableVector(){
  myShowVector = document.getElementById("showVector")
  if (myShowVector.checked == false){
    document.getElementById('vectx').disabled = true;
    document.getElementById('vecty').disabled = true;
  }else{
    document.getElementById('vectx').disabled = false;
    document.getElementById('vecty').disabled = false;
  }
}

function enableDisableVector2(){
  myShowVector2 = document.getElementById("showVector2")
  if (myShowVector2.checked == false){
    document.getElementById('vectx2').disabled = true;
    document.getElementById('vecty2').disabled = true;
  }else{
    document.getElementById('vectx2').disabled = false;
    document.getElementById('vecty2').disabled = false;
  }
}


function animateMatrix(){

  newCanvasWidth=600*parseFloat(document.getElementById('canvassize').value)
  newCanvasHeight=400*parseFloat(document.getElementById('canvassize').value)
  var canvas1 = document.getElementById('c1');
  canvas1.height = newCanvasHeight;
  canvas1.width = newCanvasWidth;


  myShowDeterminant = document.getElementById("showDeterminant")
  if (myShowDeterminant.checked == true){showDeterminant=1;}else{showDeterminant=0;}



  myShowVector = document.getElementById("showVector")
  if (myShowVector.checked == true){showVector=1;}else{showVector=0;}

  myShowVector2 = document.getElementById("showVector2")
  if (myShowVector2.checked == true){showVector2=1;}else{showVector2=0;}
  

  a=parseFloat(document.getElementById('a').value)  
  b=parseFloat(document.getElementById('b').value)
  c=parseFloat(document.getElementById('c').value)  
  d=parseFloat(document.getElementById('d').value)

  vectx=parseFloat(document.getElementById('vectx').value);
  vecty=parseFloat(document.getElementById('vecty').value);

  vectx2=parseFloat(document.getElementById('vectx2').value);
  vecty2=parseFloat(document.getElementById('vecty2').value);


  vectnewx=vectx*a+vecty*b;
  vectnewy=vectx*c+vecty*d;

  vectnewx2=vectx2*a+vecty2*b;
  vectnewy2=vectx2*c+vecty2*d;

  
  //calculate the range
  //the X-axis is 50% longer than the Y-axis
  //the range cannot exceed 20
  range=Math.abs(b);
  if(Math.abs(a)>range){range=Math.abs(a)}
  if((1.5*Math.abs(d))>range){range=1.5*Math.abs(d)} //1.5 because the X-axis is 50% longer than the Y-axis
  if((1.5*Math.abs(c))>range){range=1.5*Math.abs(c)} //1.5 because the X-axis is 50% longer than the Y-axis
  //if the determinant is shown, the range might be larger
  //we don't want the yellow semi-transparent region to be out of range
  if(showDeterminant==1){if((1.5*Math.abs(c+d))>range){range=1.5*Math.abs(c+d)}} //1.5 because the X-axis is 50% longer than the Y-axis
  if(showDeterminant==1){if((Math.abs(a+b))>range){range=Math.abs(a+b)}}
  //if the vector is shown, the range might be larger
  if(showVector==1){if((1.5*Math.abs(vectx*c+vecty*d))>range){range=1.5*Math.abs(vectx*c+vecty*d)}} //1.5 because the X-axis is 50% longer than the Y-axis
  if(showVector==1){if((Math.abs(vectx*a+vecty*b))>range){range=Math.abs(vectx*a+vecty*b)}}
  if(showVector2==1){if((1.5*Math.abs(vectx2*c+vecty2*d))>range){range=1.5*Math.abs(vectx2*c+vecty2*d)}} //1.5 because the X-axis is 50% longer than the Y-axis
  if(showVector2==1){if((Math.abs(vectx2*a+vecty2*b))>range){range=Math.abs(vectx2*a+vecty2*b)}}  
  //we want some extra empty space close to the boundary
  //but we don't want the range to be larger than 20 (by the way, 15.38*1.3=20) 
  if(range<15.38){range=1.3*range;}else{range=20.0}
  if(range<4.0){range=4.0}
  rangex=range;
  rangey=range/1.5; //1.5 because the X-axis is 50% longer than the Y-axis

  //the range cannot exceed 20, but just to be sure: it can't exceed 19.5!
  if(range>19.5){
    //document.getElementById('vectx1').disabled = false;
    //document.getElementById('vecty1').disabled = false;
    //document.getElementById('vectx2').disabled = false;
    //document.getElementById('vecty2').disabled = false;
    alert("the values you picked are too large: with these values, the plot would look horrible");
    return;
  }


  alphamax1=Math.sqrt(a*a+c*c);
  if( Math.abs(a) < 0.00000001){
     if(c < 0.0){
        thetamax1=-1.5707953;
     }
     else
     {
        thetamax1=1.5707953;
     }
  }
  else{
     thetamax1=Math.atan2(c,a)  
  }


  alphamax2=Math.sqrt(b*b+d*d);
  if( Math.abs(d) < 0.00000001){
     if(b < 0.0){
        thetamax2=1.5707953;
     }
     else
     {
        thetamax2=-1.5707953;
     }
  }
  else{
     thetamax2=Math.atan2(-b,d) 
  }



  let canvas = document.getElementById('c1');
  let ctx = canvas.getContext('2d');


  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  function XpixFromX(xNow){
      Xpix=canvas.width*(xNow+rangex)/(2.0*rangex);
      return Xpix;_
  }

  function YpixFromY(yNow){
      Ypix=canvas.height*(rangey-yNow)/(2.0*rangey);
      return Ypix;_
  }

  function greenArrow(fromx, fromy, tox, toy){
                  //variables to be used when creating the arrow
                  var c = document.getElementById("myCanvas");
                  var ctx = canvas.getContext("2d");
                  var headlen = 0.2*Math.sqrt((tox-fromx)*(tox-fromx)+(toy-fromy)*(toy-fromy));
                  var angle = Math.atan2(toy-fromy,tox-fromx);
                  //starting path of the arrow from the start square to the end square and drawing the stroke
                  ctx.beginPath();
                  ctx.moveTo(fromx, fromy);
                  ctx.lineTo(tox, toy);
                  ctx.strokeStyle = "#66CF66"; //Green
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  //starting a new path from the head of the arrow to one of the sides of the point
                  ctx.beginPath();
                  ctx.moveTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //path from the side point of the arrow, to the other side point
                  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                  //path from the side point back to the tip of the arrow, and then again to the opposite side point
                  ctx.lineTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //draws the paths created above
                  ctx.strokeStyle = "#66CF66"; //Green
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  ctx.fillStyle = "#66CF66"; //Green
                  ctx.fill();
              }

  function redArrow(fromx, fromy, tox, toy){
                  //variables to be used when creating the arrow
                  var c = document.getElementById("myCanvas");
                  var ctx = canvas.getContext("2d");
                  var headlen = 0.2*Math.sqrt((tox-fromx)*(tox-fromx)+(toy-fromy)*(toy-fromy));
                  var angle = Math.atan2(toy-fromy,tox-fromx);
                  //starting path of the arrow from the start square to the end square and drawing the stroke
                  ctx.beginPath();
                  ctx.moveTo(fromx, fromy);
                  ctx.lineTo(tox, toy);
                  ctx.strokeStyle = "#CF6666"; //Red
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  //starting a new path from the head of the arrow to one of the sides of the point
                  ctx.beginPath();
                  ctx.moveTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //path from the side point of the arrow, to the other side point
                  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                  //path from the side point back to the tip of the arrow, and then again to the opposite side point
                  ctx.lineTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //draws the paths created above
                  ctx.strokeStyle = "#CF6666"; //Red
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  ctx.fillStyle = "#CF6666"; //Red
                  ctx.fill();
              }

  function orangeArrow(fromx, fromy, tox, toy){
                  //variables to be used when creating the arrow
                  var c = document.getElementById("myCanvas");
                  var ctx = canvas.getContext("2d");
                  var headlen = 0.2*Math.sqrt((tox-fromx)*(tox-fromx)+(toy-fromy)*(toy-fromy));
                  var angle = Math.atan2(toy-fromy,tox-fromx);
                  //starting path of the arrow from the start square to the end square and drawing the stroke
                  ctx.beginPath();
                  ctx.moveTo(fromx, fromy);
                  ctx.lineTo(tox, toy);
                  ctx.strokeStyle = "#FFA500"; //Orange
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  //starting a new path from the head of the arrow to one of the sides of the point
                  ctx.beginPath();
                  ctx.moveTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //path from the side point of the arrow, to the other side point
                  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                  //path from the side point back to the tip of the arrow, and then again to the opposite side point
                  ctx.lineTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //draws the paths created above
                  ctx.strokeStyle = "#FFA500"; //Orange
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  ctx.fillStyle = "#FFA500"; //Orange
                  ctx.fill();
              }

  function purpleArrow(fromx, fromy, tox, toy){
                  //variables to be used when creating the arrow
                  var c = document.getElementById("myCanvas");
                  var ctx = canvas.getContext("2d");
                  var headlen = 0.2*Math.sqrt((tox-fromx)*(tox-fromx)+(toy-fromy)*(toy-fromy));
                  var angle = Math.atan2(toy-fromy,tox-fromx);
                  //starting path of the arrow from the start square to the end square and drawing the stroke
                  ctx.beginPath();
                  ctx.moveTo(fromx, fromy);
                  ctx.lineTo(tox, toy);
                  ctx.strokeStyle = "#9966CC"; //Purple
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  //starting a new path from the head of the arrow to one of the sides of the point
                  ctx.beginPath();
                  ctx.moveTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //path from the side point of the arrow, to the other side point
                  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                  //path from the side point back to the tip of the arrow, and then again to the opposite side point
                  ctx.lineTo(tox, toy);
                  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                  //draws the paths created above
                  ctx.strokeStyle = "#9966CC"; //Purple
                  ctx.lineWidth = 5;
                  ctx.stroke();
                  ctx.fillStyle = "#9966CC"; //Purple
                  ctx.fill();
              }

  t=0.0
  function loop() {
      t=t+0.01
      if(t>1.0001){return;}

      ctx.clearRect(0,0,canvas.width, canvas.height); // clear old frame


      //how will the basis vectors change?
      alpha1=1.0+t*(alphamax1-1.0); 
      theta1=t*thetamax1;
      alpha2=1.0+t*(alphamax2-1.0);
      theta2=t*thetamax2;
      vector1x=alpha1*Math.cos(theta1);
      vector1y=alpha1*Math.sin(theta1);
      vector2x=alpha2*Math.sin(-theta2);
      vector2y=alpha2*Math.cos(theta2);
      vector1xPix=XpixFromX(vector1x);
      vector1yPix=YpixFromY(vector1y);
      vector2xPix=XpixFromX(vector2x);
      vector2yPix=YpixFromY(vector2y);

      //the vector should also change with time
      vectnowx=vectx*vector1x+vecty*vector2x;
      vectnowy=vectx*vector1y+vecty*vector2y;

      //the vector should also change with time
      vectnowx2=vectx2*vector1x+vecty2*vector2x;
      vectnowy2=vectx2*vector1y+vecty2*vector2y;



      //semi-transparent region
      if(showDeterminant==1){
        ctx.beginPath();
        ctx.moveTo(0.5*canvas.width, 0.5*canvas.height);
        ctx.lineTo(vector1xPix, vector1yPix);
        ctx.lineTo(XpixFromX(vector1x+vector2x), YpixFromY(vector1y+vector2y));
        ctx.lineTo(vector2xPix, vector2yPix);
        ctx.lineTo(0.5*canvas.width, 0.5*canvas.height);
        ctx.fillStyle = "rgba(239, 239, 68, 0.5)";
        ctx.fill();
      }


      // background static mesh
      var i;
      for (i = -40; i <= 40; i=i+1) {
        ctx.beginPath();
        ipx=YpixFromY(i);
        ctx.moveTo(0, ipx);
        ctx.lineTo(canvas.width, ipx);
        ctx.strokeStyle= '#AAAAAA'; //Gray
        ctx.lineWidth= 2;
        ctx.closePath();
        ctx.stroke();
      }

      // background static mesh
      var i;
      for (i = -40; i <= 40; i=i+1) {
        ctx.beginPath();
        ipx=XpixFromX(i);
        ctx.moveTo(ipx, 0);
        ctx.lineTo(ipx, canvas.height);
        ctx.strokeStyle= '#AAAAAA'; //Gray
        ctx.lineWidth= 2;
        ctx.closePath();
        ctx.stroke();
      }


      // background moving mesh
      var i;
      for(i=-40;i<=40;i++){
        xmin=-40*vector1x+i*vector2x;
        xmax=40*vector1x+i*vector2x;
        ymin=-40*vector1y+i*vector2y;
        ymax=40*vector1y+i*vector2y;
        ctx.beginPath();
        ctx.moveTo(XpixFromX(xmin), YpixFromY(ymin));
        ctx.lineTo(XpixFromX(xmax), YpixFromY(ymax));
        ctx.strokeStyle= '#22AAEF'; //Blue
        ctx.lineWidth= 2;
        ctx.closePath();
        ctx.stroke();
        xmin=-40*vector2x+i*vector1x;
        xmax=40*vector2x+i*vector1x;
        ymin=-40*vector2y+i*vector1y;
        ymax=40*vector2y+i*vector1y;
        ctx.beginPath();
        ctx.moveTo(XpixFromX(xmin), YpixFromY(ymin));
        ctx.lineTo(XpixFromX(xmax), YpixFromY(ymax));
        ctx.strokeStyle= '#22AAEF'; //Blue
        ctx.lineWidth= 2;
        ctx.closePath();
        ctx.stroke();
      }




      //moving X- and Y-axes
      xmin=-20*vector1x;
      xmax=20*vector1x;
      ymin=-20*vector1y;
      ymax=20*vector1y;
      ctx.beginPath();
      ctx.moveTo(XpixFromX(xmin), YpixFromY(ymin));
      ctx.lineTo(XpixFromX(xmax), YpixFromY(ymax));
      ctx.strokeStyle= '#FFFFFF'; //White
      ctx.lineWidth= 2;
      ctx.closePath();
      ctx.stroke();
      xmin=-20*vector2x;
      xmax=20*vector2x;
      ymin=-20*vector2y;
      ymax=20*vector2y;
      ctx.beginPath();
      ctx.moveTo(XpixFromX(xmin), YpixFromY(ymin));
      ctx.lineTo(XpixFromX(xmax), YpixFromY(ymax));
      ctx.strokeStyle= '#FFFFFF'; //White
      ctx.lineWidth= 2;
      ctx.closePath();
      ctx.stroke();

      if(showDeterminant==1){
        ctx.beginPath();
        ctx.moveTo(vector1xPix, vector1yPix);
        ctx.lineTo(XpixFromX(vector1x+vector2x), YpixFromY(vector1y+vector2y));
        ctx.strokeStyle= '#EFEF44'; //Yellow
        ctx.lineWidth= 4;
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(vector2xPix, vector2yPix);
        ctx.lineTo(XpixFromX(vector1x+vector2x), YpixFromY(vector1y+vector2y));
        ctx.strokeStyle= '#EFEF44'; //Yellow
        ctx.lineWidth= 4;
        ctx.closePath();
        ctx.stroke();
      }

      vectnowx=vectx*vector1x+vecty*vector2x;
      vectnowy=vectx*vector1y+vecty*vector2y;
      if(showVector==1){orangeArrow(0.5*canvas.width, 0.5*canvas.height, XpixFromX(vectnowx), YpixFromY(vectnowy))}
      vectnowx2=vectx2*vector1x+vecty2*vector2x;
      vectnowy2=vectx2*vector1y+vecty2*vector2y;
      if(showVector2==1){purpleArrow(0.5*canvas.width, 0.5*canvas.height, XpixFromX(vectnowx2), YpixFromY(vectnowy2))}  

      // arrows for the moving basis vectors
      greenArrow(0.5*canvas.width, 0.5*canvas.height, vector1xPix, vector1yPix)
      redArrow(0.5*canvas.width, 0.5*canvas.height, vector2xPix, vector2yPix)

      sleep(20);
      requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

}