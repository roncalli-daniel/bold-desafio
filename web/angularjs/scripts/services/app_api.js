(function() {
    'use strict';

    angular
            .module('app')
            .factory('AppApi', API);

    function API(Settings, $http) {

        var URL = (Settings.production ? "http://api.bold.s10.cc/" : "http://api.bold.dev/");

        var api = {};

        function parseUri(path) {
            return URL + path;
        }

        api.getToken = function() {
            return $http( { method: 'GET', url: parseUri('tokens') } )
                    .then(function(r) {
                        return r.data.data;
                    }
            );
        }

        api.getTweets = function(take, skip, query) {
            return $http( {
                method: 'GET',
                url: parseUri('tweets'),
                params: {
                    take: take,
                    skip: skip,
                    query: query
                }} )
                .then(function(r) {
                        return r.data.data;
                    }
                );
        }

        api.syncTweets = function() {
            return $http( { method: 'PUT', url: parseUri('sync') } )
                .then(function(r) {
                        return r.data;
                    }
                );
        }

        return api;
    }
})();