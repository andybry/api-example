/**
 *
 * @param {Article} article
 */
templates.articleListing = function(article) {
  var url = article.getUrl();
  var title = article.getTitle();
  var image = article.getImage();
  var imageSrc = image.getImageUrl();

  return '<a class="resulting-article" href="' + url + '">' +
    '<img class="resulting-article__image" src="' + imageSrc + '" alt="">' +
    '<span class="resulting-article__title">' + title + '</span>' +
  '</a>';
};