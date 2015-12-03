window.onload = function() {
  'use strict';

  var currentElem = null;
  var subMenu = null;
  var mainMenu = document.getElementById('menu');

  var bind = function(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback);
    } else {
      element.attachEvent('on' + eventName, callback);
    }
  };

  var removeClass = function(element, className) {
    element.className = element.className.replace(className, '');
  };

  var addClass = function(element, className) {
    removeClass(element, className);
    element.className = element.className + ' ' + className;
  };

  bind(mainMenu, 'mouseover', function(event) {
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
    addClass(target, 'active');

    var currentNodes = currentElem.childNodes;
    for (var i = 0; i < currentNodes.length; i++) {
      if(currentNodes[i].className === 'main-nav-sub-item') {
        subMenu = currentNodes[i];
        subMenu.style.display = 'block';
      }
    }

  });

  bind(mainMenu, 'mouseout', function(event) {
    if (!currentElem) { return; }

    var relatedTarget = event.relatedTarget;
    if (relatedTarget) {
      while (relatedTarget) {
        if (relatedTarget === currentElem) { return; }
        relatedTarget = relatedTarget.parentNode;
      }
    }

    removeClass(currentElem, 'active');
    currentElem = null;

    subMenu.style.display = 'none';
  });

};
