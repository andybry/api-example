plugins.FilterBoxKeyUp = Base.extend(AbstractPlugin, {

  _setup: function() {
    var $node = this._$node;
    $node.on('keyup', function() {
      var value = $node.val();
      eventHub.fire('filterBoxKeyUp', value);
    })
  }

});