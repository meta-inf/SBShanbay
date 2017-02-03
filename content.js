// Get words on current page; adjust wrt shanbay's DOM structures
var wordsNode = document.getElementsByClassName('learning');
var words = [];
for (var i = 0; i < wordsNode.length; i++) {
  var w = wordsNode[i].getElementsByClassName('word')[0].textContent;
  var p = wordsNode[i].getElementsByClassName('pronunciation')[0].textContent;
  var d = wordsNode[i].getElementsByClassName('definition')[0].textContent;
  words.push([w, p, d]);
}
// Save words; inform background it's done
chrome.storage.local.get('pageIndex', function (o) {
  var idx = o.pageIndex;
  var args = {};
  args[idx] = words;
  chrome.storage.local.set(args, function () {
    chrome.runtime.sendMessage({pageSaved: idx});
    window.close();
  });
});
