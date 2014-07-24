/**
 * Creates classes that have a create
 * factory method instead of a constructor.
 *
 * To create classes with this class use the
 * extend() method.
 *
 * The first argument is the parent prototype of the class
 * being created (i.e. the object returned by this
 * method will have this as its prototype).
 * Any other arguments supplied will have their enumerable
 * members mixed into the class created in the order
 * they are supplied in. Thus later mixin methods
 * will override those that come first.
 *
 * If no mixins are supplied then the prototype itself
 * forms the new class to avoid having an unnecessary
 * step in the prototype chain.
 *
 * NB: Mixins are only mixed into the class
 *     when objects are created. Subsequent
 *     changes to the mixins are not reflected in
 *     the created class.
 *
 *
 * @class
 */
var Base = {

  /**
   * @public
   * @param {...object} arguments
   * @returns Base
   */
  create: function() {
    var instance = Object.create(this);
    return this._init.apply(instance, arguments);
  },

  /**
   * @private
   */
  _init: function() {
    return this;
  },

  /**
   * @public
   * @param {object} prototype
   * @param {...object} [mixins]
   * @return *
   */
  extend: function(prototype, mixins) {
    var mixins = _.toArray(arguments).slice(1);
    var newClass = mixins.length > 0 ? Object.create(prototype) : prototype;
    mixins.unshift(newClass);
    _.extend.apply(_, mixins);
    return _.defaults(newClass, this);
  }

};
/**
 *
 * This object decouples the source of a piece of data
 * from its processor.
 *
 * @namespace
 */
var eventHub = {

  /**
   * Registers a handler to respond to events.
   *
   * @param {string} event
   * @param {IEventHandler} eventHandler
   */
  register: function(event, eventHandler) {
    jQuery(document).on(event, function(event, data) {
      eventHandler.handleEvent(data);
    });
  },

  /**
   * Broadcasts an event to all registered event handlers, passing
   * on any data object that is the second argument.
   *
   * @param {string} event
   * @param {object} data
   */
  fire: function(event, data) {
    jQuery(document).trigger(event, data);
  }

};
/**
 * Interface for Ajax response handlers.
 *
 * @interface
 */
var IAjaxHandler = Base.extend({

  /**
   * Handles the response from an Ajax request.
   * The data parameter is the response from jQuery.
   * Typically it would be an object converted from JSON.
   *
   * @abstract
   * @param {object} data
   */
  handleAjaxResponse: function(data) {
    throw 'IAjaxHandler is abstract and its methods must be implemented';
  }

});
/**
 * Represents an abstract jQuery plugin.
 *
 * This follows the pattern of the basic boilerplate,
 * without options:
 *
 * https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 *
 * Subclasses should implement _setup in order
 * to implement the plugin functionality.
 *
 * @class
 */
var AbstractPlugin = Base.extend({

  /**
   * @param {jQuery} $node
   * @returns {AbstractPlugin}
   * @private
   */
  _init: function($node) {
    this._$node = $node;
    this._setup();
    return this;
  },

  _setup: function() {
    throw 'AbstractPlugin is abstract so abstract methods must be implemented in subclasses';
  }

});
/**
 * Handles Ajax Requests and passes the results on
 * to a handler
 *
 * @class
 */
var Ajax = Base.extend({

  /**
   *
   * @param {IAjaxHandler} handler
   * @returns {Ajax}
   * @private
   */
  _init: function(handler) {
    this._handler = handler;
    return this;
  },

  /**
   * Sends the AJAX request
   *
   * @param {string} url
   */
  request: function(url) {
    jQuery.ajax(url, {
      success: this._handler.handleAjaxResponse,
      context: this._handler
    });
  }

});
/**
 * Delegates handling the response to any events
 * registered with a given name.
 *
 * @class
 * @implements IAjaxHandler
 */
var AjaxHandler = Base.extend(IAjaxHandler, {

  /**
   * Sets the event name and default eventHub.
   *
   * @private
   * @return AjaxHandler
   */
  _init: function(event) {
     this._eventHub = window.eventHub;
     this._event = event;
     return this;
  },

  /**
   * Allows the eventHub to be overridden.
   *
   * @param {eventHub} eventHub
   */
  setEventHub: function(eventHub) {
    this._eventHub = eventHub;
  },

  /**
   * Delegate the handling of the response to any
   * registered events.
   *
   * @param {object} data
   */
  handleAjaxResponse: function(data) {
    this._eventHub.fire(this._event, data);
  }

});
/**
 * Data class representing an article.
 *
 * @class
 */
var Article = Base.extend({

  /**
   * sets default data
   *
   * @returns {Article}
   * @private
   */
  _init: function() {
    this._title = '';
    this._url = '';
    this._image = ArticleImage.create();
    return this;
  },

  /**
   * @returns {string}
   */
  getTitle: function() {
    return this._title;
  },

  /**
   * @param {string} title
   */
  setTitle: function(title) {
    this._title = title;
  },

  /**
   * @returns {string}
   */
  getUrl: function() {
    return this._url;
  },

  /**
   * @param {string} url
   */
  setUrl: function(url) {
    this._url = url;
  },

  /**
   * @returns {ArticleImage}
   */
  getImage: function() {
    return this._image;
  },

  /**
   * @param {ArticleImage} image
   */
  setImage: function(image) {
    this._image = image;
  }

});
/**
 * Constructs an article object
 * @type {*}
 */
var ArticleBuilder = Base.extend({

  /**
   * Set default article image builder
   *
   * @param articleMap
   * @returns {ArticleBuilder}
   * @private
   */
  _init: function(articleMap) {
    this._articleImageBuilder = ArticleImageBuilder.create();
    return this;
  },

  /**
   * Override the articleImageBuilder
   *
   * @param {ArticleImageBuilder} articleImageBuilder
   */
  setArticleImageBuilder: function(articleImageBuilder) {
    this._articleImageBuilder = articleImageBuilder;
  },

  /**
   * Representation of the JSON API response
   * articleMap object
   *
   * @typedef {object} ArticleMap
   * @property {string} title
   * @property {string} url
   * @property {ImageMap} imageMap
   */

  /**
   * @param {ArticleMap} articleMap
   */
  build: function(articleMap) {
    var article = Article.create();
    article.setTitle(articleMap.title);
    article.setUrl(articleMap.url);
    var articleImage = this._articleImageBuilder.build(articleMap.imageMap);
    article.setImage(articleImage);
    return article;
  }

});
/**
 * Data class representing an image object associated
 * within an article.
 *
 * @class
 */
var ArticleImage = Base.extend({

  /**
   * sets default data
   *
   * @private
   * @return {ArticleImage}
   */
  _init: function() {
    this._imageUrl = '';
    this._altText = '';
    return this;
  },

  /**
   * @param {string} url
   */
  setImageUrl: function(url) {
    this._imageUrl = url;
  },

  /**
   * @returns {string}
   */
  getImageUrl: function() {
    return this._imageUrl;
  },

  /**
   * @param {string} text
   */
  setAltText: function(text) {
    this._altText = text;
  },

  /**
   * @returns {string}
   */
  getAltText: function() {
    return this._altText;
  }

});
/**
 * Constructs an ArticleImage from the imageMap object
 * that is contained within the API response.
 *
 * @class
 */
var ArticleImageBuilder = Base.extend({

  /**
   * @typedef {object} ImageMap
   * @property {string} imageUrl
   * @property {string} alttext
   */

  /**
   * @param {ImageMap} imageMap
   * @return {ArticleImage}
   */
  build: function(imageMap) {
    var articleImage = ArticleImage.create();
    articleImage.setImageUrl(imageMap.imageUrl);
    articleImage.setAltText(imageMap.alttext);
    return articleImage;
  }

});
/**
 * Constructs an array of Articles from the JSON
 * response object
 *
 * @class
 */
var ArticleListBuilder = Base.extend({

  /**
   * Set the default articleBuilder
   *
   * @returns {ArticleListBuilder}
   * @private
   */
  _init: function() {
    this._articleBuilder = ArticleBuilder.create();
    return this;
  },

  /**
   * Override the articleBuilder
   * @param {ArticleBuilder} articleBuilder
   */
  setArticleBuilder: function(articleBuilder) {
    this._articleBuilder = articleBuilder;
  },

  /**
   * @typedef {object} ResponseObject
   * @property {Array.<ArticleMap>} articleMaps
   */

  /**
   * Build an array of article Objects
   * @param {ResponseObject} responseObject
   * @returns {Array.<Article>}
   *
   */
  build: function(responseObject) {
    var articleBuilder = this._articleBuilder;
    return responseObject.articleMaps.map(function(articleMap) {
      return articleBuilder.build(articleMap);
    });
  }

});
/**
 * Namespace to contain plugins that will be automatically
 * added to jQuery when the document is ready.
 *
 * @namespace
 */
var plugins = plugins || {};

/**
 * Automatically create jQuery plugins from plugin
 * classes in a given namespace. Each of these
 * plugins should extend AbstractPlugin.
 *
 * @class
 */
var AutomaticPluginCreator = Base.extend({

  /**
   * Set the default pluginCreator and
   * default namespace.
   *
   * @returns {AutomaticPluginCreator}
   * @private
   */
  _init: function() {
    this._namespace = plugins;
    this._pluginCreator = PluginCreator.create();
    return this;
  },

  /**
   * Override the default namespace.
   *
   * @param namespace
   */
  setNamespace: function(namespace) {
    this._namespace = namespace;
  },

  /**
   * Override the default plugin creator.
   *
   * @param pluginCreator
   */
  setPluginCreator: function(pluginCreator) {
    this._pluginCreator = pluginCreator;
  },

  /**
   * Create a plugin for each class in the namespace.
   * The plugin will have the same name as the classes key
   * within the namespace.
   */
  createPlugins: function() {
    var pluginName;
    for(pluginName in this._namespace) {
      this._pluginCreator.createPlugin(pluginName, this._namespace[pluginName]);
    }
  }

});

/*
 * run the AutomaticPluginCreator when the document is ready
 * so the plugins are ready to use
 *
 */
$(document).ready(function() {
  var automaticPluginCreator = AutomaticPluginCreator.create();
  automaticPluginCreator.createPlugins();
});
/**
 *
 * @interface
 */
var IEventHandler = Base.extend({

  /**
   * @abstract
   * @param {object} data
   */
  handleEvent: function(data) {
    throw 'IEventHandler is abstract and all its methods should be implemented';
  }

});
/**
 * Creates jQuery plugins from Plugin classes.
 * Plugin classes are subclasses of AbstractPlugin.
 *
 * The technique for creating plugins is adapted from the pattern
 * found here:
 *
 * https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
 *
 * @class
 */
var PluginCreator = Base.extend({

  /**
   * Create a jQuery plugin that can only be instantiated once
   *
   * @param {string} name
   * @param {AbstractPlugin} pluginClass
   */
  createPlugin: function(name, pluginClass) {
    $.fn[name] = function () {
      return this.each(function () {
        var $node = $(this);
        var nameForDataAttr = 'plugin_' + name;
        var isPluginInitialised =  $node.data(nameForDataAttr);
        if (!isPluginInitialised) {
          $node.data(nameForDataAttr, pluginClass.create($node));
        }
      });
    };
  }

});
/**
 * A namespace for template functions.
 *
 * @namespace
 */
var templates = {};
/**
 * Data map giving the category type to href
 */
var typeToHrefMap = {
  news: 'http://api.mirror.co.uk/news/81894',
  sport: 'http://api.mirror.co.uk/sport/81894',
  celebrity: 'http://api.mirror.co.uk/3am/81894',
  tv: 'http://api.mirror.co.uk/tv/81894'
};
/**
 * When the ajax response is received, this plugin
 * builds an articleList out of the response and
 * raises ajaxResponseParsed event.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.BuildArticlesOnAjaxResponseReceived = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('ajaxResponseReceived', this);
    this._articleListBuilder = ArticleListBuilder.create();
  },

  /**
   * @param {ResponseObject} responseObject
   */
  handleEvent: function(responseObject) {
    var articleList = this._articleListBuilder.build(responseObject);
    eventHub.fire('ajaxResponseParsed', {articleList: articleList});
  }

});
/**
 * Fires categoryButtonClick events when a category button
 * is clicked. These events contain one piece of data:
 * the category that was clicked.
 *
 * Each button must have a 'data-category' attribute,
 * whose value is the name of the category being clicked.
 *
 * @class
 * @augments AbstractPlugin
 */
plugins.CategoryButtons = Base.extend(AbstractPlugin, {

  /**
   * Attaches the on click handler to each of the category
   * buttons in the HTML element.
   *
   * @private
   */
  _setup: function() {
    var $buttons = this._$node.find('button[data-category]');
    $buttons.on('click', function() {
      var $button = $(this);
      var category = $button.data('category');
      eventHub.fire('categoryButtonClick', category);
    });
  }

});
/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.EmptyOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    this._$node.val('');
  }

});
plugins.FilterBoxKeyUp = Base.extend(AbstractPlugin, {

  _setup: function() {
    var $node = this._$node;
    $node.on('keyup', function() {
      var value = $node.val();
      eventHub.fire('filterBoxKeyUp', value);
    })
  }

});
/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements IEventHandler
 */
plugins.FilterOnFilterBoxKeyUp = Base.extend(AbstractPlugin, {

  _setup: function() {
    eventHub.register('filterBoxKeyUp', this);
  },

  /**
   * @param {string} searchTerm
   */
  handleEvent: function(searchTerm) {
    var $articles = this._$node.find('a');
    $articles.show();
    var $titles = this._$node.find('a span');
    $titles.each(function() {
      var $title = $(this);
      var titleText = $title.text();
      var matchesTitle = titleText.indexOf(searchTerm) > -1;
      if(!matchesTitle) {
        $title.parent().hide();
      };
    });
  }

});
/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.HideOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    this._$node.addClass('is-hidden');
  }

});
/**
 * jQuery plugin to run other plugins against a DOM node.
 *
 * To run the plugin against the node add the data attribute 'data-plugin'
 * with value set to the name of the plugin class.
 *
 * For example
 *
 * <div data-plugin="MyPluginClass">
 *   ...content...
 * </div>
 *
 * Multiple space separated plugins can be used
 *
 * For example
 *
 * <div data-plugin="MyPlugin1 MyPlugin2 MyPlugin3">
 *   ...content...
 * </div>
 *
 * @class
 * @augments AbstractPlugin
 *
 */
plugins.PluginRunner = Base.extend(AbstractPlugin, {

  /**
   * Find all nodes within our element that have specified a plugin to run
   * against themselves and run the plugin.
   *
   * @private
   */
  _setup: function() {
    var $nodesWithPlugins = this._$node.find('[data-plugin]');
    $nodesWithPlugins.each(function() {
      var $nodeWithPlugin = $(this);
      var pluginClassesString = $nodeWithPlugin.data('plugin');
      var pluginClasses = pluginClassesString.split(' ');
      _.each(pluginClasses, function(pluginClass) {
        try {
          $nodeWithPlugin[pluginClass]();
        } catch(exception) {
          console.log(
          'No such plugin: ' + pluginClass +
          ' when running plugins for',
          $nodeWithPlugin[0]
          );
        }
      });
    });
  }

});

/*
 * Run the plugin against the body when the document is first ready.
 * It may need to be rerun if the content of the DOM changes.
 */
$(document).ready(function() {
  $('html').PluginRunner();
});

/**
 * Populates a node once the ajax response
 * has been parsed.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.PopulateContentOnAjaxResponseParsed = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('ajaxResponseParsed', this);
  },

  /**
   * @typedef {object} ArticleListData
   * @property {Array.<Article>} articleList
   */

  /**
   * Renders each article and populates the
   * current node with the content.
   *
   * @param {ArticleListData} articleListData
   */
  handleEvent: function(articleListData) {
    var articleList = articleListData.articleList;
    var $node = this._$node;
    $node.empty();
    var self = this;
    articleList.map(function(article) {
      var renderedArticle = templates.articleListing(article);
      $node.append(renderedArticle);
    });
  }

});
/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.SendAjaxRequestOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
    var ajaxHandler = AjaxHandler.create('ajaxResponseReceived');
    this._ajax = Ajax.create(ajaxHandler);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    var ajaxUrl = typeToHrefMap[type];
    this._ajax.request(ajaxUrl);
  }

});
/**
 * When the categoryButtonClick event occurs it removes
 * all active classes from the node's buttons and then
 * adds the active class to the buttons whose data-category
 * attribute matches the type in the click event.
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.SetActiveButtonOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    var categorySelector = '[data-category=' + type + ']';
    var $activeButton = this._$node.find(categorySelector);
    var $allButtons = this._$node.find('button');
    $allButtons.removeClass('active');
    $activeButton.addClass('active');
  }

});
/**
 *
 * @class
 * @augments AbstractPlugin
 * @implements  IEventHandler
 */
plugins.ShowOnCategoryButtonClick = Base.extend(AbstractPlugin, {

  /**
   * register the event handler
   *
   * @private
   */
  _setup: function() {
    eventHub.register('categoryButtonClick', this);
  },

  /**
   * @param {string} type
   */
  handleEvent: function(type) {
    this._$node.removeClass('is-hidden');
  }

});
/**
 *
 * @param {Article} article
 */
templates.articleListing = function(article) {
  var url = article.getUrl();
  var title = article.getTitle();
  var image = article.getImage();
  var imageSrc = image.getImageUrl();

  return '<a class="resulting-article" href="' + url + '">' +
    '<img class="resulting-article__image" src="' + imageSrc + '" alt="">' +
    '<span class="resulting-article__title">' + title + '</span>' +
  '</a>';
};