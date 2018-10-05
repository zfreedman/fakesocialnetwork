module.exports = key => {
  if (key.length === 1) return [key];

  const chars = key.split("");
  const strings = [];
  let nextStart = 0;
  let i;
  for (i = 0; i < key.length; ++i) {
    if (i === 0) continue;

    // check if this char is uppercase
    const thisIsUpperCase = key[i] === key[i].toUpperCase();
    // check if previous char is lowercase
    const lastWasLowerCase = key[i - 1] === key[i - 1].toLowerCase();

    // camel case, something like thi(sH)ere
    if (thisIsUpperCase && lastWasLowerCase) {
      strings.push(key.substr(nextStart, i - nextStart));
      nextStart = i;
    }
  }

  strings.push(key.substr(nextStart, i - nextStart));
  return strings;
};
