describe('Ajax', function() {

  it('makes an ajax request and delegates the response to a handler', function() {
    var handler = {
      handleAjaxResponse: function() {}
    };
    spyOn(jQuery, 'ajax');
    var ajax = Ajax.create(handler);
    ajax.request('http://my/url');
    expect(jQuery.ajax).toHaveBeenCalledWith('http://my/url', {
      success: handler.handleAjaxResponse,
      context: handler
    });
  });

});