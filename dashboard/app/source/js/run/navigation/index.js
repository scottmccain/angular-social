exports = function ($rootScope, $state, $log, $timeout, sessionService) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        // if the user is not authenticated and the state does not
        // allow anonymous access then redirect to /login

        function allowAnonymous(state) {
            return state.data && state.data.allowAnonymous;
        }

        if (!allowAnonymous(toState) && !sessionService.hasSession()) {
            event.preventDefault();
            $state.go('login');
            return;
        }
    });

    $rootScope.$on('session-expired', function () {
        sessionService.destroySession();
        $timeout(function () {
            $state.go('session-expired');
        }, 0);
    });
};
    