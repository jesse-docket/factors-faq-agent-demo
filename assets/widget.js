// Deployment snippet verified in V2's Deploy tab on 21 September 2026.
// Only suppress the nested widget in the public, read-only walkthrough browser.
if (new URLSearchParams(window.location.search).get('walkthrough') !== '1') {
  window.AISellerSettings = { agent_id: 'e2c5be3b-40f6-4570-b63a-3ed25af0fe70' };
  (function () {
    var w = window;
    var ew = w.AISeller;
    if (typeof ew === 'function') {
      ew('update', w.AISellerSettings);
    } else {
      var d = document;
      var i = function () { i.q.push(arguments); };
      i.q = [];
      i.q.push(['update', w.AISellerSettings]);
      w.AISeller = i;
      var l = function () {
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.docketai.com/script/app/inbound-se-script/ai-seller.js';
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') l();
      else if (w.attachEvent) w.attachEvent('onload', l);
      else w.addEventListener('load', l, false);
    }
  })();
}
