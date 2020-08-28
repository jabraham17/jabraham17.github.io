(_ => {
  function getEmail() {
    var obs = 'ŴƀſƅŲŴƅĿžŻŲųőŸžŲźŽĿŴƀž';
    var ema = '';
    var key = 273
    for(var c of obs) {
      ema += String.fromCharCode(c.charCodeAt(0) - key)
    }
    return "mailto:" + ema;
  }
  document.getElementById("contact").onclick = _ => {
    window.open(getEmail());
  }
})();