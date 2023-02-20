function isEmptyOrWhitespace(text) {
  return text === null || text.match(/^ *$/) !== null;
}

function replaceAll(text, find, replace) {
  return text.replace(new RegExp(find, 'g'), replace);
}

export { isEmptyOrWhitespace, replaceAll };