/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.SendAjaxRequestOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
    var ajaxHandler = AjaxHandler.create('ajaxResponseReceived');
    this._ajax = Ajax.create(ajaxHandler);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    var ajaxUrl = typeToHrefMap[type];
    this._ajax.request(ajaxUrl);
  }

});