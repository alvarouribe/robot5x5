const prompt = require("prompt-async");

class Robot5x5 {
  constructor() {
    this.keepAsking = true;
    this.x = 0;
    this.y = 0;
    this.f = 'n';

    console.log('- Robot 5x5 Started -');
    console.log('x: ' + this.x);
    console.log('y: ' + this.y);
    console.log('f: ' + this.f);
  }

  /** 
   * place() sets the position of the robot in the 5x5 board. 
   **/
  place(xAxis, yAxis, facingRobot) {
    this.x = xAxis;
    this.y = yAxis;
    this.f = facingRobot;
    console.log('place(' + this.x + ',' + this.y + ',' + this.f + ')');
  }

  /** 
   * this.move() will move forward the robot if it is inside the board limits. 
   **/
  move() {
    // console.log('move('+this.f+')');
    switch(this.f) {
      case 'n':
        if (this.y + 1 < 5) { 
          this.y = this.y + 1; 
        } else { console.log('Cannot move further to ' + this.f + ' direction'); }
      break;
      case 's':
        if (this.y - 1 >= 0) { 
          this.y = this.y - 1; 
        } else { console.log('Cannot move further to ' + this.f + ' direction'); }
      break;
      case 'e':
        if (this.x + 1 < 5) { 
          this.x = this.x + 1; 
        } else { console.log('Cannot move further to ' + this.f + ' direction'); }
      break;
      case 'w':
        if (this.x - 1 >= 0) { 
          this.x = this.x - 1; 
        } else { console.log('Cannot move further to ' + this.f + ' direction'); }
      break;           
      default: 
        console.log('this.MOVE() Default switch'); 
    }
  }

  /**
   * this.left() sets the new position of the robot counter clockwise
   */
  left() {
    this.nextArrayItem(["w","s","e","n"]);
  }

  /**
   * this.right() sets the new position of the robot clockwise
   */
  right() {
    this.nextArrayItem(["w","n","e","s"]);
  }

  /**
   * nextArrayItem() sets the facing position of the robot from the next position of an array
   */
  nextArrayItem(zArray) {
    let index = zArray.indexOf(this.f);
    if (index >= 0 && index < zArray.length - 1) {
      this.f = zArray[index+1];
    } else {
      this.f = zArray[0];
    }
  }

  report() {
    console.clear();
    console.log(' --- REPORT ---');
    console.log('X: ' + this.x);
    console.log('Y: ' + this.y);
    console.log('F: ' + this.f);
    console.log(' --- REPORT ---');
  }

  runTests() {
    this.test1();
    this.test2();
    this.test3();
    this.keepAsking = false;
  }

  test1() {
    this.place(0,0,'n');
    this.move();
    if (this.x==0 && this.y==1 && this.f=='n') {
      console.log('Test 1 passed :D');
      console.log('');
    }else {
      console.log('Test 1 Did Not Pass');
      this.report();
    }
  }

  test2() {
    this.place(0,0,'n');
    this.left();
    
    if (this.x==0 && this.y==0 && this.f=='w') {
      console.log('Test 2 passed :D');
      console.log('');
    }else {
      console.log('Test 2 Did Not Pass');
      this.report();
    }
  }

  test3() {
    this.place(1,2,'e');
    this.move();
    this.move();
    this.left();
    this.move();
    
    if (this.x==3 && this.y==3 && this.f=='n') {
      console.log('Test 3 passed :D');
      console.log('');
    }else {
      console.log('Test 3 Did Not Pass');
      this.report();
    }
  }

  async launchMenu() {
    prompt.start();
    let schema = {
      properties: {
        option: {
          pattern: /^[0-6]/,
          message: 'Please choose from 0 to 6',
          required: true
        }
      }
    };
    
    // console.clear();
    console.log("***************************************");
    console.log(" Welcome to the tabletop robot game!");
    console.log(" The tabletop is a 5x5 board and the origin (0,0) ");
    console.log("can be considered to be the SOUTH WEST most corner.");
    console.log();
    console.log(" Choose one of the options to start playing with the Robot:");
    console.log(" 0) EXIT");
    console.log(" 1) Place the robot in the tabletop (4,1,n)");
    console.log(" 2) Move the Robot FORWARD");
    console.log(" 3) Turn the Robot to the LEFT");
    console.log(" 4) Turn the Robot to the RIGHT");
    console.log(" 5) Report");  
    console.log(" 6) Run tests");  
    console.log("***************************************");
    
    const result = await prompt.get(schema);
         
    if (result.option == 0) {
      console.log('Ok, Bye Bye Now!');
      this.keepAsking = false;
    }
    if (result.option == 1) {
      await this.placePrompt();
    }
    if (result.option == 2) {
      this.move();
      this.report();
    }
    if (result.option == 3) {
      this.left();
      this.report();
    }
    if (result.option == 4) {
      this.right();
      this.report();
    }
    if (result.option == 5) {
      this.report();
    }
    if (result.option == 6) {
      this.runTests();
    }
    if (result.option > 6) {
      console.log('That is not a valid option, please try again.');
    }
  }
  
  async start() {
    try {
      while (this.keepAsking) { 
        await this.launchMenu(); 
      }
    }
    catch(error) {
      console.error("An error occurred: ", error);
    }
  }
  
  async launchPlacePrompt() {
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
    const result = await prompt.get(schema);
    this.x = result.xAxis;
    this.y = result.yAxis;
    this.f = result.facingPosition;
  }

  async placePrompt() {
    try {
      await this.launchPlacePrompt(); 
    }
    catch(error) {
      console.error("An error occurred: ", error);
    }
  }
}

const Robot = new Robot5x5();
Robot.start();