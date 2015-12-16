//var handleBtns = function(e) {
//    alert("Hello " + e.target.innerHTML);
//};
//var parent = document.querySelector('.btns');
//utilFncs.addListenerParent(parent, 'click', handleBtns, 'button');
//  document.body.style.backgroundColor = 'blue';

// Main app

var app = (function(utilFncs, books) {
    'use strict';

    // no-js class should exist only for no-js browsers
    document.documentElement.classList.remove('no-js');

    // hide mobile menu by default (non-js friendly)
    document.querySelector('.navigation').classList.add('is-closed');

    // mobile menu action
    // args: class name of menu and parent
    utilFncs.toggleMenu.init('.menu-icon', '.navigation');

    // get book data, then populate handlebars templates
    // args: callback, obj from dataset
    utilFncs.http(books.getBooks, 'book');
    utilFncs.http(books.getTop10, 'top10');

    // close events for cards (currently only "welcome back")
    // args: element, event, callback
    utilFncs.addListeners('.close', 'click', books.closeCard);

    // add a review
    // args: element, event, callback
    document.querySelector('.add-review')
        .addEventListener('click', books.addBook.showForm, false);

    // close event for add review form (shouldn't be removed from dom)
    // args: element, event, callback
    document.querySelector('.close-add-review')
        .addEventListener('click', books.closeBook, false);

})(app || {}, books || {});