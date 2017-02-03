FILL = "\t";

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(null, function (stor) {
    console.log(stor);
    var cont = "";
    for (var i = 1; i <= stor.nPages; i++) {
      for (var j = 0; j < stor[i].length; j++) {
        var cr = stor[i][j].slice();
        cr[0] = cr[0].replace(/\n/g, "  ");
        cr[1] = cr[1].replace(/\n/g, "  ");
        cr[2] = cr[2].replace(/\n/g, "  ");
        cont += cr[0] + FILL + cr[1] + FILL + cr[2] + "\n";
      }
    }
    document.getElementById('pr').textContent = cont;
  });
});

