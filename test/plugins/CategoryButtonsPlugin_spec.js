describe('CategoryButtons', function() {

  it('attaches a clickhandler which fires a categoryButton event', function() {
    $('body').append(
        '<div id="sandbox">' +
          '<button class="news" data-category="news">News</button>' +
        '</div>'
    );
    spyOn(eventHub, 'fire');
    $('#sandbox').CategoryButtons();
    $('#sandbox .news').click();
    expect(eventHub.fire).toHaveBeenCalledWith('categoryButton', 'news');
    $('#sandbox').remove();
  });

});