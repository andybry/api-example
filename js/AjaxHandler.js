/**
 * Delegates handling the response to any events
 * registered with a given name.
 *
 * @class
 * @implements IAjaxHandler
 */
var AjaxHandler = Base.extend(IAjaxHandler, {

  /**
   * Sets the event name and default eventHub.
   *
   * @private
   * @return AjaxHandler
   */
  _init: function(event) {
     this._eventHub = window.eventHub;
     this._event = event;
     return this;
  },

  /**
   * Allows the eventHub to be overridden.
   *
   * @param {eventHub} eventHub
   */
  setEventHub: function(eventHub) {
    this._eventHub = eventHub;
  },

  /**
   * Delegate the handling of the response to any
   * registered events.
   *
   * @param {object} data
   */
  handleAjaxResponse: function(data) {
    this._eventHub.fire(this._event, data);
  }

});