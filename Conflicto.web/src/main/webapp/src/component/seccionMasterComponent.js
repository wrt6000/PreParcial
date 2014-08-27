define(['controller/selectionController', 'model/cacheModel', 'model/seccionMasterModel', 'component/_CRUDComponent', 'controller/tabController', 'component/seccionComponent',
 'component/estudianteComponent'
 ,
 'component/estudianteComponent'
 
 ],function(SelectionController, CacheModel, SeccionMasterModel, CRUDComponent, TabController, SeccionComponent,
 enEspera_seccionComponent
 ,
 inscritos_seccionComponent
 ) {
    App.Component.SeccionMasterComponent = App.Component.BasicComponent.extend({
        initialize: function() {
            var self = this;
            this.configuration = App.Utils.loadComponentConfiguration('seccionMaster');
            var uComponent = new SeccionComponent();
            uComponent.initialize();
            uComponent.render('main');
            Backbone.on(uComponent.componentId + '-post-seccion-create', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-post-seccion-edit', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-pre-seccion-list', function() {
                self.hideChilds();
            });
            Backbone.on('seccion-master-model-error', function(error) {
                Backbone.trigger(uComponent.componentId + '-' + 'error', {event: 'seccion-master-save', view: self, message: error});
            });
            Backbone.on(uComponent.componentId + '-instead-seccion-save', function(params) {
                self.model.set('seccionEntity', params.model);
                if (params.model) {
                    self.model.set('id', params.model.id);
                } else {
                    self.model.unset('id');
                }
                var enEspera_seccionModels = self.enEspera_seccionComponent.componentController.estudianteModelList;
                self.model.set('listenEspera_seccion', []);
                self.model.set('createenEspera_seccion', []);
                self.model.set('updateenEspera_seccion', []);
                self.model.set('deleteenEspera_seccion', []);
                for (var i = 0; i < enEspera_seccionModels.models.length; i++) {
                    var m =enEspera_seccionModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createenEspera_seccion').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateenEspera_seccion').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < enEspera_seccionModels.deletedModels.length; i++) {
                    var m = enEspera_seccionModels.deletedModels[i];
                    self.model.get('deleteenEspera_seccion').push(m.toJSON());
                }
                var inscritos_seccionModels = self.inscritos_seccionComponent.componentController.estudianteModelList;
                self.model.set('listinscritos_seccion', []);
                self.model.set('createinscritos_seccion', []);
                self.model.set('updateinscritos_seccion', []);
                self.model.set('deleteinscritos_seccion', []);
                for (var i = 0; i < inscritos_seccionModels.models.length; i++) {
                    var m =inscritos_seccionModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createinscritos_seccion').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateinscritos_seccion').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < inscritos_seccionModels.deletedModels.length; i++) {
                    var m = inscritos_seccionModels.deletedModels[i];
                    self.model.get('deleteinscritos_seccion').push(m.toJSON());
                }
                self.model.save({}, {
                    success: function() {
                        Backbone.trigger(uComponent.componentId + '-post-seccion-save', self);
                    },
                    error: function(error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-master-save', view: self, error: error});
                    }
                });
            });
        },
        renderChilds: function(params) {
            var self = this;
            this.tabModel = new App.Model.TabModel(
                    {
                        tabs: [
                            {label: "En Espera_seccion", name: "enEspera_seccion", enable: true},
                            ,
                            {label: "Inscritos_seccion", name: "inscritos_seccion", enable: true},
                        ]
                    }
            );

            this.tabs = new TabController({model: this.tabModel});

            this.tabs.render('tabs');
            App.Model.SeccionMasterModel.prototype.urlRoot = this.configuration.context;
            var options = {
                success: function() {
					self.enEspera_seccionComponent = new enEspera_seccionComponent();
                    self.enEspera_seccionModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.EstudianteModel), self.model.get('listenEspera_seccion'));
                    self.enEspera_seccionComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.EstudianteModel),
                        listModelClass: App.Utils.createCacheList(App.Model.EstudianteModel, App.Model.EstudianteList, self.enEspera_seccionModels)
                    });
                    self.enEspera_seccionComponent.render(self.tabs.getTabHtmlId('enEspera_seccion'));
                    Backbone.on(self.enEspera_seccionComponent.componentId + '-post-estudiante-create', function(params) {
                        params.view.currentEstudianteModel.setCacheList(params.view.estudianteModelList);
                    });
					self.inscritos_seccionComponent = new inscritos_seccionComponent();
                    self.inscritos_seccionModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.EstudianteModel), self.model.get('listinscritos_seccion'));
                    self.inscritos_seccionComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.EstudianteModel),
                        listModelClass: App.Utils.createCacheList(App.Model.EstudianteModel, App.Model.EstudianteList, self.inscritos_seccionModels)
                    });
                    self.inscritos_seccionComponent.render(self.tabs.getTabHtmlId('inscritos_seccion'));
                    Backbone.on(self.inscritos_seccionComponent.componentId + '-post-estudiante-create', function(params) {
                        params.view.currentEstudianteModel.setCacheList(params.view.estudianteModelList);
                    });
                    self.enEspera_seccionToolbarModel = self.enEspera_seccionComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.enEspera_seccionComponent.setToolbarModel(self.enEspera_seccionToolbarModel);
                    self.inscritos_seccionToolbarModel = self.inscritos_seccionComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.inscritos_seccionComponent.setToolbarModel(self.inscritos_seccionToolbarModel);
                	
                     
                
                    Backbone.on(self.enEspera_seccionComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"enEspera_seccionComponent"});
                        App.Utils.getComponentList('estudianteComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no En Espera_seccions to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'En Espera_seccion List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('enEspera_seccionComponent-post-selection', function(models) {
                        var cacheenEspera_seccionModel = App.Utils.createCacheModel(App.Model.EstudianteModel);
                        models = App.Utils.convertToModel(cacheenEspera_seccionModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.enEspera_seccionComponent.componentController.estudianteModelList);
                        	model.save('',{});
                        }
                        self.enEspera_seccionComponent.componentController.showEdit=false;
                        self.enEspera_seccionComponent.componentController.list();
                        
                    });
                    Backbone.on(self.inscritos_seccionComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"inscritos_seccionComponent"});
                        App.Utils.getComponentList('estudianteComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Inscritos_seccions to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Inscritos_seccion List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('inscritos_seccionComponent-post-selection', function(models) {
                        var cacheinscritos_seccionModel = App.Utils.createCacheModel(App.Model.EstudianteModel);
                        models = App.Utils.convertToModel(cacheinscritos_seccionModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.inscritos_seccionComponent.componentController.estudianteModelList);
                        	model.save('',{});
                        }
                        self.inscritos_seccionComponent.componentController.showEdit=false;
                        self.inscritos_seccionComponent.componentController.list();
                        
                    });
                    $('#tabs').show();
                },
                error: function() {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'seccion-edit', view: self, id: id, data: data, error: error});
                }
            };
            if (params.id) {
                self.model = new App.Model.SeccionMasterModel({id: params.id});
                self.model.fetch(options);
            } else {
                self.model = new App.Model.SeccionMasterModel();
                options.success();
            }


        },
        hideChilds: function() {
            $('#tabs').hide();
        }
    });

    return App.Component.SeccionMasterComponent;
});