describe('FilterBoxKeyUp', function() {

  it('fires a filterBoxKeyUp event whenever a key is release inside the element', function() {
    $('body').append('<input id="sandbox" value="asdf">');
    spyOn(eventHub, 'fire');
    $('#sandbox').FilterBoxKeyUp();
    $('#sandbox').trigger('keyup');
    expect(eventHub.fire).toHaveBeenCalledWith('filterBoxKeyUp', 'asdf');
    $('#sandbox').remove();
  });

});