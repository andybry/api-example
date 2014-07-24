/**
 * When the ajax response is received, this plugin
 * builds an articleList out of the response and
 * raises ajaxResponseParsed event.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.BuildArticlesOnAjaxResponseReceived = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('ajaxResponseReceived', this);
    this._articleListBuilder = ArticleListBuilder.create();
  },

  /**
   * @param {ResponseObject} responseObject
   */
  handleEvent: function(responseObject) {
    var articleList = this._articleListBuilder.build(responseObject);
    eventHub.fire('ajaxResponseParsed', {articleList: articleList});
  }

});