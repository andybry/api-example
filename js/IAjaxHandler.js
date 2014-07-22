/**
 * Interface for Ajax response handlers.
 *
 * @interface
 */
var IAjaxHandler = Base.extend({

  /**
   * Handles the response from an Ajax request.
   * The data parameter is the response from jQuery.
   * Typically it would be an object converted from JSON.
   *
   * @param {object} data
   */
  handleAjaxResponse: function(data) {
    throw 'IAjaxHandler is abstract and its methods must be implemented';
  }

});