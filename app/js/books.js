var books = (function(utilFncs) {
    'use strict';

    return {

        // populates book cards with json data
        getBooks: function(data) {
            var source = document.getElementById("books");
            utilFncs.compileTemplate(source, data);
        },

        // populates top10 australian beaches with json data
        getTop10: function(data) {
            var source = document.getElementById("top10");
            utilFncs.compileTemplate(source, data);
        },

        // handles add review form including validation and submission
        addBook: {
            showForm: function () {
                books.addBook.elem = document.querySelector('.review-form');
                books.addBook.btn = document.getElementById('add-review-btn');
                books.addBook.errors = document.querySelector('.errors');
                books.addBook.elem.classList.remove('hide');
                books.addBook.elem.style.opacity = '1';
                books.addBook.listen();
            },
            listen: function(){
                books.addBook.btn.addEventListener('click', this.validate, false);
            },
            validate: function(e) {
                e.preventDefault();
                var fields = {
                    title: document.getElementById('booktitle').value,
                    author: document.getElementById('bookauthor').value,
                    image: document.getElementById('bookimage').value
                    },
                    msg = [],
                    flag = false;

                for (var field in fields) {
                    if (fields[field] === '') {
                        msg.push(field + ' can\'t be blank!');
                    } else {
                        if (flag === false) {
                            for (var f in fields) {
                                if (f !== field && fields[f] === fields[field]) {
                                    flag = true;
                                    msg.push('Something is wrong here. No fields should match!');
                                    break;
                                }
                            }

                        }
                    }
                }
                if (msg.length > 0) {
                    books.addBook.displayValidations(msg);
                } else {
                    books.addBook.submitForm(fields);
                }
            },
            displayValidations: function(msg) {
                var o = '<ul>';
                for (var i=0; i < msg.length; i++) {
                   o += '<li>' + msg[i] + '</li>';
                }
                o += '</ul>';
                books.addBook.errors.innerHTML = o;
            },
            submitForm: function(fields) {
                books.addBook.errors.innerHTML = '';
                // utilFncs.httpPut('books', fields);
                books.closeBook();
            }
        },

        // closes any card with .close class on button but relies on the current dom
        // solution: jquery parent() or create a similar method
        closeCard: function(e){
            e.preventDefault();
            var close = e.currentTarget;
            var remove = close.parentNode.parentNode;
            remove.parentNode.removeChild(remove);
        },

        // closes add review form
        closeBook: function() {
            books.addBook.elem.querySelector('form').reset();
            books.addBook.elem.classList.add('hide');
            books.addBook.elem.style.opacity = '0';
        }
    };

})(app || {});