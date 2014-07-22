//= require bower_components/underscore/underscore

/**
 * Creates classes that have a create
 * factory method instead of a constructor.
 *
 * To create classes with this class use the
 * extend() method.
 *
 * The first argument is the parent prototype of the class
 * being created (i.e. the object returned by this
 * method will have this as its prototype).
 * Any other arguments supplied will have their enumerable
 * members mixed into the class created in the order
 * they are supplied in. Thus later mixin methods
 * will override those that come first.
 *
 * If no mixins are supplied then the prototype itself
 * forms the new class to avoid having an unnecessary
 * step in the prototype chain.
 *
 * NB: Mixins are only mixed into the class
 *     when objects are created. Subsequent
 *     changes to the mixins are not reflected in
 *     the created class.
 *
 *
 * @class
 */
var Base = {

  /**
   * @public
   * @param {...object} arguments
   * @returns Base
   */
  create: function() {
    var instance = Object.create(this);
    return this._init.apply(instance, arguments);
  },

  /**
   * @private
   */
  _init: function() {
    return this;
  },

  /**
   * @public
   * @param {object} prototype
   * @param {...object} [mixins]
   * @return *
   */
  extend: function(prototype, mixins) {
    var mixins = _.toArray(arguments).slice(1);
    var newClass = mixins.length > 0 ? Object.create(prototype) : prototype;
    mixins.unshift(newClass);
    _.extend.apply(_, mixins);
    return _.defaults(newClass, this);
  }

};