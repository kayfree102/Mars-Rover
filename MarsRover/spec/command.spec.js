const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

//TEST 1
describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

});

//Test 2
it("constructor sets command type", function(){
    assert.strictEqual (( new Command('commandType')).commandType, 'commandType')
  });

//Test 3
  it("constructor sets a value passed in as the 2nd argument", function () {

    assert.strictEqual ((new Command
    ('commandType', 'value')).value,'value')
  });

  