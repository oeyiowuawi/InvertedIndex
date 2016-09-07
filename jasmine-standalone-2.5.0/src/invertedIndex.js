function InvertedIndex(){
  this.indexedWords = {};

  var self = this;

//this function takes a filepath and read the json content and returns it.
// @params {string} filepath has to be a string
//@returns {array} an array of object
//
  this.readFile = function(filepath, callback){
    var jsonResponse;
    $.ajax({
      'async': false,
      'url': filepath,
      'dataType': "json",
      'success': function(data) {
        jsonResponse = data;
      }
    });
    callback(jsonResponse);
  }

  this.createIndex = function(filepath){
    var returnedArray = self.readFile(filepath, function(data){

      data.forEach(function(book, location){
        var text = book.title + " " + book.text;
        var textArray = self.breakTextToWords(text);
        textArray.forEach(function(text, textid){
          var word = self.formatWord(text);
          if(!self.indexedWords.hasOwnProperty(word)){
            self.indexedWords[word] = [[location, textid]]
          } else{
            self.indexedWords[word].push([location, textid])
          }
        });
      })
    });
  };

  this.searchIndex = function(searchQuery){
    var words, result = [];
    if(searchQuery instanceof Array){
      words = searchQuery;
    } else if(arguments.length > 1 ){
      words = Array.prototype.slice.call(arguments)
    }
    else{
      words = self.breakTextToWords(searchQuery);
    }

    words.forEach(function(txt){
      var fmtwrd = self.formatWord(txt);
      if(self.indexedWords[fmtwrd]){
        result.push(self.indexedWords[fmtwrd])
      }else{
        result = "No result Found";
      }
    });
    return result;
  }


  this.breakTextToWords = function(text){
    return text.split(" ");
  }

  this.formatWord = function(text){
    return text.toLowerCase().replace(/[,";:?!@#$%(^)&*()_+|.><{}±=-]/g, '');
  }
}
