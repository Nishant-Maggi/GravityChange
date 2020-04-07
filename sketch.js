
// CREATE GLOBAL VARIABLES
// For Engine, World, Bodies and any other that you have in mind to make your coding life easier.
// remember to create an array of boxes.
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
 
var ground;
var gSlider;

var boxes=[];
 
function setup() {
    createCanvas(400, 400);

    // Create an instance of Engine, World
    engine = Engine.create();
    world = engine.world;
 
    // A slider is already created for you here. This slider will dictate the gravity of the world
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 375);


    engine.world.gravity = map(gSlider.value(), gSlider.min, gSlider.max, 0, 1);



    console.log(gSlider.min);
 
    // Create a ground rectangle that would hold all the boxes and add it to the world.
    ground = new Ground(200,360,400,20);

}
 
function mousePressed() {
    if (mouseY < 350) {
        // Every time a mouse press occurs create a new box.
       var box = new Box(mouseX,mouseY,Math.round(random(20,40)),Math.round(random(20,40)));

        boxes.push(box);
    }
}
 
function draw() {
    // Draw all the elements including the slider that 

    Engine.update(engine);


    background(51);
    // This is the value of your gravity. You can optionally show it to the viewer.
    var fVal = gSlider.value();
    
    engine.world.gravity = map(gSlider.input, gSlider.min, gSlider.max, 0, 1);

    ground.display();
 
    // Use a for loop to show all the boxes
    for(var i=0; i<boxes.length; i++ ){
        boxes[i].show();
    }

}
 

// You can either create a file for the class Box or build a simple function that creates one box at a time.
// I have gone for the second option.
class Box {
    constructor(x, y, w, h, options){

    
    

    // add options such as friction and restitution. Experiment with the values
    var options = {
        'restitution':0.0,
        'friction':0.4,
        'density':1.6,
    }
 
    // create your box using the function arguments
    // x - x-coordinate
    // y - y-coordinate
    // w - width of the box
    // h - height of the box

    this.body = Bodies.rectangle(x,y,w,h,options);

    World.add(world,this.body);

    this.width = w;
    this.height = h;
}

    // Create a show method which will draw the box every time it is called inside the draw method.
    // remember to push and pop.
    show() {
        rect(this.body.position.x,this.body.position.y,this.width,this.height);
    }
}