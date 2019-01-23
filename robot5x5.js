var prompt = require('prompt');
 
var schema = {
   properties: {
     option: {
       pattern: /^[0-5]/,
       message: 'Please choose from 0 to 5',
       required: true
     }
   }
 };

 console.clear();
 console.log("Choose one of the options to move the Robot:");
 console.log("0 EXIT");
 console.log("1 Place the robot in the tabletop");
 console.log("2 Move the Robot FORWARD");
 console.log("3 Turn the Robot to the LEFT");
 console.log("4 Turn the Robot to the RIGHT");
 console.log("5 Report");  

 
 prompt.start();

 prompt.get(schema, function (err, result) {
   if (err) {
     console.log(err);
     return 1;
   } else {
     if (result.option === 0) {
       console.log('Thank you bye bye now.');  
     }
     
     console.log('Option choosen: ' + result.option);

   }
 });