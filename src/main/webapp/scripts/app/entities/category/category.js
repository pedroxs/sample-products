'use strict';

angular.module('productsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('category', {
                parent: 'entity',
                url: '/categories',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'productsApp.category.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/category/categories.html',
                        controller: 'CategoryController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('category');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('category.detail', {
                parent: 'entity',
                url: '/category/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'productsApp.category.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/category/category-detail.html',
                        controller: 'CategoryDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('category');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Category', function($stateParams, Category) {
                        return Category.get({id : $stateParams.id});
                    }]
                }
            })
            .state('category.new', {
                parent: 'category',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/category/category-dialog.html',
                        controller: 'CategoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('category', null, { reload: true });
                    }, function() {
                        $state.go('category');
                    })
                }]
            })
            .state('category.edit', {
                parent: 'category',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/category/category-dialog.html',
                        controller: 'CategoryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Category', function(Category) {
                                return Category.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('category', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
