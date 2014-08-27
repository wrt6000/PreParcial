define([], function() {
    App.Model._CursoMasterModel = Backbone.Model.extend({
		initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('curso-master-model-error', error);
            });
        },
        validate: function(attrs, options){
        	var modelMaster = new App.Model.CursoModel();
        	if(modelMaster.validate){
            	return modelMaster.validate(attrs.cursoEntity,options);
            }
        }
    });

    App.Model._CursoMasterList = Backbone.Collection.extend({
        model: App.Model._CursoMasterModel,
        initialize: function() {
        }

    });
    return App.Model._CursoMasterModel;
    
});