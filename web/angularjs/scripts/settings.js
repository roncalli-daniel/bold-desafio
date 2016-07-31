/**
 * Class to storage app settings
 */
App.factory('Settings', ['$rootScope',  function($rootScope) {
    var settings = { };

    settings.production = false;
    settings.url_error = "#/error";

    settings.token = null;
    settings.hashtag = null;

    $rootScope.settings = settings;

    return settings;
}]);