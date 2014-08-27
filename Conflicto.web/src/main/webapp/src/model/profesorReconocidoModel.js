define(['model/profesorReconocidoModel'], function() {
//Aqu� se define la estructura de un �tem de la lista. Note que el modelo extiende el modelo est�ndar backbone.
    App.Model.ProfesorReconocidoModel = Backbone.Model.extend({
        defaults: {
         'name' : '',
         'anios' : '',
         'reconocido' : ''
        },
        getDisplay: function(name) {
         return this.get(name);
        }
        });
//Aqu� se define el modelo de la lista. El modelo de la lista extiende de Backbone.Collection. En el atributo �model� se define el modelo  (definido arriba) que corresponde al molde de cada uno de los �tems de la lista.
    App.Model.ProfesorReconocidoList = Backbone.Collection.extend({
        model: App.Model.ProfesorReconocidoModel
    });
    return  App.Model.ProfesorReconocidoModel;
});