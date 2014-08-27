define(['model/_cursoMasterModel'], function() { 
    App.Model.CursoMasterModel = App.Model._CursoMasterModel.extend({

    });

    App.Model.CursoMasterList = App.Model._CursoMasterList.extend({
        model: App.Model.CursoMasterModel
    });

    return  App.Model.CursoMasterModel;

});