/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.ShowOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  handleEvent: function(type) {
    this._$node.removeClass('is-hidden');
  }

});