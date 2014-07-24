describe('SetActiveButtonOnCategoryButtonClick', function() {
  
  it('sets the active button when a category button is clicked', function() {
    $('body').append(
      '<div id="sandbox">' +
        '<button data-category="news"></button>' +
        '<button data-category="sport"></button>' +
        '<button data-category="tv" class="active"></button>' +
      '</div>'
    );
    $('#sandbox').SetActiveButtonOnCategoryButtonClick();
    eventHub.fire('categoryButtonClick', 'sport');
    expect($('#sandbox [data-category="sport"]').hasClass('active')).toBe(true);
    expect($('#sandbox [data-category="tv"]').hasClass('active')).toBe(false);
    $('#sandbox').remove();
  });
  
});