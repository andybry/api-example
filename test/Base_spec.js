describe('Base', function() {

  it('creates a class from a prototype with a parametrised factory method', function() {
    var MyNewClass = Base.extend({
      _init: function(message) {
        this._message = message;
        return this;
      },
      getMessage: function() {
        return this._message;
      }
    });
    var myInstance = MyNewClass.create('This is my message');
    expect(myInstance.getMessage()).toEqual('This is my message');
  });

  it('creates a subClass from a class which already exists', function() {
    var MyParentClass = Base.extend({
      _init: function(member) {
        this._member = member;
        return this;
      },
      parentMethod: function() {
        return 'this is the parent method';
      }
    });
    var MyChildClass = Base.extend(MyParentClass, {
      childMethod: function() {
        return 'This comes from the parent: ' + this._member;
      }
    });
    var instance = MyChildClass.create('the member variable');
    expect(instance.parentMethod()).toEqual('this is the parent method');
    expect(instance.childMethod()).toEqual('This comes from the parent: the member variable');
  });

  it('overrides parent methods in the child', function() {
    var MyParentClass = Base.extend({
      myMethod: function() {
        return 'parent'
      }
    });
    var MyChildClass = Base.extend({
      myMethod: function() {
        return 'child';
      }
    });
    var instance = MyChildClass.create();
    expect(instance.myMethod()).toEqual('child');
  });

});