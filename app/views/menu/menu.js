/**
 * Created by lelabo on 14/04/17.
 */
angular.module('gurps-online').controller('menuCtrl', function ($rootScope, $scope, $state, $location,
                                                                $mdSidenav, MenuService, AuthService) {

    this.autoFocusContent = false;
    this.menu = MenuService;
    this.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    this.logout = function () {
        AuthService.logout();
        $state.go('login');
    };
    this.goHome = function () {
        $state.go('app');
    };
    this.isOpen = function(section) {
        return MenuService.isSectionSelected(section);
    };
    this.toggleOpen = function(section) {
        MenuService.toggleSelectSection(section);
    };
    this.isNavOpen = function () {
        return $mdSidenav('left').isOpen() || $mdSidenav('left').isLockedOpen();
    };
    this.toggleNav = function () {
        $mdSidenav('left').toggle();
    }
});

