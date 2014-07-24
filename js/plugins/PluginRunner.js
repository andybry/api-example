/**
 * jQuery plugin to run other plugins against a DOM node.
 *
 * To run the plugin against the node add the data attribute 'data-plugin'
 * with value set to the name of the plugin class.
 *
 * For example
 *
 * <div data-plugin="MyPluginClass">
 *   ...content...
 * </div>
 *
 * Multiple space separated plugins can be used
 *
 * For example
 *
 * <div data-plugin="MyPlugin1 MyPlugin2 MyPlugin3">
 *   ...content...
 * </div>
 *
 * @class
 * @augments AbstractPlugin
 *
 */
plugins.PluginRunner = Base.extend(AbstractPlugin, {

  /**
   * Find all nodes within our element that have specified a plugin to run
   * against themselves and run the plugin.
   *
   * @private
   */
  _setup: function() {
    var $nodesWithPlugins = this._$node.find('[data-plugin]');
    $nodesWithPlugins.each(function() {
      var $nodeWithPlugin = $(this);
      var pluginClassesString = $nodeWithPlugin.data('plugin');
      var pluginClasses = pluginClassesString.split(' ');
      _.each(pluginClasses, function(pluginClass) {
        try {
          $nodeWithPlugin[pluginClass]();
        } catch(exception) {
          console.log(
          'No such plugin: ' + pluginClass +
          ' when running plugins for',
          $nodeWithPlugin[0]
          );
        }
      });
    });
  }

});

/*
 * Run the plugin against the body when the document is first ready.
 * It may need to be rerun if the content of the DOM changes.
 */
$(document).ready(function() {
  $('html').PluginRunner();
});
