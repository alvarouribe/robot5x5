const prompt = require("prompt-async");

let keepAsking = true;
let x = 0;
let y = 0;
let f = 'n';

 /** 
 * place() sets the position of the robot in the 5x5 board. 
 **/
function place(xAxis, yAxis, facingRobot) {
  x = xAxis;
  y = yAxis;
  f = facingRobot;
  console.log('place('+x+','+y+','+f+')');
}

/** 
 * move() will move forward the robot if it is inside the board limits. 
 **/
function move() {
  // console.log('move('+f+')');
  switch(f) {
    case 'n':
      if (y + 1 < 5) y = y + 1;
    break;
    case 's':
      if (y - 1 >= 0) y = y - 1;
    break;
    case 'e':
      if (x + 1 < 5) x = x + 1;
    break;
    case 'w':
      if (x - 1 >= 0) x = x - 1;
    break;           
    default: 
      console.log('MOVE DEFAULT'); 
  }
}

/**
 * left() sets the new position of the robot counter clockwise
 */
function left() {
  let leftArray = ["w","s","e","n"];
  nextFacingPosition(leftArray);
}

/**
 * right() sets the new position of the robot clockwise
 */
function right() {
  let rightArray = ["w","n","e","s"];
  nextFacingPosition(rightArray);
}

/**
 * nextFacingPosition() sets the facing position of the robot from the next position of an array
 */
function nextFacingPosition(zArray) {
  let index = zArray.indexOf(f);
  if (index >= 0 && index < zArray.length - 1) {
    f = zArray[index+1];
  } else {
    f = zArray[0];
  }
}

function report() {
  // console.clear();
  console.log('REPORT:');
  console.log('X: '+x);
  console.log('Y: '+y);
  console.log('F: '+f);
}

function test1() {
  place(0,0,'n');
  move();
  if (x==0 && y==1 && f=='n') {
    console.log('Test 1 passed :D');
    console.log('');
  }else {
    console.log('Test 1 Did Not Pass');
    report();
  }
}

function test2() {
  place(0,0,'n');
  left();
  
  if (x==0 && y==0 && f=='w') {
    console.log('Test 2 passed :D');
    console.log('');
  }else {
    console.log('Test 2 Did Not Pass');
    report();
  }
}

function test3() {
  place(1,2,'e');
  move();
  move();
  left();
  move();
  
  if (x==3 && y==3 && f=='n') {
    console.log('Test 3 passed :D');
    console.log('');
  }else {
    console.log('Test 3 Did Not Pass');
    report();
  }
}

async function launchMenu() // Available only with `prompt-async`!
{
    prompt.start();
    let schema = {
      properties: {
        option: {
          pattern: /^[0-6]/,
          message: 'Please choose from 0 to 5',
          required: true
        }
      }
    };
    
    // console.clear();
    console.log("***************************************");
    console.log("** Welcome to the tabletop robot game! **");
    console.log("** Choose one of the options to activate the Robot: **");
    console.log("** 0 EXIT **");
    console.log("** 1 Place the robot in the tabletop **");
    console.log("** 2 Move the Robot FORWARD **");
    console.log("** 3 Turn the Robot to the LEFT **");
    console.log("** 4 Turn the Robot to the RIGHT **");
    console.log("** 5 Report **");  
    console.log("** 6 Run tests **");  
    console.log("***************************************");
    
    const result = await prompt.get(schema);
         
    if (result.option == 0) {
      keepAsking = false;
    }
    if (result.option == 1) {
      console.log('Option 1 Place run prompt');
    }
    if (result.option == 2) {
      move();
      report();
      // console.log('Option 2 Place run prompt');
    }
    if (result.option == 3) {
      left();
      report();
    }
    if (result.option == 4) {
      right();
      report();
    }
    if (result.option == 5) {
      report();
    }
    if (result.option == 6) {
      runTests();
    }
}
 
async function run()
{
    try
    {
      while (keepAsking) { 
        await launchMenu(); 
      }
    }
    catch(error)
    {
        console.error("An error occurred: ", error);
    }
}
 
async function launchPlacePrompt()
{
    prompt.start();
    let schema = {
      properties: {
        xAxis: {
          pattern: /^[0-4]/,
          message: 'Please choose from 0 to 4',
          required: true
        },
        yAxis: {
          pattern: /^[0-4]/,
          message: 'Please choose from 0 to 4',
          required: true
        },
        facingPosition: {
          pattern: /^[nsweNSWE]/,
          message: 'Please choose from N, S, W, E',
          required: true
        }
      }
    };
}

async function placePrompt()
{
    try
    {
      while (keepAsking) { 
        await launchPlacePrompt(); 
      }
    }
    catch(error)
    {
        console.error("An error occurred: ", error);
    }
}

run();

function runTests() {
  test1();
  test2();
  test3();
}