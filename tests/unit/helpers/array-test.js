
import { array } from 'dummy/helpers/array';
import { module, test } from 'qunit';

module('Unit | Helper | array');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = array([42, 54]);
  assert.ok(result);
  assert.deepEqual(result, [42, 54], 'returns params in an array');
});
