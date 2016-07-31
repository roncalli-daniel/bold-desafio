(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', Controller);

    function Controller(AppApi, Settings, $window, toastr) {
        var vm = this;

        vm.model = {
            hashtag: null,
            query: null,
            tweets_count: 0,
            tweets_take: 3,
            tweets_skip: 0,
            tweets: []
        }

        function initController() {
            vm.loadConfig();
            vm.syncTweets();
        }

        vm.reset = function() {
            vm.model.tweets_count = 0;
            vm.model.tweets_take = 3;
            vm.model.tweets_skip = 0;
            vm.model.tweets = [];
        }

        vm.scrollTop = function () {
            $window.scrollTo(0, 0);
        }

        vm.loadConfig = function() {
            AppApi.getToken().then(function(r) {
                Settings.token = r.token;
                Settings.hashtag = r.hashtag;
                vm.model.hashtag = '#' + r.hashtag;
            });
        }

        vm.loadTweets = function() {
            AppApi.getTweets(vm.model.tweets_take, vm.model.tweets_skip, vm.model.query).then(function(r) {
                vm.model.tweets = vm.model.tweets.concat(r.tweets)
                vm.model.tweets_count = r.count;
                vm.model.tweets_skip += vm.model.tweets_take;

                if(r.count == 0)
                    toastr.warning('Nenhum tweet encontrado...');
            });
        }

        vm.searchTweets = function() {
            vm.reset();
            vm.loadTweets();
        }

        vm.syncTweets = function() {
            AppApi.syncTweets().then(function(r) {
                vm.reset();
                vm.loadTweets();
                vm.scrollTop();

                if(r.data == 0) {
                    toastr.warning('Todos os últimos tweets já foram sincronizados.');
                }
                else if(r.data == 1) {
                    toastr.success('1 tweet foi sincronizado.');
                }
                else {
                    toastr.success(r.data + ' tweets foram sincronizados.');
                }
            });
        }

        initController();
    }
})();
