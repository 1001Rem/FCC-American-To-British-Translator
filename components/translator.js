const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const britishOnly = require('./british-only.js');
const americanToBritishTitles = require('./american-to-british-titles.js')

// Reverse object key/value pairs
function reverseDict(obj){ 
    var retobj = {}; 
    for(var key in obj){ 
      retobj[obj[key]] = key; 
    } 
    return retobj; 
  } 

//create british to american titles obj by reversing the americantobritishtitles:
let britishToAmericanTitles = reverseDict(americanToBritishTitles);


// American/British dictionary
const americanBritishDict = {
  ...americanOnly,
  ...americanToBritishSpelling,
};

// British/American dictionary
const reverseAmericanToBritishSpelling = reverseDict(americanToBritishSpelling);


const britishAmericanDict = {
  ...britishOnly,
  ...reverseAmericanToBritishSpelling,
};

class Translator {
  constructor() {
    //define the dict(s) in a constructor to access them inside the class
    this.americanBritishDict = americanBritishDict;
    this.britishAmericanDict = britishAmericanDict;
    this.americanToBritishTitles = americanToBritishTitles;
    this.britishToAmericanTitles = britishToAmericanTitles;
  }

  // Translate method
  translate(str, locale) {
    //get the str, store in lowerCasedStr, and convert to lowercase:
    const lowerCasedOriginalStr = String(str).toLowerCase();

    //determine dict based on the locale provided:
    const dict =
      locale === "american-to-british" ? this.americanBritishDict : this.britishAmericanDict;
    const titlesHonorificsDict =
      locale === "american-to-british" ? this.americanToBritishTitles : this.britishToAmericanTitles;

      //determine time regex based on locale to match either hh:mm or hh.mm, this doesnt handle 24hr time:
    const timeRegex =
      locale === "american-to-british" ? /([1-9]|1[012]):[0-5][0-9]/g : /([1-9]|1[012]).[0-5][0-9]/g;

      //init matchesMap obj
    const matchesMap = {};

    //iterate through the titleHonorificsDict that contains the titles:
    Object.entries(titlesHonorificsDict).forEach(([k, v]) => {
        //if the lowercaseoriginal str includes the key:
      if (lowerCasedOriginalStr.includes(k)) {
        //push the key of the matched title and value to the matchesMap obj:
        matchesMap[k] = v.charAt(0).toUpperCase() + v.slice(1);
      }
    });

    // Filter and add words with spaces from the dictionary:

    //itirate over the entries
    Object.entries(dict)
    //get only the words with spaces and  lowercase original str includes the obj key:
      .filter(([k, v]) => k.includes(" ") && lowerCasedOriginalStr.includes(k))

      //if so, itirate over them and insert them into our matchesMap
      .forEach(([k, v]) => {
        matchesMap[k] = v;
      });

    // Search for individual word matches
    lowerCasedOriginalStr
    //this regex would match single words and words that contain a space or a hyphen between them, if there is a hyphen
    //it would be a single value in the array, if there is a space it would be a seperate val in the array
    // ex input: "hello" would return ["hello"], "hello world" would return ["hello", "world"], "hello world-str" would return ["hello", "world-str"]:
      .match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g)
      //map over each val from the array, if there is a hit in dict[word], put the key in the matchesMap as the word itself and the word is the value of dict[word]:
      ?.forEach((word) => {
        if (dict[word]) matchesMap[word] = dict[word];
      });

    // Search for time matches and add them to the matchesMap object
    lowerCasedOriginalStr
      .match(timeRegex)
      ?.forEach((e) => {
        matchesMap[e] = locale === "american-to-british" ? e.replace(":", ".") : e.replace(".", ":");
      });

    // No matches
    if (Object.keys(matchesMap).length === 0) return null;

    // Return logic
    const translation = this.replaceAll(str, matchesMap);
    const translationWithHighlight = this.replaceAllWithHighlight(str, matchesMap);

    return [translation, translationWithHighlight];
  }

  // Helper function to replace all matches
  replaceAll(str, mapObj) {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
  }

  // Helper function to replace all matches with highlights
  replaceAllWithHighlight(str, mapObj) {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    //changed <span class='highlight'> to <span class="highlight"> so the fcc tests can stop bitching about it:
    return str.replace(re, (matched) => `<span class="highlight">${mapObj[matched.toLowerCase()]}</span>`);
  }
}

// Export the Translator class for use in routing
module.exports = Translator;
