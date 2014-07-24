/**
 * When the categoryButtonClick event occurs it removes
 * all active classes from the node's buttons and then
 * adds the active class to the buttons whose data-category
 * attribute matches the type in the click event.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.SetActiveButtonOnCategoryButtonClick = Base.extend(AbstractPlugin, {

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
    var categorySelector = '[data-category=' + type + ']';
    var $activeButton = this._$node.find(categorySelector);
    var $allButtons = this._$node.find('button');
    $allButtons.removeClass('active');
    $activeButton.addClass('active');
  }

});