describe('AjaxHandler', function() {

  it('handles the ajax response by firing an event containing the data', function() {
    var eventHub = {
      fire: function() {}
    };
    spyOn(eventHub, 'fire');
    var ajaxHandler = AjaxHandler.create('eventName');
    ajaxHandler.setEventHub(eventHub);
    ajaxHandler.handleAjaxResponse({
      data: 'this is my data'
    });
    expect(eventHub.fire).toHaveBeenCalledWith('eventName', {
      data: 'this is my data'
    })
  });
  
});