/**
 * Represents an abstract jQuery plugin.
 *
 * This follows the pattern of the basic boilerplate,
 * without options:
 *
 * https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 *
 * Subclasses should implement _setup in order
 * to implement the plugin functionality.
 *
 * @class
 */
var AbstractPlugin = Base.extend({

  /**
   * @param {jQuery} $node
   * @returns {AbstractPlugin}
   * @private
   */
  _init: function($node) {
    this._$node = $node;
    this._setup();
    return this;
  },

  _setup: function() {
    throw 'AbstractPlugin is abstract so abstract methods must be implemented in subclasses';
  }

});