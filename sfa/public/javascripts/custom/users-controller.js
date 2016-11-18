var usersModule = angular.module('usersModule', []);

/**
* LoginController
*/
usersModule.controller('LoginController', function ($http, $window) {
    var self = this;

    self.user = {};

    /**
     * Login handler
     */
    self.login = function() {
        // TODO implement this
        // add error messages
        /*$http.get('api/vendedores?username=' + self.user.username).then(function (data) {
            self.user = data;
        });*/
        console.log('oi??');
        $window.location.href = '/';
    };
});

/**
 * UsersController
 */
usersModule.controller('UsersController', function ($http, $location) {
    var self = this;

    self.users = [];

    /**
     * initiate controller
     */
    self.initCtrl = function() {
        // TODO change this
        self.users = customersTemp;
        //self.getUsers();
    };

    /**
     * GET users list from API
     */
    self.getUsers = function () {
        $http.get('api/vendedores').then(function (data) {
            self.users = data;
        });
    };

    /**
     * User list tab handlers
     */
    self.tab = 1;
    self.isSet = function (checkTab) {
        return self.tab === checkTab;
    };

    self.setTab = function (setTab) {
        self.tab = setTab;
    };
});

// TODO retrieve client list
var usersTemp = [
    {
        id: "Exemplo2",
        nome: 'pedro',
        password: 'pp',
        sales: 20000
    }
];