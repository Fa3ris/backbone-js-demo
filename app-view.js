import { TodoView } from './todo/todo-view.js'

export const AppView = Backbone.View.extend({

    el: '#app-todo',

    initialize: function (app) {
        this.input = this.$('#new-todo');
        this.app = app;
        // when new elements are added to the collection render then with addOne
        this.app.todoList.on('add', this.addOne, this);
        this.app.todoList.on('reset', this.addAll, this);
        this.app.todoList.fetch(); // Loads list from local storage
    },
    events: {
        'keypress #new-todo': 'createTodoOnEnter'
    },
    createTodoOnEnter: function (e) {
        if (e.which !== 13 || !this.input.val().trim()) { // ENTER_KEY = 13
            return;
        }
        this.app.todoList.create(this.newAttributes());
        this.input.val(''); // clean input box
    },
    addOne: function (todo) {
        var view = new TodoView({ model: todo });
        $('#todo-list').append(view.render().el);
    },
    addAll: function () {
        this.$('#todo-list').html(''); // clean the todo list
        this.app.todoList.each(this.addOne, this);
    },
    newAttributes: function () {
        return {
            title: this.input.val().trim(),
            completed: false
        }
    }
});