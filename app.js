/**
<!-- ========= -->
<!--    VIEW   -->
<!-- ========= -->
*/
/**
 * Define a View AppView
 */
const AppView = Backbone.View.extend({
    /**  
     * el - stands for element. Every view has a element associate in with HTML
     * content will be rendered.
     * #container : html element whose id="container"
     */
    el: '#container',
    /** 
     * template which has the placeholder 'who' to be substituted later
     */ 
    template: _.template($('#hello-world-template').html()),
    /** 
     * It's the first function called when this view is instantiated.
     */
    initialize: function () {
        this.render();
    },
    /**
     * $el - it's a cached jQuery object (el), in which you can use jQuery functions
     * to push content. Like the Hello World in this case.
     */
    render: function () {
        /**
         * replace placeholder <%= who %> with Fab in template
         */
        this.$el.html(this.template({who: 'Fab!'}));
    }
});
/**
 * Need to instantiate the component
 */
const appView = new AppView();
/**
 * create namespace for our app
 */
const app = {};
/**
<!-- ========= -->
<!--   MODEL   -->
<!-- ========= -->
*/
/**
 * Define a Model Todo in namespace app
 */
app.Todo = Backbone.Model.extend({
    /**
     * Default values
     */
  defaults: {
    title: '',
    completed: false
  }
});
/**
 * instance of app.Todo
 */
const todo = new app.Todo(
    {title: 'Learn Backbone.js',
     completed: false
    });

console.log(`title = ${todo.get('title')}`); // "Learn Backbone.js"
console.log(`completed = ${todo.get('completed')}`); // false
todo.set('title', 'update Model');
console.log(`title = ${todo.get('title')}`); // "update Model"
todo.set('created_at', new Date());
console.log(`created_at = ${todo.get('created_at')}`); // "update Model"
/**
<!-- ========= -->
<!-- COLLECTION-->
<!-- ========= -->
*/
app.TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Store("backbone-todo")
  });
  
/**
 *  instance of the Collection
 */
const todoList = new app.TodoList();

todoList.create({title: 'Learn Backbone\'s Collection'}); // notice: that `completed` will be set to false by default.

const todo1 = new app.Todo({title: 'Learn Models', completed: true});
todoList.add(todo1);

console.log(todoList.pluck('title'));     // ["Learn Backbone's Collection", "Learn Models"]
console.log(todoList.pluck('completed')); // [false, true]

console.log(JSON.stringify(todoList)); // "[{"title":"Learn Backbone's Collection","completed":false,"id":"d9763e99-2267-75f5-62c3-9d7e40742aa6"},{"title":"Learn Models","completed":true}]"