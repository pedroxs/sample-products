'use strict';

angular.module('productsApp')
    .factory('CategorySearch', function ($resource) {
        return $resource('api/_search/categories/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
