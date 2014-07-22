/**
 *
 * @interface
 */
var IEventHandler = Base.extend({

  /**
   * @abstract
   * @param {object} data
   */
  handleEvent: function(data) {
    throw 'IEventHandler is abstract and all its methods should be implemented';
  }

});