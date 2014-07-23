describe('PluginCreator', function() {
  
  it('creates jQuery plugins from Plugin Classes which are only instantiated once per node', function() {
    var pluginCallCount = 0;
    var TestPlugin = {
      create: function($node) {
        pluginCallCount++;
        return this;
      }
    };
    var $sandbox = $('body').append(
      '<div id="sandbox"></div>'
    );
    var pluginCreator = PluginCreator.create();
    pluginCreator.createPlugin('myPlugin', TestPlugin);
    $('#sandbox').myPlugin();
    $('#sandbox').myPlugin();
    expect(pluginCallCount).toBe(1);
    $('#sandbox').remove();
    delete $.fn.myPlugin;
  });
  
});