describe('EmptyOnCategoryButtonClick', function() {

  it('empties the node when a category button is clicked', function() {
    $('body').append('<input id="sandbox" value="arb">');
    $('#sandbox').EmptyOnCategoryButtonClick();
    eventHub.fire('categoryButtonClick', 'news');
    expect($('#sandbox').val()).toEqual('');
    $('#sandbox').remove();
  });

});