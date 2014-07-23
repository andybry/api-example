describe('AbstractPlugin', function() {

  it('saves the $node and calls the _setup method in child classes', function() {
    var TestPlugin = Base.extend(AbstractPlugin, {
      _setup: function() {}
    });
    var $node = {};
    spyOn(TestPlugin, '_setup');
    var testPlugin = TestPlugin.create($node);
    expect(TestPlugin._setup).toHaveBeenCalledWith();
    expect(testPlugin._$node).toBe($node);
  });

});