const prompt = require("prompt-async");
var keepAsking = true;

async function launchMenu() // Available only with `prompt-async`!
{
    prompt.start();
    let schema = {
      properties: {
        option: {
          pattern: /^[0-5]/,
          message: 'Please choose from 0 to 5',
          required: true
        }
      }
    };
    
    console.clear();
    console.log("***************************************");
    console.log("** Welcome to the tabletop robot game! **");
    console.log("** Choose one of the options to move the Robot: **");
    console.log("** 0 EXIT **");
    console.log("** 1 Place the robot in the tabletop **");
    console.log("** 2 Move the Robot FORWARD **");
    console.log("** 3 Turn the Robot to the LEFT **");
    console.log("** 4 Turn the Robot to the RIGHT **");
    console.log("** 5 Report **");  
    console.log("***************************************");
    
    const result = await prompt.get(schema);
         
    if (result.option == 0) {
      keepAsking = false;
    }
}
 
async function error_handling_async()
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
 
error_handling_async();