/**
 * Constructs an ArticleImage from the imageMap object
 * that is contained within the API response.
 *
 * @class
 */
var ArticleImageBuilder = Base.extend({

  /**
   * @typedef {object} ImageMap
   * @property {string} imageUrl
   * @property {string} alttext
   */

  /**
   * @param {ImageMap} imageMap
   * @return {ArticleImage}
   */
  build: function(imageMap) {
    var articleImage = ArticleImage.create();
    articleImage.setImageUrl(imageMap.imageUrl);
    articleImage.setAltText(imageMap.alttext);
    return articleImage;
  }

});