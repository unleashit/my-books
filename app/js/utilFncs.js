var app = (function(utilFncs) {

    utilFncs = {

        addListeners: function(elems, event, callback)
        {
            for (var i = 0; i < elems.length; i++) {
                elems[i].addEventListener(event, callback, false);
            }
        },

        addListenerParent: function(parent, event, callback, target) {
            parent.addEventListener(event, function(e) {
                if (target === undefined || target === e.target.localName) {
                    callback(e);
                }
                e.stopPropagation();
            }, false);
        }

    };

    return utilFncs;


})(app || {});