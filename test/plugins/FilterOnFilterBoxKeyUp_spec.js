describe('FilterOnFilterBoxKeyUp', function() {

  it('filters the content by title when a key is release in the filter box', function() {
    $('body').append(
      '<div id="sandbox">' +
        '<a id="article1" style="display: none;"><span>title same 1</span></a>' +
        '<a id="article2"><span>title different 2</span></a>' +
        '<a id="article3"><span>title same 3</span></a>' +
      '</div>'
    );
    $('#sandbox').FilterOnFilterBoxKeyUp();
    eventHub.fire('filterBoxKeyUp', 'le sa');
    expect($('#article1').is(':visible')).toBe(true);
    expect($('#article2').is(':visible')).toBe(false);
    expect($('#article3').is(':visible')).toBe(true);
    $('#sandbox').remove();
  });
  
});