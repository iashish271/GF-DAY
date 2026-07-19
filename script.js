/* ======================================================
   A LITTLE UNIVERSE MADE JUST FOR YOU
   script.js - PART 1
====================================================== */

/* ==========================
      ELEMENTS
========================== */

const pages = document.querySelectorAll(".page");

const loadingScreen = document.getElementById("loadingScreen");

const introPage = document.getElementById("introPage");

const passwordPage = document.getElementById("passwordPage");

const explosionOverlay = document.getElementById("explosionOverlay");

const mainStar = document.getElementById("mainStar");

const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicToggle");

const cursor = document.getElementById("cursor");

const blur = document.getElementById("cursor-blur");

/* ==========================
      LOADING
========================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.style.opacity="0";

setTimeout(()=>{

loadingScreen.remove();

showPage(introPage);

},800);

},2500);

});

/* ==========================
      PAGE SWITCHER
========================== */

function showPage(page){

pages.forEach(p=>{

p.classList.remove("active");

});

page.classList.add("active");

}

/* ==========================
      CUSTOM CURSOR
========================== */

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

blur.style.left=e.clientX-18+"px";

blur.style.top=e.clientY-18+"px";

});

/* ==========================
      MUSIC
========================== */

let playing=false;

musicBtn.addEventListener("click",()=>{

if(!playing){

music.play();

playing=true;

musicBtn.innerHTML="🔊";

}else{

music.pause();

playing=false;

musicBtn.innerHTML="🔈";

}

});

/* ==========================
      INTRO STARS
========================== */

const introStars=document.getElementById("introStars");

for(let i=0;i<250;i++){

const star=document.createElement("div");

star.className="introStar";

const size=Math.random()*3+1;

star.style.width=size+"px";

star.style.height=size+"px";

star.style.left=Math.random()*100+"%";

star.style.top=Math.random()*100+"%";

star.style.animationDuration=(2+Math.random()*4)+"s";

introStars.appendChild(star);

}

/* ==========================
      EXPLOSION PARTICLES
========================== */

const particleContainer=document.getElementById("explosionParticles");

function createExplosion(){

particleContainer.innerHTML="";

for(let i=0;i<250;i++){

const p=document.createElement("div");

p.style.position="absolute";

p.style.width="5px";

p.style.height="5px";

p.style.borderRadius="50%";

p.style.background=`hsl(${Math.random()*60+280},100%,70%)`;

p.style.left="50%";

p.style.top="50%";

const x=(Math.random()-0.5)*1800;

const y=(Math.random()-0.5)*1800;

p.animate([

{

transform:"translate(0,0) scale(1)",

opacity:1

},

{

transform:`translate(${x}px,${y}px) scale(0)`,

opacity:0

}

],{

duration:1800,

easing:"cubic-bezier(.2,.8,.2,1)"

});

particleContainer.appendChild(p);

}

}

/* ==========================
      MAIN STAR CLICK
========================== */

mainStar.addEventListener("click",()=>{

createExplosion();

explosionOverlay.style.opacity="1";

setTimeout(()=>{

explosionOverlay.style.opacity="0";

showPage(passwordPage);

},1700);

});

/* ==========================
      AUTO MUSIC TRY
========================== */

document.body.addEventListener("click",()=>{

if(!playing){

music.play().catch(()=>{});

playing=true;

musicBtn.innerHTML="🔊";

}

},{once:true});

/* ==========================
      RANDOM TWINKLE
========================== */

setInterval(()=>{

const stars=document.querySelectorAll(".introStar");

if(stars.length===0)return;

const star=stars[Math.floor(Math.random()*stars.length)];

star.animate([

{

transform:"scale(1)"

},

{

transform:"scale(2.4)"

},

{

transform:"scale(1)"

}

],{

duration:900

});

},400);

/* ==========================
      SMOOTH FADE
========================== */

function fadeElement(el){

el.animate([

{

opacity:0

},

{

opacity:1

}

],{

duration:700

});

}
/* ======================================================
        PASSWORD SYSTEM
====================================================== */

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");

const wrongOverlay = document.getElementById("wrongOverlay");
const retryBtn = document.getElementById("retryBtn");
const wrongMessage = document.getElementById("wrongMessage");

const passwordError = document.getElementById("passwordError");

const planet = document.getElementById("planet");
const planetLock = document.getElementById("planetLock");
const planetLight = document.getElementById("planetLight");
const planetCrack = document.getElementById("planetCrack");

const spaceTravel = document.getElementById("spaceTravel");

/* ==========================
        PASSWORD
========================== */

/*
CHANGE THIS PASSWORD
*/

const SECRET_PASSWORD = "0108";

/* ==========================
      UNLOCK BUTTON
========================== */

unlockBtn.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        checkPassword();

    }

});

/* ==========================
      CHECK PASSWORD
========================== */

function checkPassword(){

const value=passwordInput.value.trim();

if(value===SECRET_PASSWORD){

unlockSuccess();

}else{

unlockFail();

}

}

/* ==========================
      SUCCESS
========================== */

function unlockSuccess(){

passwordError.innerHTML="";

planetLock.innerHTML="🔓";

planetLight.style.opacity="1";

planet.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:900

});

setTimeout(()=>{

showPage(spaceTravel);

startWarp();

},1800);

}

/* ==========================
      FAILURE
========================== */

function unlockFail(){

passwordError.innerHTML="Wrong Password 💔";

shakePlanet();

showWrongPopup();

meteor();

}

/* ==========================
      SHAKE
========================== */

function shakePlanet(){

planet.animate([

{

transform:"translateX(0)"

},

{

transform:"translateX(-12px)"

},

{

transform:"translateX(12px)"

},

{

transform:"translateX(-8px)"

},

{

transform:"translateX(8px)"

},

{

transform:"translateX(0)"

}

],{

duration:500

});

planetCrack.style.opacity=".7";

setTimeout(()=>{

planetCrack.style.opacity="0";

},700);

}

/* ==========================
      METEOR
========================== */

function meteor(){

const m=document.createElement("div");

m.className="meteor";

m.style.top=Math.random()*150+"px";

m.style.left=(window.innerWidth+100)+"px";

document.body.appendChild(m);

setTimeout(()=>{

m.remove();

},1200);

}

/* ==========================
      WRONG POPUP
========================== */

function showWrongPopup(){

wrongOverlay.classList.add("show");

typeWrongMessage();

}

/* ==========================
      TYPEWRITER
========================== */

const wrongText="Oops... The universe says that's not the right password ✨";

function typeWrongMessage(){

wrongMessage.innerHTML="";

let i=0;

const typing=setInterval(()=>{

wrongMessage.innerHTML+=wrongText.charAt(i);

i++;

if(i>=wrongText.length){

clearInterval(typing);

}

},35);

}

/* ==========================
      RETRY
========================== */

retryBtn.addEventListener("click",()=>{

wrongOverlay.classList.remove("show");

passwordInput.focus();

});

/* ==========================
      ENTER EFFECT
========================== */

passwordInput.addEventListener("focus",()=>{

planetLight.style.opacity=".5";

});

passwordInput.addEventListener("blur",()=>{

planetLight.style.opacity="0";

});

/* ==========================
      WARP STARS
========================== */

const warp=document.getElementById("warpStars");

function startWarp(){

warp.innerHTML="";

for(let i=0;i<350;i++){

const star=document.createElement("div");

star.className="warpStar";

star.style.left=Math.random()*100+"vw";

star.style.animationDuration=(.4+Math.random()*1.4)+"s";

star.style.animationDelay=Math.random()*1+"s";

warp.appendChild(star);

}

}

/* ==========================
      RANDOM METEORS
========================== */

setInterval(()=>{

if(document.getElementById("spaceTravel").classList.contains("active")){

meteor();

}

},2500);

/* ==========================
      PLANET GLOW LOOP
========================== */

setInterval(()=>{

planet.animate([

{

filter:"drop-shadow(0 0 5px #fff)"

},

{

filter:"drop-shadow(0 0 25px #ffd966)"

},

{

filter:"drop-shadow(0 0 5px #fff)"

}

],{

duration:1800

});

},2200);
/* ======================================================
        SPACE TRAVEL & DREAM PLANET
====================================================== */

const rocket = document.getElementById("rocket");
const dreamPlanet = document.getElementById("dreamPlanet");
const floatingIsland = document.getElementById("floatingIsland");
const butterflyRain = document.getElementById("butterflyRain");
const sparkleContainer = document.getElementById("sparkleContainer");

/* ==========================
        ROCKET LAUNCH
========================== */

function launchRocket(){

rocket.animate([

{
transform:"translate(-50%,-50%) scale(1)"
},

{
transform:"translate(-50%,-80%) scale(.9)"
},

{
transform:"translate(-50%,-250%) scale(.6)",
opacity:0
}

],{

duration:4500,

easing:"ease-in-out",

fill:"forwards"

});

}

/* ==========================
      SPACE PARTICLES
========================== */

function createSpaceParticles(){

for(let i=0;i<200;i++){

const star=document.createElement("div");

star.className="particle";

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

star.style.width=(1+Math.random()*4)+"px";

star.style.height=star.style.width;

star.style.animationDuration=(5+Math.random()*12)+"s";

sparkleContainer.appendChild(star);

}

}

/* ==========================
      SHOOTING STARS
========================== */

function shootingStar(){

const star=document.createElement("div");

star.className="shootingStar";

star.style.left=(window.innerWidth+200)+"px";

star.style.top=Math.random()*200+"px";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},4500);

}

setInterval(()=>{

if(spaceTravel.classList.contains("active")){

shootingStar();

}

},2800);

/* ==========================
      ARRIVE
========================== */

function arriveDreamPlanet(){

showPage(dreamPlanet);

createClouds();

createFlowers();

createButterflies();

}

/* ==========================
      CLOUDS
========================== */

function createClouds(){

for(let i=0;i<18;i++){

const cloud=document.createElement("div");

cloud.className="cloud";

cloud.style.width=(100+Math.random()*180)+"px";

cloud.style.height=(40+Math.random()*60)+"px";

cloud.style.left=(-300-Math.random()*400)+"px";

cloud.style.top=Math.random()*70+"%";

cloud.style.animationDuration=(30+Math.random()*35)+"s";

dreamPlanet.appendChild(cloud);

}

}

/* ==========================
      FLOWERS
========================== */

function createFlowers(){

const flowers=["🌸","🌺","💮","🌼"];

setInterval(()=>{

const flower=document.createElement("div");

flower.className="flower";

flower.innerHTML=flowers[Math.floor(Math.random()*flowers.length)];

flower.style.left=Math.random()*100+"vw";

flower.style.animationDuration=(8+Math.random()*8)+"s";

dreamPlanet.appendChild(flower);

setTimeout(()=>{

flower.remove();

},17000);

},350);

}

/* ==========================
      BUTTERFLIES
========================== */

function createButterflies(){

setInterval(()=>{

const b=document.createElement("div");

b.className="butterfly";

b.innerHTML="🦋";

b.style.top=Math.random()*90+"vh";

b.style.animationDuration=(10+Math.random()*8)+"s";

dreamPlanet.appendChild(b);

setTimeout(()=>{

b.remove();

},18000);

},1200);

}

/* ==========================
      ISLAND GLOW
========================== */

setInterval(()=>{

if(dreamPlanet.classList.contains("active")){

floatingIsland.animate([

{

boxShadow:"0 0 25px rgba(255,255,255,.15)"

},

{

boxShadow:"0 0 60px rgba(255,200,255,.5)"

},

{

boxShadow:"0 0 25px rgba(255,255,255,.15)"

}

],{

duration:2500

});

}

},2800);

/* ==========================
      AUTO FLOW
========================== */

function startJourney(){

launchRocket();

createSpaceParticles();

setTimeout(()=>{

arriveDreamPlanet();

},5200);

setTimeout(()=>{

showPage(memoryPage);

},13000);

}

/* ==========================
      START AFTER PASSWORD
========================== */

const oldSuccess = unlockSuccess;

unlockSuccess = function(){

oldSuccess();

setTimeout(()=>{

startJourney();

},1800);

};
/* ======================================================
        CRYSTAL MEMORIES
====================================================== */

const memoryPage = document.getElementById("memoryPage");
const letterPage = document.getElementById("letterPage");

const photoModal = document.getElementById("photoModal");
const modalImage = document.querySelector("#photoModal img");
const closeModal = document.querySelector(".closeModal");

const nextMemory = document.querySelector(".nextMemory");

const memoryCards = document.querySelectorAll(".memoryCard");

/* ==========================
      CARD EFFECTS
========================== */

memoryCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.animate([

{

transform:"translateY(0px) scale(1)"

},

{

transform:"translateY(-12px) scale(1.03)"

}

],{

duration:300,

fill:"forwards"

});

});

card.addEventListener("mouseleave",()=>{

card.animate([

{

transform:"translateY(-12px) scale(1.03)"

},

{

transform:"translateY(0px) scale(1)"

}

],{

duration:300,

fill:"forwards"

});

});

});

/* ==========================
      IMAGE MODAL
========================== */

memoryCards.forEach(card=>{

card.addEventListener("click",()=>{

const img=card.querySelector("img");

modalImage.src=img.src;

photoModal.classList.add("active");

});

});

/* ==========================
      CLOSE MODAL
========================== */

closeModal.addEventListener("click",()=>{

photoModal.classList.remove("active");

});

photoModal.addEventListener("click",(e)=>{

if(e.target===photoModal){

photoModal.classList.remove("active");

}

});

/* ==========================
      CRYSTAL SPARKLES
========================== */

function crystalSparkle(){

const sparkle=document.createElement("div");

sparkle.className="sparkle";

sparkle.style.left=Math.random()*100+"vw";

sparkle.style.top=Math.random()*100+"vh";

memoryPage.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},2500);

}

setInterval(()=>{

if(memoryPage.classList.contains("active")){

crystalSparkle();

}

},200);

/* ==========================
      NEXT BUTTON
========================== */

nextMemory.addEventListener("click",()=>{

photoModal.classList.remove("active");

showPage(letterPage);

startLetter();

});

/* ==========================
      KEYBOARD
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

photoModal.classList.remove("active");

}

});

/* ==========================
      AUTO GLOW
========================== */

setInterval(()=>{

memoryCards.forEach(card=>{

card.animate([

{

boxShadow:"0 10px 25px rgba(0,0,0,.25)"

},

{

boxShadow:"0 0 35px rgba(180,120,255,.45)"

},

{

boxShadow:"0 10px 25px rgba(0,0,0,.25)"

}

],{

duration:2200

});

});

},2600);

/* ==========================
      RANDOM FLOAT
========================== */

setInterval(()=>{

const cards=document.querySelectorAll(".memoryCard");

if(cards.length===0)return;

const card=cards[Math.floor(Math.random()*cards.length)];

card.animate([

{

transform:"translateY(0)"

},

{

transform:"translateY(-8px)"

},

{

transform:"translateY(0)"

}

],{

duration:900

});

},1800);

/* ==========================
      MEMORY ENTRY
========================== */

function startMemories(){

showPage(memoryPage);

memoryCards.forEach((card,index)=>{

card.style.opacity="0";

setTimeout(()=>{

card.style.opacity="1";

card.classList.add("fadeUp");

},index*250);

});

}
/* ======================================================
        SECRET LETTER + GIFT
====================================================== */

const envelope = document.getElementById("envelope");
const letterTyping = document.getElementById("letterTyping");
const nextGift = document.getElementById("nextGift");

const giftPage = document.getElementById("giftPage");
const giftBox = document.getElementById("giftBox");
const giftReveal = document.getElementById("giftReveal");

/* ==========================
      LETTER
========================== */

const letterText = `

Happy World Girlfriend Day ❤️

If you're reading this...

it means you've reached
the most special place
inside this little universe.

Every star here,
every color,
every animation,

was made with one thought...

You.

Thank you
for existing.

✨
`;

/* ==========================
      START LETTER
========================== */

function startLetter(){

envelope.classList.add("open");

letterTyping.innerHTML="";

let i=0;

const typing=setInterval(()=>{

letterTyping.innerHTML+=letterText.charAt(i);

i++;

if(i>=letterText.length){

clearInterval(typing);

nextGift.classList.remove("hidden");

}

},38);

}

/* ==========================
      HEARTS
========================== */

function floatingHeart(){

const heart=document.createElement("div");

heart.className="floatingHeart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.bottom="0";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},5000);

}

setInterval(()=>{

if(letterPage.classList.contains("active")){

floatingHeart();

}

},350);

/* ==========================
      NEXT
========================== */

nextGift.addEventListener("click",()=>{

showPage(giftPage);

});

/* ==========================
      OPEN GIFT
========================== */

giftBox.addEventListener("click",()=>{

giftBox.classList.add("open");

confettiExplosion();

heartBurst();

setTimeout(()=>{

giftReveal.classList.add("show");

},900);

});

/* ==========================
      CONFETTI
========================== */

function confettiExplosion(){

for(let i=0;i<220;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=

`hsl(${Math.random()*360},100%,65%)`;

c.style.animationDuration=

(2+Math.random()*3)+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},5000);

}

}

/* ==========================
      HEART BURST
========================== */

function heartBurst(){

for(let i=0;i<80;i++){

const h=document.createElement("div");

h.className="rainHeart";

h.innerHTML="❤️";

h.style.left=50+"vw";

h.style.top=50+"vh";

h.animate([

{

transform:"translate(0,0) scale(.3)",

opacity:1

},

{

transform:

`translate(${(Math.random()-.5)*700}px,

${(Math.random()-.5)*700}px)

scale(1.4)`,

opacity:0

}

],{

duration:2200

});

document.body.appendChild(h);

setTimeout(()=>{

h.remove();

},2300);

}

}

/* ==========================
      AUTO CLOSE
========================== */

giftReveal.addEventListener("click",()=>{

giftReveal.classList.remove("show");

showEnding();

});
/* ======================================================
        FINAL ENDING
====================================================== */

const endingPage = document.getElementById("endingPage");
const restartJourney = document.getElementById("restartJourney");
const finalHeart = document.getElementById("finalHeart");

/* ==========================
      SHOW ENDING
========================== */

function showEnding(){

showPage(endingPage);

createEndingStars();

createAurora();

createLightOrbs();

}

/* ==========================
      SHOOTING STARS
========================== */

function createEndingStars(){

setInterval(()=>{

if(!endingPage.classList.contains("active")) return;

const star=document.createElement("div");

star.className="finalStar";

star.style.left=(window.innerWidth+150)+"px";

star.style.top=Math.random()*250+"px";

endingPage.appendChild(star);

setTimeout(()=>{

star.remove();

},5000);

},2200);

}

/* ==========================
      FLOATING LIGHTS
========================== */

function createLightOrbs(){

setInterval(()=>{

if(!endingPage.classList.contains("active")) return;

const orb=document.createElement("div");

orb.className="lightOrb";

const size=20+Math.random()*60;

orb.style.width=size+"px";

orb.style.height=size+"px";

orb.style.left=Math.random()*100+"vw";

orb.style.animationDuration=(8+Math.random()*8)+"s";

endingPage.appendChild(orb);

setTimeout(()=>{

orb.remove();

},18000);

},500);

}

/* ==========================
      AURORA
========================== */

function createAurora(){

const aurora=document.getElementById("auroraOverlay");

if(!aurora) return;

aurora.animate([

{

opacity:.2

},

{

opacity:.8

},

{

opacity:.2

}

],{

duration:12000,

iterations:Infinity

});

}

/* ==========================
      FINAL HEART
========================== */

setInterval(()=>{

if(!endingPage.classList.contains("active")) return;

finalHeart.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.25)"

},

{

transform:"scale(1)"

}

],{

duration:1500

});

},1800);

/* ==========================
      RESTART
========================== */

restartJourney.addEventListener("click",()=>{

location.reload();

});

/* ==========================
      ESC CLOSE
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

giftReveal.classList.remove("show");

photoModal.classList.remove("active");

wrongOverlay.classList.remove("show");

}

});

/* ==========================
      PAGE TRANSITION
========================== */

function transition(nextPage){

document.querySelector(".page.active")?.classList.remove("active");

setTimeout(()=>{

nextPage.classList.add("active");

},350);

}

/* ==========================
      MUSIC FADE
========================== */

function fadeMusic(targetVolume,duration=1000){

if(!music) return;

const start=music.volume;

const step=(targetVolume-start)/20;

let count=0;

const interval=setInterval(()=>{

count++;

music.volume=Math.max(0,Math.min(1,music.volume+step));

if(count>=20){

clearInterval(interval);

music.volume=targetVolume;

}

},duration/20);

}

/* ==========================
      VISIBILITY
========================== */

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

music.pause();

}else if(playing){

music.play().catch(()=>{});

}

});

/* ==========================
      WINDOW RESIZE
========================== */

window.addEventListener("resize",()=>{

document.documentElement.style.setProperty(

"--vw",

window.innerWidth+"px"

);

});

/* ==========================
      END MESSAGE
========================== */

console.log(
"%cMade with ❤️",
"color:#ff66b3;font-size:18px;font-weight:bold;"
);
