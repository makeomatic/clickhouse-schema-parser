const formatJSONSchema = require('./format/json-schema');

function parse(schema) {
  const parts = [];

  let leftBrkCatched = 0;
  let commentCatched = false;
  let dashCommentCatched = false;
  let part = '';

  for (let i = 0; i < schema.length; i += 1) {
    const char = schema[i];
    const nextChar = schema[i + 1];
    const prevChar = schema[i - 1];

    // catch lefts brackets count, usefull for FixedString(32)
    if (char === '(') {
      leftBrkCatched += 1;

      // skip first left bracket
      if (leftBrkCatched === 1) {
        continue;
      }
    }

    // schema end
    if (leftBrkCatched === 1 && char === ')') {
      // push parts if exists
      if (part !== '') {
        parts.push(part);
      }

      break;
    }

    // catch right brackets count, usefull for FixedString(32)
    if (char === ')') {
      leftBrkCatched -= 1;
    }

    // proccess comment
    if (char === '-' && nextChar === '-') {
      dashCommentCatched = true;
    }

    // proccess comment
    if (char === '/' && nextChar === '*') {
      commentCatched = true;
    }

    // it's not schema yet
    if (leftBrkCatched === 0) {
      continue;
    }

    // skip comment
    if (dashCommentCatched === true && char !== '\n') {
      continue;
    }

    // skip comment
    if (commentCatched === true && (char !== '*' || (char === '*' && prevChar === '/'))) {
      continue;
    }

    // end of comment skiping
    if (dashCommentCatched === true && char === '\n') {
      dashCommentCatched = false;
      continue;
    }

    // end of comment skiping
    if (commentCatched === true && char === '*' && nextChar === '/') {
      commentCatched = false;
      continue;
    }

    // end of comment skiping
    if (char === '/' && prevChar === '*') {
      continue;
    }

    // skip whitespaces before key or value
    if (part === '' && (char === '\n' || char === ' ')) {
      continue;
    }

    // collect key or value
    if (char !== ',' && char !== ' ') {
      part += char;
    } else {
      // push key or value
      parts.push(part);
      part = '';
    }
  }

  return parts;
}

module.exports = {
  parse,
  formatJSONSchema,
};
