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

function parse(schema) {
  const parts = [];

  let leftBrkCatched = 0;
  let dashCommentCatched = false;
  let part = '';

  for (let i = 0; i < schema.length; i += 1) {
    const char = schema[i];

    if (char === '(') {
      leftBrkCatched += 1;
    }

    if (leftBrkCatched === 1 && char === ')') {
      if (part !== '') {
        parts.push(part);
      }

      break;
    }

    if (char === ')') {
      leftBrkCatched -= 1;
    }

    if (char === '-' && schema[i + 1] === '-') {
      dashCommentCatched = true;
    }

    if (leftBrkCatched === 0) {
      continue;
    }

    if (leftBrkCatched === 1 && char === '(') {
      continue;
    }

    if (dashCommentCatched === true && char !== '\n') {
      continue;
    }

    if (dashCommentCatched === true && char === '\n') {
      dashCommentCatched = false;
      continue;
    }

    if (part === '' && (char === '\n' || char === ' ')) {
      continue;
    }

    if (char !== ',' && char !== ' ') {
      part += char;
    } else {
      parts.push(part);
      part = '';
    }
  }

  return parts;
}

function formatJSONSchema(parts) {
  const schema = Object.create(null);
  const properties = Object.create(null);
  const required = new Set();

  for (let i = 0; i < parts.length; i += 2) {
    const property = Object.create(null);
    const key = parts[i];
    const type = parts[i + 1];

    property.type = JSONSchemaMapper[type.indexOf('FixedString') === 0 ? 'FixedString' : type];
    properties[key] = property;
    required.add(key);
  }

  schema.type = 'object';
  schema.properties = properties;
  schema.required = Array.from(required);

  return schema;
}

module.exports = {
  parse,
  formatJSONSchema,
};
