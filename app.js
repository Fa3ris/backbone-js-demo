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
app.todoList = new app.TodoList();

app.todoList.create({title: 'Learn Backbone\'s Collection'}); // notice: that `completed` will be set to false by default.

const todo1 = new app.Todo({title: 'Learn Models', completed: true});
app.todoList.add(todo1);

console.log(app.todoList.pluck('title'));     // ["Learn Backbone's Collection", "Learn Models"]
console.log(app.todoList.pluck('completed')); // [false, true]

console.log(JSON.stringify(app.todoList)); // "[{"title":"Learn Backbone's Collection","completed":false,"id":"d9763e99-2267-75f5-62c3-9d7e40742aa6"},{"title":"Learn Models","completed":true}]"


// renders individual todo items list (li)
app.TodoView = Backbone.View.extend({
    /**
     * parent tag is <li>
     */
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this; // enable chained calls
    }
});

const view = new app.TodoView({model: todo});


// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
    el: '#app-todo',
    initialize: function () {
      this.input = this.$('#new-todo');
      // when new elements are added to the collection render then with addOne
      app.todoList.on('add', this.addOne, this);
      app.todoList.on('reset', this.addAll, this);
      app.todoList.fetch(); // Loads list from local storage
    },
    events: {
      'keypress #new-todo': 'createTodoOnEnter'
    },
    createTodoOnEnter: function(e){
      if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
        return;
      }
      app.todoList.create(this.newAttributes());
      this.input.val(''); // clean input box
    },
    addOne: function(todo){
      var view = new app.TodoView({model: todo});
      $('#todo-list').append(view.render().el);
    },
    addAll: function(){
      this.$('#todo-list').html(''); // clean the todo list
      app.todoList.each(this.addOne, this);
    },
    newAttributes: function(){
      return {
        title: this.input.val().trim(),
        completed: false
      }
    }
  });
  
  //--------------
  // Initializers
  //--------------
  
  app.appView = new app.AppView();