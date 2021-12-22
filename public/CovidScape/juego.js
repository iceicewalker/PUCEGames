const db = firebase.firestore();
const afs = firebase.auth();
let provider = new firebase.default.auth.GoogleAuthProvider();
let userInfo;
function googleLogin() {
  firebase
  .default.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google & FB API.
      //var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var iud = user.uid;
      var userData;
      if (result.additionalUserInfo.isNewUser) {
        if(user){
          console.log("Bienvenid@ amig@");
        }
      } else {
        if (user) {
          console.log("Has iniciado sesión");
        }
      }
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error("Ha cerrado sesión.")
    });

}
function checkAccount(){
  afs.onAuthStateChanged((user) => {
    if(user){
      console.log(user);
      userInfo = user;
    }else{
      isLogged = false
    }
  });
}

document.getElementById("salto").onclick=function(){

    console.log("salta");
    if (nivel.muerto == false){
      saltar();
    }
    else {
      nivel.velocidad = 13;
      virus.x = ancho + 100;
      nivel.marcador = 1;
      nivel.muerto = false;
      mascprueba=0;
      nube.velo=true;
    }
}
;

var imgNino, imgpuce, imgVirus;

function cargaImagenes() {
imgNino = new Image();
imgPuce = new Image();
imgVirus = new Image();
imgCesped = new Image();
imgNube = new Image();
imgMascarilla = new Image ();
imgPierde = new Image ();
imgGana = new Image ();

imgNino.src = 'img/ralph.png';
imgPuce.src = 'img/fondo.png';
imgVirus.src = 'img/virus.png';
imgCesped.src = 'img/cesped.png';
imgNube.src = 'img/nube.png';
imgMascarilla.src = 'img/dulce.png';
imgPierde.src = 'img/pierde.png';
imgGana.src = 'img/gana.png';

}

var ancho = 1300;
var alto = 600;
var canvas, ctx;



function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  cargaImagenes();

}
function borraCanvas(){
  canvas.width = ancho;
  canvas.height = alto;
}

var cesped = 350;
var nino = { y: cesped, vy:0, gravedad:2, salto:40, vymax:9, saltando:false };
var nivel = {velocidad:20, marcador:1, muerto:false};
var virus = {x:ancho + 100 , y:cesped+120,};
var puce = {x:400, y:0};
var cespedg = {x:0,y:cesped+200};
var nube = {x:400, y:50, velo:true};
var mascarilla = {x:ancho + 850 , y: cesped +10};
var inicia = {no: false};
var pierde = { x: 80, y: cesped+120, aparecer: false}
var gana = { x: 200, y: cesped-30, aparecer1: false}


function dibujaMascarilla() {
  ctx.drawImage(imgMascarilla,0,0,400,400,mascarilla.x,mascarilla.y-50,130,130);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function logicaMascarilla(){
  if(mascarilla.x < -100){
    mascarilla.x= ancho +100;
    mascarilla.y=getRandomArbitrary(100,300);
  }
  else{
    mascarilla.x -= nivel.velocidad;
  }
}

function dibujaNino() {
  ctx.drawImage(imgNino,0,0,1600,1600,100,nino.y,170,220);
}

function dibujaVirus() {
  ctx.drawImage(imgVirus,0,0,619,630,virus.x,virus.y,80,80);
}

function dibujaPierde() {
  ctx.drawImage(imgPierde,0,0,360,360,pierde.x,pierde.y,80,80);
}
function DibujaGana() {
  ctx.drawImage(imgGana,0,0,5996,5758,gana.x,gana.y,100,100);
}



var aux = false;


function logicaVirus(){

  if( virus.x >= 100 && virus.x <= 150){
    if (nino.y >= 150){
      pierde.aparecer=true;
      aux=true;
    }
    else{
      aux=false;
    }
  }

  if(virus.x < -100){
    virus.x= ancho +100;
    if(aux==true){
      nivel.marcador = nivel.marcador - 2;
      nivel.velocidad = nivel.velocidad + 4;
    }
  }
  else{
    virus.x -= nivel.velocidad;
    virus.veloci+=34;
  }
}
var aux1 = false;
function coli(){

  if( mascarilla.x >= 100 && mascarilla.x <= 150){
    if (mascarilla.y >= nino.y - 40){
      aux1=true;

    }
    else{
      aux1=false;

    }
  }
}
var mascprueba=0;
function logicaMascarilla(){

  if(mascarilla.x < -100){
    mascarilla.x= ancho +3000;
    mascarilla.y=getRandomArbitrary(100,500);
    if(aux1==true){
      gana.aparecer1=true;
      nivel.marcador = nivel.marcador + 1;
      mascprueba=mascprueba+1;
    }
  }
  else{
    gana.aparecer1=false;
    mascarilla.x -= nivel.velocidad;
  }
}

function fin(){
  if(nivel.marcador<=0){
    nivel.muerto=true;
    nivel.velocidad=0;
  }
}

function dibujaPuce() {
  ctx.drawImage(imgPuce,0,0,474,266 ,0,puce.y,1300,550);
}

function dibujaNube() {
  ctx.drawImage(imgNube,0,0,800,800,nube.x,nube.y-120,300,300);
}

function logicaNube(){
  if(nube.velo==true){
    if(nube.x < -100){
      nube.x= ancho +100;
    }
    else{
      nube.x -= 2;
    }
  }
  else{
    nube.x=400;
  }

}


function dibujaCesped() {
  ctx.drawImage(imgCesped,cespedg.x,0,527,64,0,cespedg.y,1500,60);
}

function logicaCesped(){
  if(cespedg.x > 37 ){
    cespedg.x= 0;
  }
  else{
    cespedg.x += nivel.velocidad;
  }
}

function saltar() {
  nino.saltando = true;
  nino.vy = nino.salto;
}

function gravedad() {
  if (nino.saltando == true){
    if (nino.y - nino.vy - nino.gravedad > cesped){
      nino.saltando = false;
      nino.vy = 0;
      nino.y = cesped;
    }
    else {
      nino.vy -= nino.gravedad;
      nino.y -= nino.vy;
    }
  }
}


function puntuacion() {
  ctx.font = "40px impact";
ctx.fillStyle = '#7128C3';
ctx.fillText('VIDA :',1050,50);
ctx.fillStyle = '#1C2BE1';
ctx.fillText(`${nivel.marcador}`,1200,50);
ctx.font = "40px impact";
 ctx.fillStyle = '#7128C3';
 ctx.fillText('PUNTOS :',670,50);
 ctx.fillStyle = '#1C2BE1';
ctx.fillText(`${mascprueba}`,850,50);
  if(nivel.muerto == true ){
    nube.velo=false;
    ctx.font = "120px impact";
    ctx.fillStyle = '#F9F509';
    ctx.fillText('GAME OVER',380,300);
    nivel.marcador =0;
    nivel.velocidad=0;
    db.collection('puntuaciones').add({username: userInfo.displayName, score: mascprueba, email: userInfo.email, id: userInfo.uid});



  }
}
function loadLeaderBoard(){
    var html = "";
    var count = 1;
    db.collection('puntuaciones').orderBy('score', 'desc').limit(10).onSnapshot((snap) => {
      html = "";
      count = 1;
      snap.forEach((doc) => {
        if(doc.data()['username'] == "")
          html += '<div class="user"> <div class="user-info">' + count++ +'.- Sin nombre</div><div class="user-score">' + doc.data()['score'] + '</div></div>';
        else
          html += '<div class="user"> <div class="user-info">' + count++ +'.- ' + doc.data()['username'] + '</div><div class="user-score">' + doc.data()['score'] + '</div></div>';
      })
      document.getElementById("leaderboard").innerHTML = html;
    });
  }

//Bucle principal
var FPS = 50;
setInterval(function(){
  principal();
},1000/FPS);
checkAccount();
loadLeaderBoard();
function principal(){

  borraCanvas();
  gravedad();
  coli();
  logicaVirus();
  logicaNube();
  logicaCesped();
  logicaMascarilla();
  dibujaPierde();
  DibujaGana();
  dibujaPuce();
  dibujaCesped();
  dibujaNube();
  dibujaVirus();
  dibujaNino();
  dibujaMascarilla();
  puntuacion();
  fin();

  if(aux == true && pierde.aparecer == true){
    dibujaPierde();
  }
  else{
    pierde.aparecer = false;
  }
  if(aux1 == true && gana.aparecer1 == true){
    DibujaGana();
  }
  else{
    gana.aparecer1 = false;
  }
}
