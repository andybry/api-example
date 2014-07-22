/**
 *
 * This object decouples the source of a piece of data
 * from its processor.
 *
 * @namespace
 */
var eventHub = {

  /**
   * Registers a handler to respond to events.
   *
   * @param {string} event
   * @param {IEventHandler} eventHandler
   */
  register: function(event, eventHandler) {
    jQuery(document).on(event, function(event, data) {
      eventHandler.handleEvent(data);
    });
  },

  /**
   * Broadcasts an event to all registered event handlers, passing
   * on any data object that is the second argument.
   *
   * @param {string} event
   * @param {object} data
   */
  fire: function(event, data) {
    jQuery(document).trigger(event, data);
  }

};