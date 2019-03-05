exports.type = '@cardstack/core-types::boolean';

exports.compute = async function(model) {
  let publishedDate = await model.getField('published-date');

  return !publishedDate;
};