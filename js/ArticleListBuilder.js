/**
 * Constructs an array of Articles from the JSON
 * response object
 *
 * @class
 */
var ArticleListBuilder = Base.extend({

  /**
   * Set the default articleBuilder
   *
   * @returns {ArticleListBuilder}
   * @private
   */
  _init: function() {
    this._articleBuilder = ArticleBuilder.create();
    return this;
  },

  /**
   * Override the articleBuilder
   * @param {ArticleBuilder} articleBuilder
   */
  setArticleBuilder: function(articleBuilder) {
    this._articleBuilder = articleBuilder;
  },

  /**
   * @typedef {object} ResponseObject
   * @property {Array.<ArticleMap>} articleMaps
   */

  /**
   * Build an array of article Objects
   * @param {ResponseObject} responseObject
   * @returns {Array.<Article>}
   *
   */
  build: function(responseObject) {
    var articleBuilder = this._articleBuilder;
    return responseObject.articleMaps.map(function(articleMap) {
      return articleBuilder.build(articleMap);
    });
  }

});