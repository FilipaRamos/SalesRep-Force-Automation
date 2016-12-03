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
    self.loading = true;

    /**
     * initiate controller
     */
    self.initCtrl = function() {
        // TODO change this
        self.users = usersTemp;
        self.getUsers();
    };

    /**
     * GET users list from API
     */
    self.getUsers = function () {
        $http.get(API_URL + '/api/vendasvendedor').then(function (data) {
            self.users = data.data;
            self.loading=false;
            console.log(data.data);
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

/**
 * UserController
 */
usersModule.controller('UserController', function ($http, $location) {
    var self = this;

    self.user = {};
    self.events = {};

    /**
     * initiate controller
     */
    self.initCtrl = function(id) {
        // TODO
        self.user = usersTemp[0];
        //self.getUser(id);
        //self.getUserEvents(id);
    };

    /**
     * GET users list from API
     */
    self.getUser = function (id) {
        $http.get('api/vendedores?id=' + id).then(function (data) {
            self.user = data;
        });
    };

    /**
     * GET user's event list from API
     */
    self.getUserEvents = function (id) {
        $http.get('api/Eventos?id=' + id).then(function (data) {
            self.user = data;
        });
    };

});

/**
 * UserController
 */
usersModule.controller('NewUserController', function ($http, $location) {
    var self = this;

    self.newUser = {};
    self.waitingAPIResponse = false;

    /**
     * initiate controller
     */
    self.initCtrl = function () {
    };

    /**
     * Add customer through API
     */
    self.addUser = function () {
        // TODO do form validation
        console.log(self.newUser);

        self.waitingAPIResponse = true;

        $http({
            method: 'POST',
            url: API_URL + '/api/vendedores',
            headers: {'Content-Type': 'application/json'},
            data: self.newUser
        }).then(
            function (data) {
                console.log(data);
                if(data.status==201) {
                    window.location.replace('/vendedor?id=' + data.data.VendedorId);
                }else{
                    self.waitingAPIResponse = false;
                    self.errorMessage = data.data;
                }
            },
            function (data) {
                console.log(data);
                self.waitingAPIResponse = false;
                self.errorMessage = data.data;
            });
    };
});