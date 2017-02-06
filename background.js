var pendingPages = [];

function ProcessPage() {
  if (pendingPages.length == 0) {
    chrome.storage.local.set({lock: null});
    chrome.tabs.create({url:chrome.extension.getURL("ui.html")});
    return;
  }
  var n = pendingPages[0];
  var newUrl = 'https://www.shanbay.com/bdc/learnings/library/#today_p' + n;

  console.log("Processing " + newUrl);
  chrome.tabs.create({url: newUrl}, function (tab) {
    chrome.storage.local.set({pageIndex: n}, function () {
      console.log(tab.id);
      chrome.tabs.executeScript(
        tab.id, 
        {file: 'content.js'},
        function () {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
            chrome.runtime.lastError = null;
          }
        }
      );
    });
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.tot, request.pageSaved);
    if (request.tot != null) {
      if (!(request.tot >= 0)) {
        console.log("???");
        return;
      }
      // Handle download request from popup
      chrome.storage.local.get('lock', function (l) {
        console.log("Lock = ", l);
        if (l == true) {
          // In process
          alert("In process, please wait");
        } else {
          var args = {nPages: request.tot, lock: true};
          pendingPages = [];
          for (var i = 1; i <= request.tot; i++) {
            pendingPages.push(i);
          }
          chrome.storage.local.set(args, function () {
            ProcessPage();
          });
        }
      });
    }
    if (request.pageSaved != null) {
      pendingPages.shift();
      ProcessPage();
    } 
    if (request.pageFailed != null) {
      ProcessPage();
    }
  });

