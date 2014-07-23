/**
 * Namespace to contain plugins that will be automatically
 * added to jQuery when the document is ready.
 *
 * @namespace
 */
var plugins = plugins || {};

/**
 * Automatically create jQuery plugins from plugin
 * classes in a given namespace. Each of these
 * plugins should extend AbstractPlugin.
 *
 * @class
 */
var AutomaticPluginCreator = Base.extend({

  /**
   * Set the default pluginCreator and
   * default namespace.
   *
   * @returns {AutomaticPluginCreator}
   * @private
   */
  _init: function() {
    this._namespace = plugins;
    this._pluginCreator = PluginCreator.create();
    return this;
  },

  /**
   * Override the default namespace.
   *
   * @param namespace
   */
  setNamespace: function(namespace) {
    this._namespace = namespace;
  },

  /**
   * Override the default plugin creator.
   *
   * @param pluginCreator
   */
  setPluginCreator: function(pluginCreator) {
    this._pluginCreator = pluginCreator;
  },

  /**
   * Create a plugin for each class in the namespace.
   * The plugin will have the same name as the classes key
   * within the namespace.
   */
  createPlugins: function() {
    var pluginName;
    for(pluginName in this._namespace) {
      this._pluginCreator.createPlugin(pluginName, this._namespace[pluginName]);
    }
  }

});

/*
 * run the AutomaticPluginCreator when the document is ready
 * so the plugins are ready to use
 *
 */
$(document).ready(function() {
  var automaticPluginCreator = AutomaticPluginCreator.create();
  automaticPluginCreator.createPlugins();
});