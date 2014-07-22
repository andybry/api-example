describe('eventHub', function() {
  
  it('broadcasts events to handlers that have registered for a given event', function() {
    var myEventHandler = {
      handleEvent: function() {}
    };
    spyOn(myEventHandler, 'handleEvent');
    eventHub.register('myEvent', myEventHandler);
    eventHub.fire('myEvent', {
      data: 'this is my data'
    });
    expect(myEventHandler.handleEvent).toHaveBeenCalledWith({
      data: 'this is my data'
    });
  });
  
});