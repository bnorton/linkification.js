##Linkification.js
###linkificate (lynk - if - ah - kate): 
####1. To make into a link
####2. A js library for making said links out of internet nodes

- @mentions
- #hashtags

####Customize what node types links with take a user to

```javascript
  var text = "This is an #amazingcomment to an @amazinguser";

  var linkified = linkificate(text);

  $('.body').html($("<p>" + linkified + "</p>"));
```
produces

```html
  <div class='body'>
    <p> This is an <a href='http://twitter.com/search?q=amazingcontent'>#amazingcomment</a> 
    to an @<a href='http://twitter.com/amazinguser'>amazinguser</a> </p>
  </div>
```

###API
```javascript
  var default_options = {
    mention: "@",
    mention_target: "http://twitter.com/",
    exclude_mention: true,
    tag_target: "http://twitter.com/search?q=",
    exclude_tag: true,
    target: "_blank",
    force: false
  };
```

```javascript
  linkificate('@nort', { mention_target: 'http://plus.google.com/' });
  //=> @<a href='http://plus.google.com/nort'>nort</a>

  linkificate('@nort', { exclude_mention_flag: false });
  //=> <a href='http://twitter.com/nort'>@nort</a>
  
```