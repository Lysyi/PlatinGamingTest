window.onload = function() {
  'use strict';

  var currentElem = null;
  var subMenu = null;
  var mainMenu = document.getElementById('menu');

  mainMenu.onmouseover = function(event) {

    if (currentElem) {
      return;
    }

    var target = event.target;
    while (target !== this) {
      if (target.tagName === 'LI' || target.className === 'main-nav--item') { break; }
      target = target.parentNode;
    }
    if (target === this) { return; }

    currentElem = target;
    target.classList.add('active');

    var currentNodes = currentElem.childNodes;
    for (var i = 0; i < currentNodes.length; i++) {
      if(currentNodes[i].className === 'main-nav-sub-item') {
        subMenu = currentNodes[i];
        subMenu.style.display = 'block';
      }
    }

  };


  mainMenu.onmouseout = function(event) {
    if (!currentElem) { return; }

    var relatedTarget = event.relatedTarget;
    if (relatedTarget) {
      while (relatedTarget) {
        if (relatedTarget === currentElem) { return; }
        relatedTarget = relatedTarget.parentNode;
      }
    }

    currentElem.classList.remove('active');
    currentElem = null;

    subMenu.style.display = 'none';
  };

};
