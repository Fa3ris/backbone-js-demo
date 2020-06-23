export const TodoView = Backbone.View.extend({
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