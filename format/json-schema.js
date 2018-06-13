const JSONSchemaMapper = {
  Int8: 'integer',
  Int16: 'integer',
  Int32: 'integer',
  Int64: 'string',
  UInt8: 'integer',
  UInt16: 'integer',
  UInt32: 'integer',
  UInt64: 'string',
  Float32: 'number',
  Float64: 'number',
  String: 'string',
  FixedString: 'string',
  Date: 'string',
  DateTime: 'string',
};

function formatJSONSchema(parts) {
  const schema = Object.create(null);
  const properties = Object.create(null);
  const required = new Set();

  for (let i = 0; i < parts.length; i += 2) {
    const property = Object.create(null);
    const key = parts[i];

    let type = parts[i + 1];

    if (type.indexOf('FixedString') === 0) {
      type = 'FixedString';
    }

    property.type = JSONSchemaMapper[type];
    properties[key] = property;
    required.add(key);
  }

  schema.type = 'object';
  schema.properties = properties;
  schema.required = Array.from(required);

  return schema;
}

module.exports = formatJSONSchema;
