const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();

console.log(lngDetector.detect("Es macht gut", 1));
console.log(lngDetector.detect("Dubra prace", 1));
console.log(lngDetector.detect("Gwaith da", 1));
