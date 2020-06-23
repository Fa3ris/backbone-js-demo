import { Todo } from '../todo/todo-model.js';

export const TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Store("backbone-todo")
});
  

