// shared utility and global UI functions

var app = (function(utilFncs) {
    'use strict';

    utilFncs = {

        // add multiple listeners to individual elems
        addListeners: function(elems, event, callback) {
            elems = document.querySelectorAll(elems);
            for (var i = 0; i < elems.length; i++) {
                elems[i].addEventListener(event, callback, false);
            }
        },

        // add single delegated listener to parent
        addListenerParent: function(parent, event, callback, target) {
            parent.addEventListener(event, function(e) {
                if (target === undefined || target === e.target.localName) {
                    callback(e);
                }
                e.stopPropagation();
            }, false);
        },

        // inserts node after other in dom
        insertAfter: function(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },

        // responsive main menu behavior
        toggleMenu: {
            init: function(elem, nav) {
                this.nav = document.querySelector(nav);
                this.icon = document.querySelector(elem);
                this.icon.addEventListener('click', this.click, false);
            },
            click: function(e) {
                var nav = utilFncs.toggleMenu.nav;
                var img = utilFncs.toggleMenu.icon.getElementsByTagName('img')[0];
                if (nav.classList.contains('is-closed')) {
                    img.setAttribute('src', 'images/icons/ic_close_24px.svg');
                    nav.classList.remove('is-closed');
                    nav.classList.add('is-opened');
                } else {
                    img.setAttribute('src', 'images/icons/ic_menu_24px.svg');
                    nav.classList.remove('is-opened');
                    nav.classList.add('is-closed');
                }
            }
        },

        // compile handlebars template from script tag
        // create new node with rendered template and insert in dom
        // args: source node (id), data source
        compileTemplate: function(source, data) {
            var src = source.innerHTML;
            var template = Handlebars.compile(src);
            var html = template(data);
            //console.log(html);

            var d = document.createElement('div');
            d.setAttribute('class', source.getAttribute('id') + '-compiled');
            d.innerHTML = html;

            // insert after handlebars script tag
            this.insertAfter(d, source);
        },

        // responsive breakpoints for js
        breakpoints: {
            sm: 0,
            md: 768,
            lg: 992
        },

        // ajax request
        // args: callback function
        http: function(callback, obj) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', encodeURI('data/data.json'));
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // alert(xhr.responseText);
                    var data = JSON.parse(xhr.responseText);
                    callback(data[obj]);
                }
                else {
                    alert('Request failed.  Returned status of ' + xhr.status);
                }
            };
            xhr.send();
        }

    };

    return utilFncs;


})(app || {});