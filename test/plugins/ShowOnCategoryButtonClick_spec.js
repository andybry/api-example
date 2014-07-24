describe('ShowOnCategoryButtonClick', function() {

  it('Shows the element when a categoryButtonClick event is fired', function() {
    $('body').append(
      '<div id="sandbox" class="is-hidden"></div>'
    );
    $('#sandbox').ShowOnCategoryButtonClick();
    eventHub.fire('categoryButtonClick', 'celebrity');
    expect($('#sandbox').hasClass('is-hidden')).toBe(false);
    $('#sandbox').remove();
  });
  
});