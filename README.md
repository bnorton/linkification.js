##Linkification.js

####A js library for adding links to internet nodes

- URL's
- @mentions
- #hashtags

####Customize what node types links with take a user to

```javascript
  var text = "This is an #amazingcomment to an @amazinguser telling him/her to visit some amazing link: bit.ly/gkd4Ka";

  var linkified = linkificate(text);

  document.write("<p>" + linkified + "</p>");

```
produces

```html
  This is an <a href='http://twitter.com/search?q=amazingcontent'>#amazingcomment</a> to an @<a href='http://twitter.com/amazinguser'>amazinguser</a> telling him/her to visit some amazing link: <a href='http://bit.ly/gkd4Ka'>bit.ly/gkd4Ka</a>
```
