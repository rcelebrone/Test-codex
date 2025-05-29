const assert = require('assert');
const { add } = require('../index');
const { extractFirstTitle } = require('../server');

assert.strictEqual(add(2, 3), 5);

const sampleHtml = `
  <div id="rso">
    <div></div>
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        <div>
          <span><a><h3>Expected Title</h3></a></span>
        </div>
      </div>
    </div>
  </div>
`;

assert.strictEqual(extractFirstTitle(sampleHtml), 'Expected Title');
console.log('All tests passed');
