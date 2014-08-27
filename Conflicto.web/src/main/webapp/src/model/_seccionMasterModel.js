define([], function() {
    App.Model._SeccionMasterModel = Backbone.Model.extend({
		initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('seccion-master-model-error', error);
            });
        },
        validate: function(attrs, options){
        	var modelMaster = new App.Model.SeccionModel();
        	if(modelMaster.validate){
            	return modelMaster.validate(attrs.seccionEntity,options);
            }
        }
    });

    App.Model._SeccionMasterList = Backbone.Collection.extend({
        model: App.Model._SeccionMasterModel,
        initialize: function() {
        }

    });
    return App.Model._SeccionMasterModel;
    
});