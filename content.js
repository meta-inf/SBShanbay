// Get words on current page; adjust wrt shanbay's DOM structures
TIME0 = 50
TIME1 = 2000 // in ms

function Retrieve(cur, tot) {
  if (cur > tot) {
    // sometimes this script may block the script to retrieve words (?)
    window.alert("retrieve failed");
    chrome.storage.local.get('pageIndex', function (o) {
      var idx = o.pageIndex;
      chrome.runtime.sendMessage({pageFailed: idx});
      window.close();
    });
  }
  var span = (TIME1 / TIME0) ** (cur / tot) * TIME0;
  var start = new Date().getTime();
  while (new Date() < start + span) {} 
  var wordsNode = document.getElementsByClassName('learning');
  if (wordsNode.length == 0) {
    Retrieve(cur + 1, tot);
  } else {
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
  }
}

Retrieve(0, 20);
