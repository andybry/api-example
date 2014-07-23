/**
 * Fires categoryButtonClick events when a category button
 * is clicked. These events contain one piece of data:
 * the category that was clicked.
 *
 * Each button must have a 'data-category' attribute,
 * whose value is the name of the category being clicked.
 *
 * @class
 */
plugins.CategoryButtons = Base.extend(AbstractPlugin, {

  /**
   * Attaches the on click handler to each of the category
   * buttons in the HTML element.
   *
   * @private
   */
  _setup: function() {
    var $buttons = this._$node.find('button[data-category]');
    $buttons.on('click', function() {
      var $button = $(this);
      var category = $button.data('category');
      eventHub.fire('categoryButtonClick', category);
    });
  }

});