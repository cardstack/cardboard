/*
  This is saying that the cardboard app itself is also a data source.
  Specifically, it implements cardstack/static-model.js to emit the schemas for
  all the cards in the cardboard.
*/
module.exports = [
  {
    type: 'data-sources',
    id: 'card-static-models',
    attributes: {
      'source-type': 'cardboard'
    }
  }
];
