const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

const arr = [new Command('commandType'), new Command('MOVE')];

//TEST 4
describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Command type required.'
      }
    );
  })
});

//TEST 5
  it("constructor sets name", function () {
    assert.strictEqual ((new Message('name')).name,'name')
  });

//TEST 6
  it("contains a commands array passed into the constructor as 2nd argument", function () {
    assert.strictEqual ((new Message('name', arr)).commands,arr)
  });