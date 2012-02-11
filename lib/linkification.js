window.linkificate = function(text, options) {

  var defaultOptions = {
    mention: "@",
    mention_target: "http://twitter.com/",
    exclude_mention: true,
    tag: "#",
    tag_target: "http://twitter.com/search?q=",
    exclude_tag: true,
    target: "_blank",
    force: false
  };

  options = $.extend(defaultOptions, (options || {}));

  if(!text || text.length == 0) {
    if (options.force) 
      return "<a></a>";
    return "";
  }

  var process = function (txt, type, opts) {
    var stage = [];

    if(opts['exclude_' + type]) { 
      stage.push(opts[type]); 
      txt = txt.replace(opts[type], ""); 
    }
    stage.push("<a href='", opts[type + '_target'], txt.replace(opts[type], ""));
    stage.push("' target='", opts.target, "'>");
    stage.push(txt, "</a>");

    return stage.join("");
  }

  /**
    * Perform the Linkification of @mentions. Link to
    *   the specified endpoint by replacing all matching
    *   @mentions in the input `text`.
    */
  var content = text.replace(/(^|)@(\w+)/gi, function(txt){
    return process(txt, 'mention', options);
  });

  /**
    * Perform the Linkification of #hashtags. Link to
    *   the specified endpoint by replacing all matching
    *   #hashtags in the input `text`.
    */
  content = content.replace(/(^|)#(\w+)/gi, function(txt){
    return process(txt, 'tag', options);
  });

  return content;
};
