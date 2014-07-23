/**
 * Creates jQuery plugins from Plugin classes.
 * Plugin classes are subclasses of AbstractPlugin.
 *
 * The technique for creating plugins is adapted from the pattern
 * found here:
 *
 * https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 *
 * @class
 */
var PluginCreator = Base.extend({

  /**
   * Create a jQuery plugin that can only be instantiated once
   *
   * @param {string} name
   * @param {AbstractPlugin} pluginClass
   */
  createPlugin: function(name, pluginClass) {
    $.fn[name] = function () {
      return this.each(function () {
        var $node = $(this);
        var nameForDataAttr = 'plugin_' + name;
        var isPluginInitialised =  $node.data(nameForDataAttr);
        if (!isPluginInitialised) {
          $node.data(nameForDataAttr, pluginClass.create($node));
        }
      });
    };
  }

});