/**
 * Populates a node once the ajax response
 * has been parsed.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.PopulateContentOnAjaxResponseParsed = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('ajaxResponseParsed', this);
  },

  /**
   * @typedef {object} ArticleListData
   * @property {Array.<Article>} articleList
   */

  /**
   * Renders each article and populates the
   * current node with the content.
   *
   * @param {ArticleListData} articleListData
   */
  handleEvent: function(articleListData) {
    var articleList = articleListData.articleList;
    var $node = this._$node;
    $node.empty();
    var self = this;
    articleList.map(function(article) {
      var renderedArticle = templates.articleListing(article);
      $node.append(renderedArticle);
    });
  }

});