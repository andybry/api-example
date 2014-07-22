describe('ArticleBuilder', function() {
  
  it('Constructs an article from the articleMap JSON object in the API', function() {
    var articleMap = {
      title: 'article title',
      url: 'article url',
      imageMap: 'image map'
    };
    var articleImage = {};
    var articleImageBuilder = {
      build: function() {}
    };
    spyOn(articleImageBuilder, 'build').andReturn(articleImage);
    var articleBuilder = ArticleBuilder.create();
    articleBuilder.setArticleImageBuilder(articleImageBuilder);
    var article = articleBuilder.build(articleMap);
    expect(article.getTitle()).toEqual('article title');
    expect(article.getUrl()).toEqual('article url');
    expect(article.getImage()).toEqual(articleImage);
  });
  
});