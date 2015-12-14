// Global scripts

var app = (function(utilFncs) {

    // no-js class should exist only for no-js browsers
    document.documentElement.classList.remove('no-js');


    var handleBtns = function(e) {
        alert("Hello " + e.target.innerHTML);
    };

    var parent = document.querySelector('.btns');
    utilFncs.addListenerParent(parent, 'click', handleBtns, 'button');

   // return utilFncs;

})(app || {});