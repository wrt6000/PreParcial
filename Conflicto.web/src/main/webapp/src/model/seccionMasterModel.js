define(['model/_seccionMasterModel'], function() { 
    App.Model.SeccionMasterModel = App.Model._SeccionMasterModel.extend({

    });

    App.Model.SeccionMasterList = App.Model._SeccionMasterList.extend({
        model: App.Model.SeccionMasterModel
    });

    return  App.Model.SeccionMasterModel;

});