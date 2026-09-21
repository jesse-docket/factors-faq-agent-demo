(() => {
  const base='/factors-faq-agent-demo/';
  const params=new URLSearchParams(location.search);
  const walkthrough=params.get('walkthrough')==='1';
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
