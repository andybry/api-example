/**
 * Data class representing an image object associated
 * within an article.
 *
 * @class
 */
var ArticleImage = Base.extend({

  /**
   * sets default data
   *
   * @private
   * @return {ArticleImage}
   */
  _init: function() {
    this._imageUrl = '';
    this._altText = '';
    return this;
  },

  /**
   * @param {string} url
   */
  setImageUrl: function(url) {
    this._imageUrl = url;
  },

  /**
   * @returns {string}
   */
  getImageUrl: function() {
    return this._imageUrl;
  },

  /**
   * @param {string} text
   */
  setAltText: function(text) {
    this._altText = text;
  },

  /**
   * @returns {string}
   */
  getAltText: function() {
    return this._altText;
  }

});