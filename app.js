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