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

  /**
    * Perform the Linkification of @mentions. Link to
    *   the specified endpoint by replacing all matching
    *   @mentions in the input `text`.
    */
  var content = text.replace(/(^|)@(\w+)/gi, function (txt) {
    var mention = [];

    if(options.exclude_mention) { 
      mention.push(options.mention); 
      txt = txt.replace(options.mention, ""); 
    }
    mention.push("<a href='", options.mention_target, txt.replace(options.mention, ""));
    mention.push("' target='", options.target, "'>");
    mention.push(txt, "</a>");

    return mention.join("");
  });

  /**
    * Perform the Linkification of #hashtags. Link to
    *   the specified endpoint by replacing all matching
    *   #hashtags in the input `text`.
    */
  content = content.replace(/(^|)#(\w+)/gi, function (txt) {
    var tag = [];

    if(options.exclude_tag) { 
      tag.push(options.tag); 
      txt = txt.replace(options.tag, ""); 
    }
    tag.push("<a href='", options.tag_target, txt.replace(options.tag, ""));
    tag.push("' target='", options.target, "'>");
    tag.push(txt, "</a>");

    return tag.join("");
  });

  return content;
};
