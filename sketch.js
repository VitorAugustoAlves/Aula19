var mumia, mumia_running, edges;
var groundImage, solo;
var soloinv;
var nuvem1, nuvem2;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6, nome;
var pontos = 0
var cactosG, nuvemG
var gameState = "inicio"
var mumiamorto
var gameOver
var gameOver2
var restart
var restart2
var pulo, checkpoint, die;

function preload() {
  mumia_running = loadAnimation("mumia1.png", "mumia2.png", "mumia3.png");
  groundImage = loadImage("Background.jpg");
  nuvem1 = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")
  mumiamorto = loadImage("mumia4.png")
  gameOver = loadImage("gameOver.png")
  restart = loadImage("restart.png")
  pulo = loadSound ("jump.mp3")
  checkpoint = loadSound ("checkpoint.mp3")
  die = loadSound ("die.mp3")
}

function setup() {
  createCanvas(600, 200);
  solo = createSprite(300, 180)
  solo.addImage(groundImage)
  soloinv = createSprite(80, 190, 150, 10)
  soloinv.visible = false
  //criando a mumia
  mumia = createSprite(50, 160, 10, 50);
  mumia.addAnimation("running", mumia_running);
  mumia.addImage("morto",mumiamorto)
  edges = createEdgeSprites();

  //adicione dimensão e posição a mumia
  mumia.scale = 2;

  gameOver2 = createSprite(300,100)
  gameOver2.addImage(gameOver)
  gameOver2.visible = false

  restart2 = createSprite(300,150)
  restart2.addImage(restart)
  restart2.scale = 0.5
  restart2.visible = false

  cactosG = new Group()

  nuvemG = new Group()

  //hitbox mumia
  mumia.debug=false
  //trex.setCollider("circle",0,0,40)
  mumia.setCollider("rectangle",0,0,10,30,0)
}


function draw() {
  //definir a cor do plano de fundo 
  background("white");
  text("Score " + pontos, 500, 30)
  //registrando a posição y do trex
  console.log(mumia.y)

  //impedir que o trex caia
  mumia.collide(soloinv)
  drawSprites();

    if (pontos>0&&pontos%100===0){
      checkpoint.play()
    }

  //GameState
  if (gameState === "inicio") {
    pontos = pontos + Math.round(getFrameRate() / 60)  
    console.log(frameCount)
    //pular quando tecla de espaço for pressionada
    if (keyDown("space") && mumia.y > 150) {
      mumia.velocityY = -10;
      pulo.play()
    }

    //pulo da mumia
    mumia.velocityY = mumia.velocityY + 0.5;
    solo.velocityX = -(10+pontos/100)

    //solo infinito
    if (solo.x < 0) {
      solo.x = solo.width / 2
    }
    criarNuvem()
    cactos()
   if (mumia.isTouching(cactosG)){
    gameState = "fim" 
    die.play()
    //trex.velocityY = -10;
   }

  } else if (gameState === "fim") {
     mumia.velocityY = 0
     solo.velocityX = 0
     mumia.changeAnimation("morto",mumiamorto)
     cactosG.setVelocityXEach(0)
     nuvemG.setVelocityXEach(0)
     cactosG.setLifetimeEach(-1)
     nuvemG.setLifetimeEach(-1)
     gameOver2.visible = true
     restart2.visible = true
    if  (mousePressedOver(restart2)){

      reset()   
    }
  }
}
//Criar nuvens
function criarNuvem() {
  if (frameCount % 80 === 0) {
    nuvem2 = createSprite(630, 150)
    nuvem2.addImage(nuvem1)
    nuvem2.velocityX = -8
    nuvem2.y = Math.round(random(10, 140))
    nuvem2.depth = mumia.depth
    mumia.depth = mumia.depth + 1
    nuvem2.lifetime = 100
    nuvemG.add(nuvem2)
  }
}
 
//Criar cactos
function cactos() {
  if (frameCount % 80 === 0) {
    nome = createSprite(630, 160)
    nome.velocityX = -(10+pontos/100)
    nome.lifetime = 100
    nome.scale = 0.7
    cactosG.add(nome)
    var aleatorio = Math.round(random(1, 6))

    switch (aleatorio) {
      case 1:
        nome.addImage(cacto1)
        break;

      case 2:
        nome.addImage(cacto2)
        break;

      case 3:
        nome.addImage(cacto3)
        break;

      case 4:
        nome.addImage(cacto4)
        break;

      case 5:
        nome.addImage(cacto5)
        break;

      case 6:
        nome.addImage(cacto6)
        break;

      default:
        break;
    }
  }
}
 function reset (){

  gameState =  "inicio";
  nuvemG.destroyEach();
  cactosG.destroyEach();
  gameOver2.visible = false;
  restart2.visible = false;
  pontos = 0 ;
  mumia.changeAnimation("running", mumia_running)
 }