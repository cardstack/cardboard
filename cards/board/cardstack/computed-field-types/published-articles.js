const { sortBy, reverse } = require('lodash');

exports.type = '@cardstack/core-types::has-many';

async function filter(list, predicate) {
  let results = [];
  for (let element of list) {
    if (await predicate(element)) {
      results.push(element);
    }
  }
  return results;
}

exports.compute = async function(model) {
  let articles = await model.getRelated('articles');
  if (!articles) { return; }
  articles = articles.filter(i => Boolean(i));

  let publishedArticles = await filter(articles, async article => await article.getField('published-date'));
  let publishedArticlesRefs = [];
  for (let article of publishedArticles) {
    let id = await article.getField('id');
    let publishedDate = await article.getField('published-date');
    publishedArticlesRefs.push({ id, type: 'articles', publishedDate });
  }

  let sortedArticles = reverse(sortBy(publishedArticlesRefs, ['publishedDate']));
  sortedArticles.forEach(article => delete article.publishedDate);

  return sortedArticles;
};