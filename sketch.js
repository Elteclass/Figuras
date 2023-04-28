//Clase Principal
class Obstaculos
  {
  constructor(x, y, alto, ancho, vx, vy) 
  {
    this.posicion = createVector(x, y);
    this.alto = alto;
    this.ancho = ancho;
    this.fillred = 131;
    this.fillgreen = 255;
    this.fillblue = 51;
    this.velocidad = createVector(vx,vy);
  }

  //Metodo para que sea posible el rebote de los obstaculos en las cuatro paredes
      update()
  {
    if (this.posicion.x + this.ancho >=500)
    {
      this.velocidad.x = this.velocidad.x * -1;
      this.velocidad.y = this.velocidad.y * +1;
    }
    else if (this.posicion.x + this.ancho <20){
      this.velocidad.x = this.velocidad.x * -1;
      this.velocidad.y = this.velocidad.y * +1;
    }
    else if(this.posicion.y + this.ancho >=500)
    {
      this.velocidad.x = this.velocidad.x * +1;
      this.velocidad.y = this.velocidad.y * -1;
    }
    else if (this.posicion.y + this.ancho <20)
    {
      this.velocidad.x = this.velocidad.x * +1;
      this.velocidad.y = this.velocidad.y * -1;
    }
    this.posicion.add(this.velocidad);
  }
    
  }  

//Clase que hereda atributos de la clase Obstaculos
class Elipse extends Obstaculos{
  constructor(x, y, alto, ancho, vx, vy) 
  {
    super(x, y, alto, ancho, vx, vy);
  }
  
  draw()
  {
    fill (this.fillred, this.fillgreen, this.fillblue);
    ellipse(this.posicion.x, this.posicion.y, this.alto, this.ancho);
  }
}

var obstaculos = [];
var dibujando = 'bola';

//Variables necesarias para el funcionamiento correcto de nuestro personaje
let xPersonaje = 240;
let yPersonaje = 240;
let direccionX = 0;
let direccionY = 0;
let velocidad = 5;

//Escenario (se ejecuta una sola vez)
function setup() {
  createCanvas(500, 500);
  frameRate(120);
}

//Métodos que se ejecutan siempre
function draw() {
  //Fondo
  background(220);
  //Personaje
  rect(xPersonaje,yPersonaje,20,20);
  //Desplazamiento del personaje
  movPersonaje();
  //Barreras del escenario
  drawBorder();

  obstaculos.forEach(function(value, index, array)
  {
    value.draw();
  value.update();
  });
}

//Funcion que se realizo para el movimiento continuo del jugador
function movPersonaje(){
  //Movimiento continuo
  xPersonaje = xPersonaje + direccionX;
  //Se ponen los limites del movimiento
  xPersonaje = constrain(xPersonaje, 20, 460);
  //Movimiento continuo
  yPersonaje = yPersonaje + direccionY;
  //Se ponen los limites del movimiento
  yPersonaje = constrain(yPersonaje, 20, 460)
}

//Movimiento del personaje
function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    //xPersonaje(posicion en x) = xPersonaje - velocidad(la cantidad de pixeles que se desplaza)
    xPersonaje = xPersonaje - velocidad;
    //Se realiza esta operacion para que el movimiento sea continuo
    direccionX = - velocidad;
    //Se inicializa direccionY en 0 para que no avance en diagonal
    direccionY = 0;
  }
  else if (keyCode === RIGHT_ARROW){
    //xPersonaje(posicion en x) = xPersonaje + velocidad(la cantidad de pixeles que se desplaza)
    xPersonaje = xPersonaje + velocidad;
    //Se realiza esta operacion para que el movimiento sea continuo
    direccionX = + velocidad;
    //Se inicializa direccionY en 0 para que no avance en diagonal
    direccionY = 0;
  }
  else if (keyCode === UP_ARROW){
    //yPersonaje(posicion en y) = yPersonaje - velocidad(la cantidad de pixeles que se desplaza)
    yPersonaje = yPersonaje - velocidad;
    //Se realiza esta operacion para que el movimiento sea continuo
    direccionY = - velocidad;
    //Se inicializa direccionX en 0 para que no avance en diagonal
    direccionX = 0;
  }
  else if (keyCode === DOWN_ARROW){
    //yPersonaje(posicion en y) = yPersonaje + velocidad(la cantidad de pixeles que se desplaza)
    yPersonaje = yPersonaje + velocidad;
    //Se realiza esta operacion para que el movimiento sea continuo
    direccionY = + velocidad;
    //Se inicializa direccionX en 0 para que no avance en diagonal
    direccionX = 0;
  }
}

//Funcion que crea los obstaculos con clicks del mouse
function mouseClicked() 
{
  if (mouseY > 25)
    {
      if (dibujando == 'bola')
        obstaculos.push(new Elipse(mouseX, mouseY, 20, 20, 10 ,4));
    }
  return false;
}

//Se dibujan cuadros en forma de barrera para el escenario
function drawBorder(){
  //Pared Arriba
  for(let paredX = 0; paredX < width; paredX += 20){
    rect (paredX,0,20,20);
  }
  //Pared Derecha
  for(let paredY = 0; paredY < width; paredY += 20){
    rect (480,paredY,20,20);
  }
  //Pared Abajo
  for(let pared2X = 0; pared2X < width; pared2X += 20){
    rect (pared2X,480,20,20);
  }
  //Pared Izquierda
  for(let pared2Y = 0; pared2Y < width; pared2Y += 20){
    rect (0,pared2Y,20,20);
  }
}