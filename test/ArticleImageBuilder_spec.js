describe('ArticleImageBuilder', function() {

  it('Constructs an image from an image data object returned by the API', function() {
    var imageMap = {
      imageUrl: 'image url',
      alttext: 'image alt text'
    };
    var articleImageBuilder = ArticleImageBuilder.create();
    var articleImage = articleImageBuilder.build(imageMap);
    expect(articleImage.getImageUrl()).toEqual('image url');
    expect(articleImage.getAltText()).toEqual('image alt text');
  });

});