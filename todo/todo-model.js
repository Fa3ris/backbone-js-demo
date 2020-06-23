/**
 * Define a Model Todo
 */
export const Todo = Backbone.Model.extend({
    /**
     * Default values
     */
    defaults: {
        title: '',
        completed: false
    }
});
