/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements IEventHandler
 */
plugins.FilterOnFilterBoxKeyUp = Base.extend(AbstractPlugin, {

  _setup: function() {
    eventHub.register('filterBoxKeyUp', this);
  },

  /**
   * @param {string} searchTerm
   */
  handleEvent: function(searchTerm) {
    var $articles = this._$node.find('a');
    $articles.show();
    var $titles = this._$node.find('a span');
    $titles.each(function() {
      var $title = $(this);
      var titleText = $title.text();
      var matchesTitle = titleText.indexOf(searchTerm) > -1;
      if(!matchesTitle) {
        $title.parent().hide();
      };
    });
  }

});