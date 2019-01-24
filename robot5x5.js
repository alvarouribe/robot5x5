const prompt = require("prompt-async");
var keepAsking = true;

/** place() sets the position of the robot in the 5x5 board. */
function place(xAxis, yAxis, facingRobot) {
  x = xAxis;
  y = yAxis;
  f = facingRobot;
  console.log('place('+x+','+y+','+f+')');
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
    
    console.clear();
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
 
run();