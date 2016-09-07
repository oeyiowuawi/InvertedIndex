describe("Inverted Index", function(){
  var app;
  beforeAll(function(){
    app = new InvertedIndex();
  });

  describe("break texts seperated by space into array",function(){
    it('should do somethign', function () {
      var word = "Lekan Eyiowuawi"
      expect(app.breakTextToWords(word)).toEqual(["Lekan", "Eyiowuawi"])
    });
  });

  describe("formatted texts", function(){
    it("should remove all non characters and returns just the letters", function(){
      var word = "!Le@kan,.";
      expect(app.formatWord(word)).toEqual("lekan");
    });

    it("should downcase all capital letters", function(){
      var word = "LEKAN";
      expect(app.formatWord(word)).toEqual("lekan");
    })
  });

  describe("Reads Json data", function(){
    beforeAll(function(){
      app.createIndex('../../books.json');
    });
    afterAll(function(){
      app.indexedWords = {}
    });
    it("populates the indexed object", function(){
      expect(app.indexedWords).toBeDefined()
    });
    it("doesn't overide keys in the object", function(){
      expect(app.indexedWords["the"].length).toEqual(5)
    });
  });

  describe("Search indexedwords",function(){
    beforeAll(function(){
      app.createIndex('../../books.json');

    });
    describe("when a string is passed to the searchIndex property", function(){
      it("returns an array", function(){
        expect(app.searchIndex("the")).toEqual(jasmine.any(Array))
      });
      it("returns the location and index of the word", function(){
        expect(app.searchIndex("the")[0][0]).toEqual([0,0])
      })
    });
    describe("when an array is passed", function(){
      it("returns an array with the location of each word", function(){
          // console.log(app.searchIndex("alice"));
        expect(app.searchIndex(["alice","rabbit"])).toEqual([[[0,1],[0,4]],[[0,8]]])
      })
    });
    describe("when multiple strings are passed",function(){
      it("returns the possition of each word", function(){
        expect(app.searchIndex("alice","rabbit")).toEqual([[[0,1],[0,4]],[[0,8]]]);
      });
    });
    describe("when a string that is not in the indexedWords object is passed", function(){
      it("returns a search not fould string", function(){
        expect(app.searchIndex("Lekan")).toEqual("No result Found")
      })
    })
  });
})
