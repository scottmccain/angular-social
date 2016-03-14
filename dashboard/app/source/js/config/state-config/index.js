module.exports = function ($stateProvider, $urlRouterProvider, viewUrl) {
    // Make sure to end urls with a trailing '/'
    // See https://github.com/angular-ui/ui-router/issues/50

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: viewUrl('login/index.html'),
        controller: 'LoginController',
        data: {
            allowAnonymous: true
        }
    });
    
            // Catch-all state for invalid URLs
    // Note: This state must be defined last
    $stateProvider.state('otherwise', {
        url: '*path',
        controller: function ($state, sessionService) {

            $state.go('login');
        }
    });
};