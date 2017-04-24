/**
 * Created by lelabo on 14/04/17.
 */
angular.module('gurps-online').controller('menuCtrl', function ($rootScope, $scope, $state, $location,
                                                                $mdSidenav, menu, AuthService) {

    this.autoFocusContent = false;
    this.menu = menu;
    this.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    this.logout = function () {
        this.currentSection = null;
        AuthService.logout();
        $state.go('login');
    };
    this.goHome = function () {
        this.currentSection = null;
        $state.go('app');
    };
    this.isOpen = function(section) {
        return menu.isSectionSelected(section);
    };
    this.toggleOpen = function(section) {
        menu.toggleSelectSection(section);
    };
    this.isNavOpen = function () {
        return $mdSidenav('left').isOpen() || $mdSidenav('left').isLockedOpen();
    };
    this.toggleNav = function () {
        $mdSidenav('left').toggle();
    }
});

