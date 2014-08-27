define(['controller/selectionController', 'model/cacheModel', 'model/cursoMasterModel', 'component/_CRUDComponent', 'controller/tabController', 'component/cursoComponent',
 'component/seccionComponent'
 
 ],function(SelectionController, CacheModel, CursoMasterModel, CRUDComponent, TabController, CursoComponent,
 seccion_cursoComponent
 ) {
    App.Component.CursoMasterComponent = App.Component.BasicComponent.extend({
        initialize: function() {
            var self = this;
            this.configuration = App.Utils.loadComponentConfiguration('cursoMaster');
            var uComponent = new CursoComponent();
            uComponent.initialize();
            uComponent.render('main');
            Backbone.on(uComponent.componentId + '-post-curso-create', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-post-curso-edit', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-pre-curso-list', function() {
                self.hideChilds();
            });
            Backbone.on('curso-master-model-error', function(error) {
                Backbone.trigger(uComponent.componentId + '-' + 'error', {event: 'curso-master-save', view: self, message: error});
            });
            Backbone.on(uComponent.componentId + '-instead-curso-save', function(params) {
                self.model.set('cursoEntity', params.model);
                if (params.model) {
                    self.model.set('id', params.model.id);
                } else {
                    self.model.unset('id');
                }
                var seccion_cursoModels = self.seccion_cursoComponent.componentController.seccionModelList;
                self.model.set('listseccion_curso', []);
                self.model.set('createseccion_curso', []);
                self.model.set('updateseccion_curso', []);
                self.model.set('deleteseccion_curso', []);
                for (var i = 0; i < seccion_cursoModels.models.length; i++) {
                    var m =seccion_cursoModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createseccion_curso').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateseccion_curso').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < seccion_cursoModels.deletedModels.length; i++) {
                    var m = seccion_cursoModels.deletedModels[i];
                    self.model.get('deleteseccion_curso').push(m.toJSON());
                }
                self.model.save({}, {
                    success: function() {
                        Backbone.trigger(uComponent.componentId + '-post-curso-save', self);
                    },
                    error: function(error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'curso-master-save', view: self, error: error});
                    }
                });
            });
        },
        renderChilds: function(params) {
            var self = this;
            this.tabModel = new App.Model.TabModel(
                    {
                        tabs: [
                            {label: "Seccion_curso", name: "seccion_curso", enable: true},
                        ]
                    }
            );

            this.tabs = new TabController({model: this.tabModel});

            this.tabs.render('tabs');
            App.Model.CursoMasterModel.prototype.urlRoot = this.configuration.context;
            var options = {
                success: function() {
					self.seccion_cursoComponent = new seccion_cursoComponent();
                    self.seccion_cursoModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.SeccionModel), self.model.get('listseccion_curso'));
                    self.seccion_cursoComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.SeccionModel),
                        listModelClass: App.Utils.createCacheList(App.Model.SeccionModel, App.Model.SeccionList, self.seccion_cursoModels)
                    });
                    self.seccion_cursoComponent.render(self.tabs.getTabHtmlId('seccion_curso'));
                    Backbone.on(self.seccion_cursoComponent.componentId + '-post-seccion-create', function(params) {
                        params.view.currentSeccionModel.setCacheList(params.view.seccionModelList);
                    });
                    self.seccion_cursoToolbarModel = self.seccion_cursoComponent.toolbarModel.set(App.Utils.Constans.referenceToolbarConfiguration);
                    self.seccion_cursoComponent.setToolbarModel(self.seccion_cursoToolbarModel);                    
                	
                     
                
                    $('#tabs').show();
                },
                error: function() {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'curso-edit', view: self, id: id, data: data, error: error});
                }
            };
            if (params.id) {
                self.model = new App.Model.CursoMasterModel({id: params.id});
                self.model.fetch(options);
            } else {
                self.model = new App.Model.CursoMasterModel();
                options.success();
            }


        },
        hideChilds: function() {
            $('#tabs').hide();
        }
    });

    return App.Component.CursoMasterComponent;
});