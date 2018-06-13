const assert = require('assert');

const { parse, formatJSONSchema } = require('..');
const {
  schemaMultiString, schemaOneString, assertFlatArray, assertJSONSchema,
} = require('./stubs');


describe('parse', () => {
  it('should be able to return flat array with multistring schema', () => {
    assert.deepStrictEqual(parse(schemaMultiString), assertFlatArray);
  });

  it('should be able to return flat array with onestring schema', () => {
    assert.deepStrictEqual(parse(schemaOneString), assertFlatArray);
  });

  it('should be able to return json schema with multistring schema', () => {
    assert.deepEqual(formatJSONSchema(parse(schemaMultiString)), assertJSONSchema);
  });

  it('should be able to return json schema with onestring schema', () => {
    assert.deepEqual(formatJSONSchema(parse(schemaOneString)), assertJSONSchema);
  });
});
