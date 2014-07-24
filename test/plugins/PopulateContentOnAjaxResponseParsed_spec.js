describe('PopulateContentOnAjaxResponseParsed', function() {

  it('Populates the node with the rendered content when the ajax response is parsed', function() {
    $('body').append('<div id="sandbox">oldContent</div>');
    var article1 = {};
    var article2 = {};
    var article3 = {};
    var articleList = [article1, article2, article3];
    spyOn(templates, 'articleListing').andCallFake(function(article) {
      if(article === article1) {
        return 'a1';
      } else if(article === article2) {
        return 'a2';
      } else if(article === article3) {
        return 'a3';
      }
    });
    $('#sandbox').PopulateContentOnAjaxResponseParsed();
    eventHub.fire('ajaxResponseParsed', {
      articleList: articleList
    });
    expect($('#sandbox').text()).toEqual('a1a2a3');
    $('#sandbox').remove();
  });

});