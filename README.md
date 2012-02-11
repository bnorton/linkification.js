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
    mention_flag: "@",
    mention_target: "http://twitter.com/",
    exclude_mention_flag: true,
    tag_flag: "#",
    tag_target: "http://twitter.com/search?q=",
    exclude_tag_flag: true
  };
```

```javascript
  linkificate('@jack', { mention_target: 'http://plus.google.com/' });
  //=> @<a href='http://plus.google.com/jack'>jack</a>

  linkificate('@jack', { exclude_mention_flag: false });
  //=> <a href='http://twitter.com/jack'>@jack</a>
  
```