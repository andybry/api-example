describe('BuildArticlesOnAjaxResponseReceived', function() {

  it('builds articles and fires an ajaxResponseParsed even when the ajax response is received', function() {
    $('body').append('<div id="sandbox"></div>');
    var articleList = {};
    var articleListBuilder = {
      build: function() {}
    };
    spyOn(ArticleListBuilder, 'create').andReturn(articleListBuilder);
    spyOn(articleListBuilder, 'build').andReturn(articleList);
    spyOn(eventHub, 'fire').andCallThrough();
    $('#sandbox').BuildArticlesOnAjaxResponseReceived();
    eventHub.fire('ajaxResponseReceived', {});
    expect(eventHub.fire).toHaveBeenCalledWith(
      'ajaxResponseParsed', {
        articleList: articleList
      }
    );
    $('#sandbox').remove();
  });
  
});