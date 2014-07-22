/**
 * Constructs an article object
 * @type {*}
 */
var ArticleBuilder = Base.extend({

  /**
   * Set default article image builder
   *
   * @param articleMap
   * @returns {ArticleBuilder}
   * @private
   */
  _init: function(articleMap) {
    this._articleImageBuilder = ArticleImageBuilder.create();
    return this;
  },

  /**
   * Override the articleImageBuilder
   *
   * @param {ArticleImageBuilder} articleImageBuilder
   */
  setArticleImageBuilder: function(articleImageBuilder) {
    this._articleImageBuilder = articleImageBuilder;
  },

  /**
   * Representation of the JSON API response
   * articleMap object
   *
   * @typedef {object} ArticleMap
   * @property {string} title
   * @property {string} url
   * @property {ImageMap} imageMap
   */

  /**
   * @param {ArticleMap} articleMap
   */
  build: function(articleMap) {
    var article = Article.create();
    article.setTitle(articleMap.title);
    article.setUrl(articleMap.url);
    var articleImage = this._articleImageBuilder.build(articleMap.imageMap);
    article.setImage(articleImage);
    return article;
  }

});