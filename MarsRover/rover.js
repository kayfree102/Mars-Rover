const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
    constructor(position, mode = "NORMAL", generatorWatts = 110) {
		this.position = position;
		this.mode = mode;
		this.generatorWatts = generatorWatts;
    }
    receiveMessage(message) {
     
      let receiveMessageResponse = {
        message: message.name,
        result: []
      }
       for (let i=0; i<message.commands.length; i++){
        if(message.commands[i].commandType==='STATUS_CHECK'){
          receiveMessageResponse.result.push({
          completed: true
          
        }) 
        }else if (message.commands[i].commandType=== 'MODE_CHANGE'){
          this.mode = message.commands[i].value;
          receiveMessageResponse.result.push({
          completed: true,
          roverStatus: {generatorWatts: 110, mode: 'NORMAL', position: 98382}
      
        })


        } else if (message.commands[i].commandType=== 'MOVE'){
        if (this.mode === 'LOW_POWER') {
        receiveMessageResponse.result.push({
            completed: false
          });
        } else {
          this.position = message.commands[i].value;
          receiveMessageResponse.result.push({
            completed: true
          });
        }
      } else {
        receiveMessageResponse.result.push({
          completed: true
        })
      }
    }
    
    return receiveMessageResponse;
  }
}
module.exports = Rover;

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382); // Passes 98382 as the rover's position.

let response = rover.receiveMessage(message);
