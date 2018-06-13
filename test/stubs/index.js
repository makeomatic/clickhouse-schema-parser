const schemaMultiString = `
  CREATE TABLE test
  (
    -- comment
    property_String String,
    property_FixedString FixedString(2),

    /* comment */
    property_Int8 /* comment */ Int8,
    property_Int16 Int16,  /* comment */
    property_Int32 Int32, -- comment
    /* comment */ property_Int64 Int64,

    -- comment
    property_UInt8 UInt8,
    property_UInt16 UInt16,
    property_UInt32 UInt32,
    property_UInt64 UInt64,

    property_Float32 Float32,
    property_Float64 Float64,

    property_Date Date,
    property_DateTime DateTime -- comment
  ) ENGINE = MergeTree(property_Date, (property_Int8, property_Date), 8192)
`;
/* eslint-disable-next-line max-len */
const schemaOneString = 'CREATE TABLE test ( property_String  /* comment */  String,  /* comment */ property_FixedString FixedString(2), property_Int8 Int8, property_Int16 Int16, property_Int32 Int32, property_Int64 Int64, property_UInt8 UInt8, property_UInt16 UInt16, property_UInt32 UInt32, property_UInt64 UInt64, property_Float32 Float32, property_Float64 Float64, property_Date Date, property_DateTime DateTime ) ENGINE = MergeTree(property_Date, (property_Int8, property_Date), 8192)';
const assertFlatArray = [
  'property_String',
  'String',
  'property_FixedString',
  'FixedString(2)',
  'property_Int8',
  'Int8',
  'property_Int16',
  'Int16',
  'property_Int32',
  'Int32',
  'property_Int64',
  'Int64',
  'property_UInt8',
  'UInt8',
  'property_UInt16',
  'UInt16',
  'property_UInt32',
  'UInt32',
  'property_UInt64',
  'UInt64',
  'property_Float32',
  'Float32',
  'property_Float64',
  'Float64',
  'property_Date',
  'Date',
  'property_DateTime',
  'DateTime',
];
const assertJSONSchema = {
  type: 'object',
  properties: {
    property_String: { type: 'string' },
    property_FixedString: { type: 'string' },
    property_Int8: { type: 'integer' },
    property_Int16: { type: 'integer' },
    property_Int32: { type: 'integer' },
    property_Int64: { type: 'string' },
    property_UInt8: { type: 'integer' },
    property_UInt16: { type: 'integer' },
    property_UInt32: { type: 'integer' },
    property_UInt64: { type: 'string' },
    property_Float32: { type: 'number' },
    property_Float64: { type: 'number' },
    property_Date: { type: 'string' },
    property_DateTime: { type: 'string' },
  },
  required: [
    'property_String',
    'property_FixedString',
    'property_Int8',
    'property_Int16',
    'property_Int32',
    'property_Int64',
    'property_UInt8',
    'property_UInt16',
    'property_UInt32',
    'property_UInt64',
    'property_Float32',
    'property_Float64',
    'property_Date',
    'property_DateTime',
  ],
};

module.exports = {
  schemaMultiString,
  schemaOneString,
  assertFlatArray,
  assertJSONSchema,
};
