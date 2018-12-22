var keywords = [
  "HandlerId",
  "MachineName",
  "FileName",
  "StateDesc",
  "Type",
  "From",
  "FileType",
  "AppName",
  "Content",
  "Extension",
  "Action",
  "ApplicationName",
  "UserName",
  "Role",
  "DepartmentName",
  "DepartmentCode"
];
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
function setKeyWord(result, filter) {
  if (result.result && result.result.length > 0 && filter) {
    for (var i = 0; i < result.result.length; i++) {
      var doc = result.result[i];
      for (var k = 0; k < keywords.length; k++) {
        var keyword = keywords[k];
        if (keyword.indexOf(".") > -1) {
          var keywordArray = keyword.split(".");
          if (doc[keywordArray[0]] && doc[keywordArray[0]][keywordArray[1]]) {
            doc[keywordArray[0]][keywordArray[1]] = doc[keywordArray[0]][keywordArray[1]].replace(new RegExp("" + trim(filter) + "", "ig"), this.matchKeyWord);
          }
        } else {
          if (doc[keyword] && typeof doc[keyword] == "string") {
            doc[keyword] = doc[keyword].replace(new RegExp("" + trim(filter) + "", "ig"), matchKeyWord);
          }
        }
      }
    }
  }
}
function matchKeyWord(word) {
  return '<span class="search_word">' + word + '</span>';
}

module.exports = {
  setKeyWord: setKeyWord
}