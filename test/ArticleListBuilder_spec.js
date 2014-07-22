describe('ArticleListBuilder', function() {

  it('Constructs an array of articles from the JSON API response', function() {
    var responseObject = {
      articleMaps: [
        'article 1',
        'article 2',
        'article 3'
      ]
    };
    var article1 = {};
    var article2 = {};
    var article3 = {};
    var articleBuilder = {
      build: function() {}
    };
    spyOn(articleBuilder, 'build').andCallFake(function(article) {
      switch(article) {
        case 'article 1': return article1;
        case 'article 2': return article2;
        case 'article 3': return article3;
      }
    });
    var articleListBuilder = ArticleListBuilder.create();
    articleListBuilder.setArticleBuilder(articleBuilder);
    var articleList = articleListBuilder.build(responseObject);
    expect(articleList).toEqual([
      article1,
      article2,
      article3
    ]);
  });

});