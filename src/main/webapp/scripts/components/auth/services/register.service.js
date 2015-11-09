'use strict';

angular.module('productsApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


