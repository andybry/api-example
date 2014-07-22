/**
 * Handles Ajax Requests and passes the results on
 * to a handler
 *
 * @class
 */
var Ajax = Base.extend({

  /**
   *
   * @param {IAjaxHandler} handler
   * @returns {Ajax}
   * @private
   */
  _init: function(handler) {
    this._handler = handler;
    return this;
  },

  /**
   * Sends the AJAX request
   *
   * @param {string} url
   */
  request: function(url) {
    jQuery.ajax(url, {
      success: this._handler.handleAjaxResponse,
      context: this._handler
    });
  }

});