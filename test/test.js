const assert = require('assert');
const { add, extractFirstTitle, extractTitles } = require('../index');

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

const multiHtml = `
<div>
  <h3>Title One</h3>
  <p>something</p>
  <h3>Title Two</h3>
</div>
`;
assert.deepStrictEqual(extractTitles(multiHtml), ['Title One', 'Title Two']);
console.log('All tests passed');
