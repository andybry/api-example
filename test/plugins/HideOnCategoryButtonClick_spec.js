describe('HideOnCategoryButtonClick', function() {

  it('Hides the element when a categoryButtonClick event is fired', function() {
    $('body').append(
      '<div id="sandbox"></div>'
    );
    $('#sandbox').HideOnCategoryButtonClick();
    eventHub.fire('categoryButtonClick', 'celebrity');
    expect($('#sandbox').hasClass('is-hidden')).toBe(true);
    $('#sandbox').remove();
  });

});