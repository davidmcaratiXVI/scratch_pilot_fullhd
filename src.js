const cvs=document.querySelector("canvas"),
      ctx=cvs.getContext("2d"),
      brushRadius=(cvs.width+cvs.height)*.180,
      img=new Image();
ctx.crossOrigin = "Anonymous";
cvs.crossOrigin = "Anonymous";
img.src="assets/ScratchCard_Template.png";
img.onload=()=>{ctx.drawImage(img,0,0,cvs.width,cvs.height);}
const scratchContainer = document.getElementsByClassName("scratcher")[0];

function resize(){
  /*if(scratchContainer.style.width<480){
    cvs.style.width="calc(100vw - 1rem)";
  }else{
    cvs.style.width="90vw";
  }*/
}

function detectLeftButton(e){
  if("buttons" in e){return e.buttons===1;}
  else if('which' in e){return e.which===1;}
  else{return e.button===1;}
}

function getBrushPos(brushX,brushY){
	const brush=cvs.getBoundingClientRect();
  return{
    x:Math.floor((brushX-brush.left)/(brush.right-brush.left)*cvs.width),
    y:Math.floor((brushY-brush.top)/(brush.bottom-brush.top)*cvs.height)
  };
}

function getFilledInPixels(e){
  if(!e||e<1){e=1;}

  let pixels=ctx.getImageData(0,0,cvs.width,cvs.height),
      pdata=pixels.data,
      l=pdata.length,
      total=(l/e),
      count=0;

  for(let i=count=0;i<l;i+=e){
    if(parseInt(pdata[i])===0){
      count++;
    }
  }

  return Math.floor((count/total)*100);
}

function handlePercentage(filledInPixels){
  filledInPixels=filledInPixels||0;
  console.log(Math.floor(filledInPixels));
  
  if(filledInPixels>70){
    cvs.style.visibility="hidden";
    startFinalAnimation();
  }
}
let tf_1 = document.getElementById("tf_1");
let tf_2 = document.getElementById("tf_2");
let tf_3 = document.getElementById("tf_3");
let scr_card = document.getElementById("scr_card");
let lf_logo = document.getElementById("l_icn");
let lg_text = document.getElementById("scr_text");
let gf_text = document.getElementById("gf_num");
let wrm = document.getElementById("wrm");
let ttp = document.getElementById("ttp");

function startFinalAnimation() {
  tf_1.style.display = "block";
  tf_2.style.display = "block";
  tf_3.style.display = "block";
  tf_1.classList.add("num1_finish_anim");
  tf_2.classList.add("num2_finish_anim");
  tf_3.classList.add("num3_finish_anim");
  scr_card.classList.add("src_card_finish_anim");
  lf_logo.classList.add("fade_out");
  lg_text.classList.add("fade_out");
  clockMoney();
  setTimeout(function() {
    wrm.style.display = "block";
    wrm.classList.add("zoom_in");
  }, 1000);

  setTimeout(function() {
    ttp.style.display = "block";
    ttp.classList.add("zoom_in_stay");
  }, 3500);
}

function clockMoney() {
  let task = (i) => {
    setTimeout(function() {
      gf_text.innerText = (i*2);
    }, 10 * i);
  };

  for (let i=0; i<126; i++) {
    task(i);
  }
}

const brush=new Image();
//brush.src="https://svgshare.com/i/CBF.svg";
//brush.src="https://svgsilh.com/svg/2540706.svg"
brush.src="assets/Scratch_2.png";
function drawDot(mouseX,mouseY){
  console.log(Math.floor((Math.random()+1)*45));
  ctx.drawImage(brush,mouseX-brushRadius/2,mouseY-brushRadius/2,brushRadius,brushRadius);
  ctx.beginPath();
  ctx.globalCompositeOperation="destination-out";
  ctx.fill();
  ctx.closePath();
  handlePercentage(getFilledInPixels(32));
}

window.addEventListener("load",()=>{
  document.querySelector(".hidden").style.display="grid";
  resize();
});

window.addEventListener("resize",resize);

cvs.addEventListener("mousemove",(e)=>{
	const brushPos=getBrushPos(e.clientX,e.clientY);
  const leftBut=detectLeftButton(e);
  if(leftBut==1){
    drawDot(brushPos.x,brushPos.y);
  }
},false);

cvs.addEventListener("touchmove",(e)=>{
    e.preventDefault();
    const touch=e.targetTouches[0];
    if(touch){
      const brushPos=getBrushPos(touch.pageX,touch.pageY);
      drawDot(brushPos.x,brushPos.y);
    }
},false);