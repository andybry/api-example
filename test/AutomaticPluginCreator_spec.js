describe('AutomaticPluginCreator', function() {
  
  it('automatically creates jQuery classes from all objects in a given namespace', function() {
    var pluginCreator = {
      createPlugin: function(name, pluginClass) {}
    };
    spyOn(pluginCreator, 'createPlugin');
    var namespace = {
      Plugin1: {},
      Plugin2: {},
      Plugin3: {}
    };
    var automaticPluginCreator = AutomaticPluginCreator.create();
    automaticPluginCreator.setNamespace(namespace);
    automaticPluginCreator.setPluginCreator(pluginCreator);
    automaticPluginCreator.createPlugins();
    expect(pluginCreator.createPlugin).toHaveBeenCalledWith('Plugin1', namespace.Plugin1);
    expect(pluginCreator.createPlugin).toHaveBeenCalledWith('Plugin1', namespace.Plugin2);
    expect(pluginCreator.createPlugin).toHaveBeenCalledWith('Plugin1', namespace.Plugin3);
  });
  
});