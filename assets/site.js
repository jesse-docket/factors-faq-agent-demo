(() => {
  const base='/factors-faq-agent-demo/';
  const params=new URLSearchParams(location.search);
  const walkthrough=params.get('walkthrough')==='1';
  const brand = document.querySelector('.brand');
  if (brand) {
    const logo = document.createElement('img');
    logo.src = base + 'assets/factors-logo.svg';
    logo.alt = 'Factors.ai';
    logo.width = 126;
    logo.height = 32;
    brand.replaceChildren(logo);
  }
  if (!walkthrough) {
    const resetbar = document.createElement('div');
    resetbar.className = 'resetbar';
    resetbar.innerHTML = '<button id="resetBtn" type="button" aria-describedby="reset-help"><span aria-hidden="true">↻</span> Reset agent session</button><span id="reset-help" class="sr-only">Start a fresh Docket test session in this browser. Saved conversations remain in the dashboard.</span><span id="reset-status" role="status"></span>';
    document.body.appendChild(resetbar);
    const button = resetbar.querySelector('button');
    const status = resetbar.querySelector('[role="status"]');
    try {
      if (sessionStorage.getItem('factorsDemoReset') === 'complete') {
        status.textContent = 'Session reset. Ready for a new test.';
        sessionStorage.removeItem('factorsDemoReset');
        setTimeout(() => { status.textContent = ''; }, 7000);
      }
    } catch (_) { /* Storage may be unavailable in a restricted browser. */ }
    button.addEventListener('click', async () => {
      button.disabled = true;
      status.textContent = 'Resetting the agent session…';
      let failed = false;
      try {
        // Public SDK methods disconnect the live call and clear injected context.
        if (typeof window.AISeller?.hideAndDisconnect === 'function') window.AISeller.hideAndDisconnect();
        if (typeof window.AISeller?.resetContext === 'function') {
          await Promise.race([window.AISeller.resetContext(), new Promise(resolve => setTimeout(resolve, 2000))]);
        }
      } catch (_) { /* Local cleanup also works if the SDK is offline. */ }
      // Docket-owned keys verified in its public widget bundle; never clear all origin storage.
      const keys = ['docketActiveConversation', 'widget_auth_token', '__aiseller_client_id', 'visitorId', 'docket_progressive_unmute_keep_muted'];
      for (const key of keys) {
        try { localStorage.removeItem(key); sessionStorage.removeItem(key); }
        catch (_) { failed = true; }
      }
      try {
        // Current SDK identity cookie is host-only, path=/; keep consent cookies intact.
        document.cookie = '_docket_id=; Max-Age=0; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
        if (document.cookie.split(';').some(cookie => cookie.trim().startsWith('_docket_id='))) failed = true;
      } catch (_) { failed = true; }
      if (failed) {
        status.textContent = 'Could not fully reset. Use a fresh browser profile for the next test.';
        button.disabled = false;
        return;
      }
      try { sessionStorage.setItem('factorsDemoReset', 'complete'); } catch (_) {}
      location.reload();
    });
  }
  if(walkthrough) document.querySelectorAll('a[href]').forEach(link=>{
    const url=new URL(link.getAttribute('href'),location.href);
    if(url.origin===location.origin && url.pathname.startsWith(base)) {
      url.searchParams.set('walkthrough','1'); link.href=url.href;
    }
  });
  const search=document.getElementById('search'),topic=document.getElementById('topic');
  if(!search||!topic)return;
  if([...topic.options].some(x=>x.value===params.get('topic')))topic.value=params.get('topic');
  const filter=()=>{
    const q=search.value.toLowerCase().trim();let count=0;
    document.querySelectorAll('[data-resource]').forEach(card=>{
      const match=(!topic.value||card.dataset.topic===topic.value)&&(!q||q.split(/\s+/).every(w=>card.dataset.search.includes(w)));
      card.hidden=!match;if(match)count++;
    });
    document.getElementById('result-count').textContent=`${count} ${count===1?'session':'sessions'}`;
    document.getElementById('empty').hidden=count>0;
  };
  search.addEventListener('input',filter);topic.addEventListener('change',filter);filter();
})();
