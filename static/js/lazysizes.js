/*! lazysizes - v1.3.2 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports?module.exports=c:"function"==typeof define&&define.amd&&define(c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d=b.documentElement,e=a.HTMLPictureElement&&"sizes"in b.createElement("img"),f="addEventListener",g=a[f],h=a.setTimeout,i=a.requestAnimationFrame||h,j=/^picture$/i,k=["load","error","lazyincluded","_lazyloaded"],l={},m=Array.prototype.forEach,n=function(a,b){return l[b]||(l[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),l[b].test(a.className)&&l[b]},o=function(a,b){n(a,b)||(a.className=a.className.trim()+" "+b)},p=function(a,b){var c;(c=n(a,b))&&(a.className=a.className.replace(c," "))},q=function(a,b,c){var d=c?f:"removeEventListener";c&&q(a,b),k.forEach(function(c){a[d](c,b)})},r=function(a,c,d,e,f){var g=b.createEvent("CustomEvent");return g.initCustomEvent(c,!e,!f,d||{}),a.dispatchEvent(g),g},s=function(b,d){var f;!e&&(f=a.picturefill||c.pf)?f({reevaluate:!0,elements:[b]}):d&&d.src&&(b.src=d.src)},t=function(a,b){return(getComputedStyle(a,null)||{})[b]},u=function(a,b,d){for(d=d||a.offsetWidth;d<c.minSize&&b&&!a._lazysizesWidth;)d=b.offsetWidth,b=b.parentNode;return d},v=function(b){var c,d=0,e=a.Date,f=function(){c=!1,d=e.now(),b()},g=function(){h(f)},j=function(){i(g)};return function(){if(!c){var a=125-(e.now()-d);c=!0,6>a&&(a=6),h(j,a)}}},w=function(){var e,k,l,u,w,y,z,A,B,C,D,E,F,G,H,I=/^img$/i,J=/^iframe$/i,K="onscroll"in a&&!/glebot/.test(navigator.userAgent),L=0,M=0,N=0,O=0,P=function(a){N--,a&&a.target&&q(a.target,P),(!a||0>N||!a.target)&&(N=0)},Q=function(a,b){var c,d=a,e="hidden"!=t(a,"visibility");for(B-=b,E+=b,C-=b,D+=b;e&&(d=d.offsetParent);)e=(t(d,"opacity")||1)>0,e&&"visible"!=t(d,"overflow")&&(c=d.getBoundingClientRect(),e=D>c.left&&C<c.right&&E>c.top-1&&B<c.bottom+1);return e},R=function(){var a,b,d,f,g,h,i,j,m;if((w=c.loadMode)&&8>N&&(a=e.length)){for(b=0,O++,G>M&&1>N&&O>3&&w>2?(M=G,O=0):M=w>1&&O>2&&6>N?F:L;a>b;b++)if(e[b]&&!e[b]._lazyRace)if(K)if((j=e[b].getAttribute("data-expand"))&&(h=1*j)||(h=M),m!==h&&(z=innerWidth+h*H,A=innerHeight+h,i=-1*h,m=h),d=e[b].getBoundingClientRect(),(E=d.bottom)>=i&&(B=d.top)<=A&&(D=d.right)>=i*H&&(C=d.left)<=z&&(E||D||C||B)&&(l&&3>N&&!j&&(3>w||4>O)||Q(e[b],h))){if(X(e[b]),g=!0,N>9)break}else!g&&l&&!f&&4>N&&4>O&&w>2&&(k[0]||c.preloadAfterLoad)&&(k[0]||!j&&(E||D||C||B||"auto"!=e[b].getAttribute(c.sizesAttr)))&&(f=k[0]||e[b]);else X(e[b]);f&&!g&&X(f)}},S=v(R),T=function(a){o(a.target,c.loadedClass),p(a.target,c.loadingClass),q(a.target,T)},U=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},V=function(a){var b,d,e=a.getAttribute(c.srcsetAttr);(b=c.customMedia[a.getAttribute("data-media")||a.getAttribute("media")])&&a.setAttribute("media",b),e&&a.setAttribute("srcset",e),b&&(d=a.parentNode,d.insertBefore(a.cloneNode(),a),d.removeChild(a))},W=function(){var a,b=[],c=function(){for(;b.length;)b.shift()();a=!1};return function(d){b.push(d),a||(a=!0,i(c))}}(),X=function(a){var b,d,e,f,g,i,k,t=I.test(a.nodeName),v=t&&(a.getAttribute(c.sizesAttr)||a.getAttribute("sizes")),w="auto"==v;(!w&&l||!t||!a.src&&!a.srcset||a.complete||n(a,c.errorClass))&&(w&&(k=a.offsetWidth),a._lazyRace=!0,N++,W(function(){a._lazyRace&&delete a._lazyRace,p(a,c.lazyClass),(g=r(a,"lazybeforeunveil")).defaultPrevented||(v&&(w?(o(a,c.autosizesClass),x.updateElem(a,!0,k)):a.setAttribute("sizes",v)),d=a.getAttribute(c.srcsetAttr),b=a.getAttribute(c.srcAttr),t&&(e=a.parentNode,f=e&&j.test(e.nodeName||"")),i=g.detail.firesLoad||"src"in a&&(d||b||f),g={target:a},i&&(q(a,P,!0),clearTimeout(u),u=h(P,2500),o(a,c.loadingClass),q(a,T,!0)),f&&m.call(e.getElementsByTagName("source"),V),d?a.setAttribute("srcset",d):b&&!f&&(J.test(a.nodeName)?U(a,b):a.src=b),(d||f)&&s(a,{src:b})),(!i||a.complete)&&(i?P(g):N--,T(g))}))},Y=function(){if(!l){if(Date.now()-y<999)return void h(Y,999);var a,b=function(){c.loadMode=3,S()};l=!0,c.loadMode=3,N||(O?S():h(R)),g("scroll",function(){3==c.loadMode&&(c.loadMode=2),clearTimeout(a),a=h(b,99)},!0)}};return{_:function(){y=Date.now(),e=b.getElementsByClassName(c.lazyClass),k=b.getElementsByClassName(c.lazyClass+" "+c.preloadClass),H=c.hFac,F=c.expand,G=F*c.expFactor,g("scroll",S,!0),g("resize",S,!0),a.MutationObserver?new MutationObserver(S).observe(d,{childList:!0,subtree:!0,attributes:!0}):(d[f]("DOMNodeInserted",S,!0),d[f]("DOMAttrModified",S,!0),setInterval(S,999)),g("hashchange",S,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[f](a,S,!0)}),/d$|^c/.test(b.readyState)?Y():(g("load",Y),b[f]("DOMContentLoaded",S),h(Y,2e4)),S(e.length>0)},checkElems:S,unveil:X}}(),x=function(){var a,d=function(a,b,c){var d,e,f,g,h=a.parentNode;if(h&&(c=u(a,h,c),g=r(a,"lazybeforesizes",{width:c,dataAttr:!!b}),!g.defaultPrevented&&(c=g.detail.width,c&&c!==a._lazysizesWidth))){if(a._lazysizesWidth=c,c+="px",a.setAttribute("sizes",c),j.test(h.nodeName||""))for(d=h.getElementsByTagName("source"),e=0,f=d.length;f>e;e++)d[e].setAttribute("sizes",c);g.detail.dataAttr||s(a,g.detail)}},e=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)d(a[b])},f=v(e);return{_:function(){a=b.getElementsByClassName(c.autosizesClass),g("resize",f)},checkElems:f,updateElem:d}}(),y=function(){y.i||(y.i=!0,x._(),w._())};return function(){var b,e={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.7,hFac:.8,expand:d.clientHeight>600?d.clientWidth>860?500:410:359,loadMode:2};c=a.lazySizesConfig||a.lazysizesConfig||{};for(b in e)b in c||(c[b]=e[b]);a.lazySizesConfig=c,h(function(){c.init&&y()})}(),{cfg:c,autoSizer:x,loader:w,init:y,uP:s,aC:o,rC:p,hC:n,fire:r,gW:u}}});