describe("linkification", function(){
  var $link, matchers;

  describe("options", function(){
    it("should handle blank", function(){
      link = linkificate("");
      expect(link).toEqual("");
    });
    
    it("should handle null", function(){
      link = linkificate(null);
      expect(link).toEqual("");
    });
    
    it("should handle undefined", function(){
      link = linkificate();
      expect(link).toEqual("");
    });

    describe("#mentions", function(){
      beforeEach(function(){
        $link = $(linkificate("@nort"));
      });

      it("should return a link", function(){
        expect($link.get()[0].nodeName).toEqual("A");
      });

      it("should default to linking to the twitter user with the supplied text", function(){
        expect($link.attr('href')).toEqual("http://twitter.com/nort");
      });

      it("should target the link to a new window", function(){
        expect($link.attr('target')).toEqual("_blank");
      });

      it("should respect new mention_target endpoint", function(){
        $link = $(linkificate("@nort", {
          mention_target: "http://anything.will.do/"
        }));
        expect($link.attr('href')).toEqual("http://anything.will.do/nort");
      });
    });

    describe("#tag", function(){
      beforeEach(function(){
        $link = $(linkificate("#thingsthatprogrammersdo").replace('#', ''));
      });

      it("should return a link", function(){
        expect($link.get()[0].nodeName).toEqual("A");
      });

      it("should default to linking to the twitter user with the supplied text", function(){
        expect($link.attr('href')).toEqual("http://twitter.com/search?q=thingsthatprogrammersdo");
      });

      it("should target the link to a new window", function(){
        expect($link.attr('target')).toEqual("_blank");
      });

      it("should respect new mention_target endpoint", function(){
        $link = $(linkificate("#thingsthatprogrammersdo", {
          tag_target: "http://anything.will.do/search?query="
        }).replace('#', ''));
        expect($link.attr('href')).toEqual("http://anything.will.do/search?query=thingsthatprogrammersdo");
      });
    });
  });

  describe("#mentions", function(){
    beforeEach(function(){
      matchers = {
        a: {
          foo: "<a href=[^>]+>foo<\/a>",
          bar: "<a href=[^>]+>bar<\/a>"
        }
      };
    });

    describe("valid", function(){
      it("should return an unmodified string when there are no mentions", function() {
        expect(linkificate("foo")).toEqual("foo");
      });

      it("should convert a mention into a twitter link", function(){
        expect(linkificate("@foo")).toMatch(new RegExp("@" + matchers['a']['foo']));
      });

      it("should convert a mention into a twitter link including the @", function(){
        expect(linkificate("@foo", {exclude_mention: false})).toMatch(/^[^@].+?>@foo</i);
      });

      it("should not alter non-mention text", function(){
        expect(linkificate("before @foo after")).toMatch(new RegExp("before @" + matchers['a']['foo'] + " after"));
      });

      it("should convert multiple mentions", function(){
        expect(linkificate("@foo and @bar")).toMatch("@" + matchers['a']['foo'] + " and @" + matchers['a']['bar']);
      });

      it("should convert multiple mentions with no breaks between them", function(){
        expect(linkificate("@foo@bar")).toMatch("@" + matchers['a']['foo'] + "@" + matchers['a']['bar']);
      });
    });

    describe("invalid", function(){
      it("should not convert @s with no following characters", function() {
        expect(linkificate("@ foo")).toEqual("@ foo");
      });

      it("should not convert @s with invalid following characters", function() {
        expect(linkificate("@?-- foo")).toEqual("@?-- foo");
      });

      it("should not convert consecutive @s", function() {
        expect(linkificate("@@foo")).toMatch(new RegExp("@@" + matchers['a']['foo']));
      });
    });
  });

  describe("#hashtags", function(){
    beforeEach(function(){
      matchers = {
        a: {
          foo: "<a href=[^>]+>foo<\/a>",
          bar: "<a href=[^>]+>bar<\/a>"
        }
      };
    });

    describe("valid", function(){
      it("should add a link to a single hash tag", function(){
        expect(linkificate("#foo")).toMatch(new RegExp ('#' + matchers['a']['foo']));
      });
    });
  });
});
