/* ============================================================
   Pathkey product demos — ported from the Audit Suite pricing page.
   Two scroll-triggered animations:
     1) TDS Audit live reconcile table  (#demo)
     2) Schedule III classify-once fan-out (#s3demo)
   Each early-returns when its markup isn't on the page, so this
   file is safe to load globally.
   ============================================================ */
(function(){
  var demo=document.getElementById('demo'); if(!demo) return;
  var grid=document.getElementById('demoGrid'),bar=document.getElementById('demoBar'),
      sum=document.getElementById('demoSum'),timeEl=document.getElementById('demoTime'),
      st=document.getElementById('demoStatus'),stTxt=document.getElementById('demoStatusText');
  var rows=[
    {p:'Acme Traders Pvt Ltd',s:'194C · contractor',r:'1,20,000',b:'1,20,000',f:false},
    {p:'Sharma & Co',s:'194J · professional',r:'85,000',b:'85,000',f:false},
    {p:'Verma Logistics',s:'194C · contractor',r:'2,40,000',b:'2,10,000',f:true,why:'Short'},
    {p:'Northwind Goods Co',s:'194Q · purchase (GST→net)',r:'5,00,000',b:'5,00,000',f:false},
    {p:'Kapoor Associates',s:'194H · commission',r:'45,000',b:'45,000',f:false},
    {p:'Pinnacle Realty LLP',s:'194I · rent',r:'—',b:'3,00,000',f:true,why:'Missed'},
    {p:'Bluepeak Consulting',s:'194J · professional',r:'60,000',b:'75,000',f:true,why:'Mismatch'},
    {p:'Orbit Supplies',s:'194C · contractor',r:'98,000',b:'98,000',f:false}
  ];
  var TOTAL=583,MATCHED=571,FLAG=12;
  var okIc='<svg class="ic" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var flIc='<svg class="ic" viewBox="0 0 16 16"><path d="M4.2 2v12M4.2 2.6h7.6l-1.9 2.8 1.9 2.8H4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers=[]; function T(fn,ms){timers.push(setTimeout(fn,ms));}
  function clearT(){timers.forEach(clearTimeout);timers=[];}
  function build(){
    while(grid.children.length>1) grid.removeChild(grid.lastChild);
    rows.forEach(function(d){
      var el=document.createElement('div'); el.className='demo-row';
      el.innerHTML='<div class="party">'+d.p+'<small>'+d.s+'</small></div>'+
        '<div class="amt">₹'+d.r+'</div>'+
        '<div class="amt books-col'+(d.f?' mis':'')+'">₹'+d.b+'</div>'+
        '<div class="stat '+(d.f?'flag':'ok')+'">'+(d.f?flIc+' '+(d.why||'Flagged'):okIc+' Matched')+'</div>';
      grid.appendChild(el); d._el=el;
    });
  }
  function tween(to,ms){
    var s=performance.now();
    function step(t){var k=Math.min(1,(t-s)/ms);sum.innerHTML='<b>'+Math.round(k*to)+'</b> of '+TOTAL+' entries';if(k<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  function finalSum(){
    st.classList.add('done'); stTxt.textContent='Reconciled · '+FLAG+' flagged';
    sum.innerHTML='<b>'+TOTAL+'</b> entries · <b>'+MATCHED+'</b> matched · <b style="color:#c2410c">'+FLAG+'</b> flagged';
    timeEl.innerHTML='<span class="old">≈ 4 days by hand</span> 10s';
  }
  function run(){
    clearT(); build();
    st.classList.remove('done'); stTxt.textContent='Matching…';
    bar.style.width='0%'; sum.innerHTML='<b>0</b> of '+TOTAL+' entries';
    timeEl.innerHTML='<span class="old">≈ 4 days by hand</span>—';
    if(reduce){ rows.forEach(function(d){d._el.classList.add('show');d._el.querySelector('.stat').classList.add('in');}); bar.style.width='100%'; finalSum(); return; }
    var n=rows.length, step=430;
    tween(TOTAL,n*step+200);
    rows.forEach(function(d,i){
      T(function(){ d._el.classList.add('show'); }, 200+i*step);
      T(function(){ d._el.querySelector('.stat').classList.add('in'); bar.style.width=Math.round((i+1)/n*100)+'%'; }, 200+i*step+430);
    });
    var end=200+n*step+760;
    T(finalSum,end);
    T(function(){ grid.style.transition='opacity .5s'; grid.style.opacity='0';
      T(function(){ grid.style.opacity='1'; run(); },620); }, end+3400);
  }
  var started=false; function start(){ if(started)return; started=true; run(); }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)start();});},{threshold:.25}).observe(demo);
  } else start();
})();

/* ---- Schedule III · classify-once fan-out demo ---- */
(function(){
  var demo=document.getElementById('s3demo'); if(!demo) return;
  var stage=document.getElementById('s3Stage'),svg=document.getElementById('s3Links'),
      grpEl=document.getElementById('s3Grp'),subEl=document.getElementById('s3GrpSub'),
      amtEl=document.getElementById('s3Amt'),field=document.getElementById('s3Field'),
      fieldVal=document.getElementById('s3FieldVal'),menu=document.getElementById('s3Menu'),
      cursor=document.getElementById('s3Cursor'),dests=document.getElementById('s3Dests'),
      st=document.getElementById('s3Status'),stTxt=document.getElementById('s3StatusText'),
      sum=document.getElementById('s3Sum');
  var ICO={
    bs:'<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2.5" width="12" height="11" rx="1.5"/><path d="M2 6h12M8 6v7.5"/></svg>',
    note:'<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 1.8h5l3 3v9.4H4z"/><path d="M9 1.8V5h3M6 8.6h4M6 11h4"/></svg>',
    cfs:'<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h8M9 2.5 11.5 5 9 7.5M13 11H5M7 8.5 4.5 11 7 13.5"/></svg>',
    pl:'<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.3" y="2.3" width="11.4" height="11.4" rx="1.5"/><path d="M5 10.5 7.3 8l1.9 1.5L13 5.8"/></svg>'
  };
  var ck='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg>';
  var groups=[
    {grp:'Plant &amp; Machinery',sub:'gross block &middot; 4 ledgers',amt:'&#8377;1,86,40,000',head:'Property, plant &amp; equipment',
     opts:['Property, plant &amp; equipment','Capital work in progress','Intangible assets'],
     dests:[
       {ico:'bs',tab:'Balance Sheet',short:'Balance Sheet',line:'Non-current assets &middot; PPE',fig:'&#8377;1.86 Cr'},
       {ico:'note',tab:'Notes (Assets) &middot; Note 14',short:'Note 14',line:'Fixed-asset schedule',fig:'&#8377;1.86 Cr'},
       {ico:'cfs',tab:'Cash Flow',short:'Cash Flow',line:'Investing &middot; additions to PPE',fig:'auto-recalculated',recalc:true}
     ]},
    {grp:'Salaries &amp; Wages',sub:'payroll &middot; 6 ledgers',amt:'&#8377;1,42,60,000',head:'Employee benefits expense',
     opts:['Employee benefits expense','Other expenses','Cost of materials consumed'],
     dests:[
       {ico:'pl',tab:'Statement of P&amp;L',short:'P&amp;L',line:'Employee benefit expenses',fig:'&#8377;1.43 Cr'},
       {ico:'note',tab:'Notes (P&amp;L) &middot; Note 37',short:'Note 37',line:'Employee benefits',fig:'&#8377;1.43 Cr'},
       {ico:'cfs',tab:'Cash Flow',short:'Cash Flow',line:'Operating activities',fig:'auto-recalculated',recalc:true}
     ]},
    {grp:'Sundry Creditors',sub:'trade &middot; 12 ledgers',amt:'&#8377;77,30,000',head:'Trade payables',
     opts:['Trade payables','Other current liabilities','Short-term borrowings'],
     dests:[
       {ico:'bs',tab:'Balance Sheet',short:'Balance Sheet',line:'Current liabilities &middot; Trade payables',fig:'&#8377;77.30 L'},
       {ico:'note',tab:'Notes (Liab.) &middot; Note 11',short:'Note 11',line:'MSME ageing schedule',fig:'&#8377;77.30 L'},
       {ico:'cfs',tab:'Cash Flow',short:'Cash Flow',line:'Working-capital movement',fig:'auto-recalculated',recalc:true}
     ]}
  ];
  var gi=0;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers=[]; function T(fn,ms){timers.push(setTimeout(fn,ms));}
  function clearT(){timers.forEach(clearTimeout);timers=[];}
  function sizeSvg(){ var w=stage.clientWidth||0,h=stage.clientHeight||0; svg.setAttribute('width',w); svg.setAttribute('height',h); svg.setAttribute('viewBox','0 0 '+w+' '+h);}
  function relRect(el){ var s=stage.getBoundingClientRect(),r=el.getBoundingClientRect(); return {x:r.left-s.left,y:r.top-s.top,w:r.width,h:r.height};}
  function buildDests(g){
    dests.innerHTML='';
    g.dests.forEach(function(d){
      var el=document.createElement('div'); el.className='s3p-dest';
      el.innerHTML='<div class="top"><span class="tabnm">'+ICO[d.ico]+d.tab+'</span>'+
        '<span class="badge'+(d.recalc?' recalc':'')+'">'+ck+' '+(d.recalc?'Recalculated':'Updated')+'</span></div>'+
        '<div class="line">'+d.line+'</div><div class="fig">'+d.fig+'</div>';
      dests.appendChild(el); d._el=el;
    });
  }
  function drawLink(d){
    if(svg.clientWidth===0 && !svg.getAttribute('width')) return;
    var fr=relRect(field),dr=relRect(d._el);
    var sx=fr.x+fr.w, sy=fr.y+fr.h/2, dx=dr.x, dy=dr.y+dr.h/2;
    if(!isFinite(sx)||!isFinite(dx)||(sx===0&&dx===0)) return;
    var p=document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('class','s3p-link');
    p.setAttribute('d','M '+sx+' '+sy+' C '+(sx+46)+' '+sy+', '+(dx-46)+' '+dy+', '+dx+' '+dy);
    svg.appendChild(p);
    var len=0; try{len=p.getTotalLength();}catch(e){}
    if(len){ p.style.strokeDasharray=len; p.style.strokeDashoffset=len; p.getBoundingClientRect();
      p.style.transition='stroke-dashoffset .55s ease, opacity .3s'; p.style.strokeDashoffset=0; }
    p.classList.add('on');
  }
  function reset(g){
    clearT(); st.classList.remove('done'); stTxt.textContent='Awaiting classification…';
    grpEl.innerHTML=g.grp+'<small>'+g.sub+'</small>'; subEl=grpEl.querySelector('small');
    amtEl.innerHTML=g.amt;
    field.classList.remove('open','filled'); fieldVal.innerHTML='&mdash; select head &mdash;';
    menu.classList.remove('show'); menu.innerHTML='';
    cursor.classList.remove('show'); cursor.style.transform='translate(0,0)';
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    sum.innerHTML='One classification &middot; <b>updates pending</b>';
    buildDests(g);
  }
  function moveCursorTo(el,offx,offy){
    var fr=relRect(el); cursor.classList.add('show');
    cursor.style.transform='translate('+(fr.x+(offx||0))+'px,'+(fr.y+(offy||0))+'px)';
  }
  function run(){
    sizeSvg(); var g=groups[gi]; reset(g);
    if(reduce){
      field.classList.add('filled'); fieldVal.innerHTML=g.head;
      g.dests.forEach(function(d){ d._el.classList.add('on'); }); finish(g);
      T(function(){ gi=(gi+1)%groups.length; run(); },4200); return;
    }
    T(function(){ moveCursorTo(field, relRect(field).w-26, relRect(field).h-9); }, 450);
    T(function(){
      menu.innerHTML=g.opts.map(function(o,k){return '<div class="opt'+(k===0?' sel':'')+'">'+o+'</div>';}).join('');
      menu.classList.add('show'); field.classList.add('open'); stTxt.textContent='Classifying…';
    }, 1150);
    T(function(){ moveCursorTo(menu.querySelector('.opt.sel'), 12, 16); }, 1500);
    T(function(){
      field.classList.remove('open'); field.classList.add('filled'); fieldVal.innerHTML=g.head;
      menu.classList.remove('show'); cursor.classList.remove('show');
      stTxt.textContent='Propagating…';
    }, 2050);
    sizeSvg();
    g.dests.forEach(function(d,i){
      T(function(){ d._el.classList.add('on'); drawLink(d); }, 2350+i*260);
    });
    var end=2350+g.dests.length*260+350;
    T(function(){ finish(g); }, end);
    T(function(){
      stage.style.transition='opacity .45s'; stage.style.opacity='0';
      T(function(){ gi=(gi+1)%groups.length; stage.style.opacity='1'; run(); }, 560);
    }, end+3300);
  }
  function finish(g){
    st.classList.add('done'); stTxt.textContent='Updated in '+g.dests.length+' places';
    var names=g.dests.map(function(d){return '<b>'+d.short+'</b>';});
    var joined=names.slice(0,-1).join(', ')+' &amp; '+names[names.length-1];
    sum.innerHTML='One tag &rarr; '+joined+' &mdash; all in sync';
  }
  var started=false; function start(){ if(started)return; started=true; run(); }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)start();});},{threshold:.25}).observe(demo);
  } else start();
  var rz; window.addEventListener('resize',function(){ clearTimeout(rz); rz=setTimeout(sizeSvg,150); });
})();
