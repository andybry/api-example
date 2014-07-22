/**
 * Data class representing an article.
 *
 * @class
 */
var Article = Base.extend({

  /**
   * sets default data
   *
   * @returns {Article}
   * @private
   */
  _init: function() {
    this._title = '';
    this._url = '';
    this._image = ArticleImage.create();
    return this;
  },

  /**
   * @returns {string}
   */
  getTitle: function() {
    return this._title;
  },

  /**
   * @param {string} title
   */
  setTitle: function(title) {
    this._title = title;
  },

  /**
   * @returns {string}
   */
  getUrl: function() {
    return this._url;
  },

  /**
   * @param {string} url
   */
  setUrl: function(url) {
    this._url = url;
  },

  /**
   * @returns {ArticleImage}
   */
  getImage: function() {
    return this._image;
  },

  /**
   * @param {ArticleImage} image
   */
  setImage: function(image) {
    this._image = image;
  }

});