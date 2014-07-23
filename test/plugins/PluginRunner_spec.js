describe('PluginRunner', function() {

  it('runs named plugins against nodes that specify that plugin', function() {
    var testPlugins = {};
    var $nodeForPlugin1;
    var $nodeForPlugin2;
    var $nodeForPlugin3;
    var $nodeForPlugin4;
    testPlugins.Plugin1 = Base.extend(AbstractPlugin, {
      _init: function($node) {
        $nodeForPlugin1 = $node;
      }
    });
    testPlugins.Plugin2 = Base.extend(AbstractPlugin, {
      _init: function($node) {
        $nodeForPlugin2 = $node;
      }
    });
    testPlugins.Plugin3 = Base.extend(AbstractPlugin, {
      _init: function($node) {
        $nodeForPlugin3 = $node;
      }
    });
    testPlugins.Plugin4 = Base.extend(AbstractPlugin, {
      _init: function($node) {
        $nodeForPlugin4 = $node;
      }
    });
    $('body').append(
      '<div id="sandbox">' +
        '<div id="node1" data-plugin="Plugin1 Plugin3 Plugin4"></div>' +
        '<div id="node2" data-plugin="Plugin2"></div>' +
      '</div>'
    );
    var automaticPluginCreator = AutomaticPluginCreator.create();
    automaticPluginCreator.setNamespace(testPlugins);
    automaticPluginCreator.createPlugins();
    $('#sandbox').PluginRunner();
    expect($nodeForPlugin1.attr('id')).toEqual('node1');
    expect($nodeForPlugin2.attr('id')).toEqual('node2');
    expect($nodeForPlugin3.attr('id')).toEqual('node1');
    expect($nodeForPlugin4.attr('id')).toEqual('node1');
    $('#sandbox').remove();
    delete $.fn.Plugin1;
    delete $.fn.Plugin2;
  });

});