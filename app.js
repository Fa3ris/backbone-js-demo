import { HelloWorldView } from './helloWorld/helloWorld-view.js';
import { Todo } from './todo/todo-model.js';
import { TodoView } from './todo/todo-view.js';
import { TodoList } from './todoList/todoList-collection.js';
import { AppView } from './app-view.js';

/**
 * create namespace for our app
 */
const app = {};

/**
 * Need to instantiate the component
 */
app.helloWorldView = new HelloWorldView();


/**
 * Instance of Todo
 */
const todo = new Todo({ title: 'Learn Backbone.js', completed: false});

console.log(`title = ${todo.get('title')}`); // "Learn Backbone.js"
console.log(`completed = ${todo.get('completed')}`); // false
todo.set('title', 'update Model');
console.log(`title = ${todo.get('title')}`); // "update Model"
todo.set('created_at', new Date());
console.log(`created_at = ${todo.get('created_at')}`);

/**
 *  instance of TodoList
 */

app.todoList = new TodoList();

app.todoList.create({ title: 'Learn Backbone\'s Collection' }); // notice: that `completed` will be set to false by default.

const todo1 = new Todo({ title: 'Learn Models', completed: true });
app.todoList.add(todo1);

console.log(app.todoList.pluck('title'));     // ["Learn Backbone's Collection", "Learn Models"]
console.log(app.todoList.pluck('completed')); // [false, true]

console.log(JSON.stringify(app.todoList)); // "[{"title":"Learn Backbone's Collection","completed":false,"id":"d9763e99-2267-75f5-62c3-9d7e40742aa6"},{"title":"Learn Models","completed":true}]"


// renders individual todo items list (li)

app.todoView = new TodoView({ model: todo });


//--------------
// Initializers
//--------------

app.appView = new AppView(app);

$( "#add-one" ).click(function() {
    console.log( "Handler for add-one .click() called." );
    app.todoList.create({ title: 'New Task' });
});

$( "#reset" ).click(function() {
    console.log( "Handler for reset .click() called." );
    app.todoList.reset();
});