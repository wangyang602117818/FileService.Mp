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
function formatMonth(month) {
  return month.toString().length == 1 ? "0" + month : month;
};
function parseBsonTime(value) {
  if (!value) {
    return "";
  } else {
    value = value["$date"];
  }
  var date = new Date(value);
  return date.getFullYear() + "-" + formatMonth((date.getMonth() + 1)) + "-" + formatMonth(date.getDate()) + " " + formatMonth(date.getHours()) + ":" + formatMonth(date.getMinutes()) + ":" + formatMonth(date.getSeconds());
}
function reMapArray(array, len) {
  var new_array = [];
  for (var i = 0; i < array.length; i += len) {
    if (i % len == 0) {
      new_array.push(array.slice(i, i + len));
    }
  }
  while (new_array[new_array.length - 1].length < len) {
    new_array[new_array.length - 1].push(null);
  }
  return new_array;
}
function toast(text) {
  wx.showToast({
    title: text,
    icon: "none"
  });
  return false;
}

function utf8_decode(utftext) { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}

function base64Decode(input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
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
  setKeyWord: setKeyWord,
  trim: trim,
  toast: toast,
  base64Decode: base64Decode,
  parseBsonTime: parseBsonTime,
  reMapArray: reMapArray
}