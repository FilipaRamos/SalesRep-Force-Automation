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
    self.login = function () {
        // TODO implement erro messages
        if (!self.user.Email || !self.user.Password) {
            return;
        }

        var target = self.user.Email;
        var email = target.split('.').join('_-_');

        $http.get(API_URL + '/api/vendedores/' + email).then(function (data) {
            console.log(data.data);
            if (self.user.Password == data.data.Password) {
                self.user = data.data;

                console.log('login ok');

                $http({
                    method: 'POST',
                    url: '/entrar',
                    headers: {'Content-Type': 'application/json'},
                    data: {login: true, user: self.user}
                }).then(function (response) {
                    if (response.data.status == 'success') {
                        window.location.replace('/');
                    } else {
                        console.log(response);
                    }
                });
            } else {
                console.log('login failed');
            }
        });
    };
});

/**
 * SessionController
 */
usersModule.controller('SessionController', function ($http, $window) {
    var self = this;

    self.user = null;

    self.initCtrl = function (user) {
        if(user!='null'){
            self.getUser(user);
        }
    };

    self.getUser = function (user) {
        $http.get(API_URL + '/api/vendedores/' + user).then(function (response) {
            console.log(response.data);
            self.user = response.data;
        });
    };

    /**
     * Logout handler
     */
    self.logout = function () {
        $http({
            method: 'POST',
            url: '/entrar',
            headers: {'Content-Type': 'application/json'},
            data: {logout: true}
        }).then(function (response) {
            if (response.data.status == 'success') {
                window.location.replace('/');
            } else {
                console.log(response);
            }
        });
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
    self.initCtrl = function () {
        self.getUsers();
    };

    self.findUser = function (id) {
        for(var i=0; i<self.users.length; i++){
            if(self.users[i].VendedorID == id){
                return true;
            }
        }

        return false;
    };

    /**
     * GET users list from API
     */
    self.getUsers = function () {
        $http.get(API_URL + '/api/vendasvendedor').then(function (data) {
            self.users = self.users.concat(data.data);

            self.getAllUsers();

            self.loading = false;
            console.log(data.data);
        });
    };

    /**
     * GET users list from API
     */
    self.getAllUsers = function () {
        $http.get(API_URL + '/api/vendedores').then(function (data) {
            for(var i=0; i<data.data.length; i++){
                if(!self.findUser(data.data[i].VendedorID)) {
                    self.users.push(data.data[i]);
                }
            }

            self.loading = false;
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
    self.initCtrl = function (id) {
        self.getUser(id);
        self.getUserEvents(id);
    };

    /**
     * GET user list from API
     */
    self.getUser = function (user) {
        $http.get(API_URL + '/api/vendedores/' + user).then(function (response) {
            console.log(response.data);
            self.user = response.data;
            self.user.CPostal = self.user.CPostal.replace('.', '-');
        });
    };

    /**
     * GET user's event list from API
     */
    self.getUserEvents = function (id) {
        $http.get(API_URL + '/api/Reuniao/').then(function (response) {
            self.events = response.data;

            console.log(self.events);
            self.events = self.events.filter(function (event) {
                event.CodVendedor == id;
            });

            console.log(self.events);
        });
    };

});

/**
 * UserController
 */
usersModule.controller('NewUserController', function ($http, $location) {
    var self = this;

    self.user = {};
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

        if (self.user.Password != self.user.PasswordConf) {
            console.error("Passowrds don't match");
            return;
        }

        //self.user.Password = sha256(self.user.Password);

        console.log(self.user);

        self.waitingAPIResponse = true;

        $http({
            method: 'POST',
            url: API_URL + '/api/vendedores',
            headers: {'Content-Type': 'application/json'},
            data: self.user
        }).then(
            function (data) {
                console.log(data);
                if (data.status == 201) {
                    window.location.replace('/perfil?id=' + data.data.VendedorID);
                } else {
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