module.exports = function (source) {
  const result = source.replace(/Hello/g, "你好");

  return result;
};
