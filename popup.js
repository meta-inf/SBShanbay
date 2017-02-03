function StartFetch(e) {
  e.preventDefault();
  var tot = parseInt(document.getElementById('num').value);
  chrome.runtime.sendMessage({tot: tot});
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('frm').onsubmit = StartFetch;
});

