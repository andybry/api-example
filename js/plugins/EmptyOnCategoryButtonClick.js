/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.EmptyOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    this._$node.val('');
  }

});