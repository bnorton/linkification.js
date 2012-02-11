describe("linkification", function(){
  var $link, a_matcher;

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

    it("should return a link", function(){
      $link = $(linkificate("@nort"));
      expect($link.get()[0].nodeName).toEqual("A");
    });

    it("should default to linking to the twitter user with the supplied text", function(){
      $link = $(linkificate("@nort"));
      expect($link.attr('href')).toEqual("http://twitter.com/nort");
    });

    it("should respect new mention_target endpoint", function(){
      $link = $(linkificate("@nort", {
        mention_target: "http://anything.will.do/"
      }));
      expect($link.attr('href')).toEqual("http://anything.will.do/nort");
    });

    it("should target the link to a new window", function(){
      $link = $(linkificate("@nort"));
      expect($link.attr('target')).toEqual("_blank");
    });
  });

  describe("#mentions", function(){
    beforeEach(function(){
      a_matcher = "<a href=[^>]+>foo<\/a>";
    });

    describe("valid", function(){
      it("should return an unmodified string when there are no mentions", function() {
        expect(linkificate("foo")).toEqual("foo");
      });

      it("should convert a mention into a twitter link", function(){
        expect(linkificate("@foo")).toMatch(new RegExp("@" + a_matcher));
      });

      it("should convert a mention into a twitter link including the @", function(){
        expect(linkificate("@foo", {exclude_mention: false})).toMatch(/^[^@].+?>@foo</i);
      });

      it("should not alter non-mention text", function(){
        expect(linkificate("before @foo after")).toMatch(new RegExp("before @" + a_matcher + " after"));
      });

      it("should convert multiple mentions", function(){
        expect(linkificate("@foo and @foo")).toMatch("@" + a_matcher + " and @" + a_matcher);
      });

      it("should convert multiple mentions with no breaks between them", function(){
        expect(linkificate("@foo@foo")).toMatch("@" + a_matcher + "@" + a_matcher);
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
        expect(linkificate("@@foo")).toMatch(new RegExp("@@" + a_matcher));
      });
    });
  });

  describe("#hashtags", function(){
    describe("valid", function(){
    });

    describe("invalid", function(){
    });    
  });
});
