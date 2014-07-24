describe('SendAjaxRequestOnCategoryButtonClick', function() {
  
  it('sends an ajax request when there is a click on a category button', function() {
    $('body').append('<div id="sandbox"></div>')
    var ajaxHandler = {};
    spyOn(AjaxHandler, 'create').andReturn(ajaxHandler);
    var ajax = {
      request: function() {}
    };
    spyOn(ajax, 'request');
    spyOn(Ajax, 'create').andReturn(ajax);
    $('#sandbox').SendAjaxRequestOnCategoryButtonClick();
    eventHub.fire('categoryButtonClick', 'news');
    expect(AjaxHandler.create).toHaveBeenCalledWith('ajaxResponseReceived');
    expect(ajax.request).toHaveBeenCalledWith(typeToHrefMap['news']);
    $('#sandbox').remove();
  });
  
});