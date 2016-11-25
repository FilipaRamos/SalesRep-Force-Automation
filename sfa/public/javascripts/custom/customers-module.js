var customersModule = angular.module('customersModule', []);

customersModule.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

/**
 * CustomersController
 */
customersModule.controller('CustomersController', function ($http, $location) {
    var self = this;

    self.loading = true;
    self.customers = [];

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getCustomers();
    };

    /**
     * GET customers list from API
     */
    self.getCustomers = function () {
        $http.get(API_URL + '/api/Cliente').then(function (data) {
            self.customers = data.data;
            self.updateCustomerList();
            self.loading = false;
            console.log(self.customers);
        }, function (data) {
            console.log('Erro ao obter lista de clientes.');
            console.log(data);
        });
    };

    /**
     * Update the list from API
     */
    self.updateCustomerList = function () {
        var selector = $('#customer-selector');

        for (customerIndex in self.customers) {
            var customer = self.customers[customerIndex];
            var customerOption = '<option value="' + customer.CodCliente + '" data-subtext="&emsp;' + customer.Fac_Tel + '" " id="customer-' + customer.CodCliente + '">' + customer.Nome + '</option>';
            selector.append(customerOption);
        }

        selector.selectpicker('refresh');
    };

    /**
     * Redirect to selected customer pages
     */
    self.goToCustomer = function () {
        var customerId = $("#customer-selector option:selected").val();
        if (customerId) {
            window.location.replace('cliente?id=' + customerId);
        }
    };

    /**
     * Customer list tab handlers
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
 * CustomerController
 */
customersModule.controller('CustomerController', function ($http, $location) {
    var self = this;

    self.loadingCustomer = true;
    self.loadingOrders = true;
    self.loadingEvents = true;
    self.customer = {};
    self.events = [];
    self.orders = [];

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        self.getCustomer(id);
        self.getCustomerEvents(id);
        self.getCustomerOrders(id);
    };

    /**
     * GET customer info from API
     */
    self.getCustomer = function (id) {
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.customer = data.data;
            self.loadingCustomer = false;
            console.log(self.customer);
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * GET customer orders list from API
     */
    self.getCustomerOrders = function (id) {
        $http.get(API_URL + '/api/EncomendasCliente/' + id).then(function (data) {
            self.orders = data.data;
            self.loadingOrders = false;
            console.log(self.orders);
        }, function (data) {
            console.log('Erro ao obter encomendas de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * GET customer events list from API
     */
    self.getCustomerEvents = function (id) {
        $http.get(API_URL + '/api/ClienteReuniao/' + id).then(function (data) {
            self.events = data.data;
            self.loadingEvents = false;
            console.log(self.events);
        }, function (data) {
            console.log('Erro ao obter eventos de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * Customer list tab handlers
     */
    self.tab = 1;
    self.isSet = function (checkTab) {
        return self.tab === checkTab;
    };

    self.setTab = function (setTab) {
        self.tab = setTab;
    };

    self.prospectCustomers = function () {
        var prospectCustomers = self.customers.filter(function (customer) {
            return customer.vendas == 0;
        });

        return prospectCustomers.length > 0;
    };
});

/**
 * EditCustomerController
 */
customersModule.controller('EditCustomerController', function ($http, $location) {
    var self = this;

    self.loadingCustomer = true;
    self.customer = {};

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        self.getCustomer(id);
    };

    /**
     * GET customer info from API
     */
    self.getCustomer = function (id) {
        console.log(id);
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.customer = data.data;
            self.loadingCustomer = false;
            console.log(self.customer);
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * PUT customer info through API
     */
    self.saveCustomer = function () {
        // TODO do form validation
        console.log(self.newCustomer);

        self.waitingAPIResponse = true;

        $http({
            method: 'PUT',
            url: API_URL + '/api/Cliente/' + self.customer.CodCliente,
            headers: {'Content-Type': 'application/json'},
            data: self.newCustomer
        }).then(
            function (data) {
                console.log(data);
                if(data.status==200) {
                    window.location.replace('/Cliente?id=' + self.customer.CodCliente);
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

/**
 * NewCustomerController
 */
customersModule.controller('NewCustomerController', function ($http, $location) {
    var self = this;

    self.newCustomer = {};
    self.waitingAPIResponse = false;

    /**
     * initiate controller
     */
    self.initCtrl = function () {
    };

    /**
     * Add customer through API
     */
    self.addCustomer = function () {
        // TODO do form validation
        console.log(self.newCustomer);

        self.waitingAPIResponse = true;

        $http({
            method: 'POST',
            url: API_URL + '/api/Cliente',
            headers: {'Content-Type': 'application/json'},
            data: self.newCustomer
        }).then(
            function (data) {
                console.log(data);
                if(data.status==201) {
                    window.location.replace('/Cliente?id=' + self.newCustomer.CodCliente);
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

/**
 * CustomersControllerAdmin
 */
customersModule.controller('CustomersControllerAdmin', function ($http, $location) {
    var self = this;

    self.loading = true;
    self.customers = [];

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getCustomersStats();
    };

    /**
     * GET customers list from API
     */
    self.getCustomersStats = function () {
        $http.get(API_URL + '/api/vendascliente').then(function (data) {
            self.customers = data.data;
            self.loading = false;
            console.log(self.customers);
        }, function (data) {
            console.log('Erro ao obter lista de clientes.');
            console.log(data);
        });
    };

    /**
     * Customer list tab handlers
     */
    self.tab = 1;
    self.isSet = function (checkTab) {
        return self.tab === checkTab;
    };

    self.setTab = function (setTab) {
        self.tab = setTab;
    };
});