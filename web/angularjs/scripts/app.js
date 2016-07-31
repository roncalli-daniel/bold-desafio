var App = angular.module("app", [
    "ui.router", 
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngAnimate",
    "blockUI",
    "toastr"
]);

App.factory('responseObserver', function responseObserver($q, $window, Settings, blockUI) {
    return {
        'responseError': function(errorResponse) {
            blockUI.stop();
            $window.location = Settings.url_error;
            return $q.reject(errorResponse);
        }
    };
});