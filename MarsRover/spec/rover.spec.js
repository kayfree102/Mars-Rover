const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');
const Rover = require('../rover.js');


//TEST 7
describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    assert.strictEqual(new Rover('mode').mode, "NORMAL")
    assert.strictEqual(new Rover('mode').generatorWatts, 110)
  });
});

//TEST 8
describe("Rover class", function() {

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    assert.strictEqual(new Rover(98382).receiveMessage(message).message, 'Test message with two commands')
  });
});

//TEST 9
describe("Rover class", function() {

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
    
  assert.strictEqual(new Rover(98382).receiveMessage(message).result.length, 2)
  });
});

//TEST 10
describe("Rover class", function() {

  it("responds correctly to status check command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    assert.deepStrictEqual(response.result[1], {
      completed: true
    });
  });
});

// TEST 11
describe("Rover class", function() {

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.mode, 'LOW_POWER');
    
  });
});

// TEST 12 
describe("Rover class", function() {

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 98382)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.result[1].completed, false);
  });
});

// TEST 13
describe("Rover class", function() {
   
  it("responds with position for move command", function() {
    let position = 98382;
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 98382)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 + 500 for move as the rover's position.

    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.position, 98382);
  });
});

