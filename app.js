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