var rl = require('readline');

var interface = rl.createInterface(process.stdin, process.stdout, null);

interface.question("What is your favorite food? ", function(answer) {
  console.log('Oh, so your favorite food is ' + answer + '.\n');
  console.log("Thank you for your valuable feedback.\n");

  // These two lines together allow the program to terminate. Without
  // them, it would run forever.
  interface.close();
  process.stdin.destroy();
});
