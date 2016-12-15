var customersModule = angular.module('customersModule', ['usersModule']);

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
    self.topCustomers = [];

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
            self.getCustomersStats();
            console.log(data);
        }, function (data) {
            console.log('Erro ao obter lista de clientes.');
            console.log(data);
        });
    };

    /**
     * GET top customers list from API
     */
    self.getCustomersStats = function () {
        $http.get(API_URL + '/api/vendascliente').then(function (data) {
            self.topCustomers = data.data;
            self.loading = false;
            console.log(data);

            var findUserIndex = function (id) {
              for(var i=0; i<self.customers.length; i++){
                  if(self.customers[i].CodCliente==id){
                      return i;
                  }
              }
              return -1;
            };

            for(var i=0; i<self.topCustomers.length; i++){
                var customerIndex = findUserIndex(self.topCustomers[i].ClienteID);
                if(customerIndex != -1){
                    console.log(self.topCustomers[i].Vendas);
                    self.customers[customerIndex].Vendas = self.topCustomers[i].Vendas;
                    console.log(self.customers[customerIndex].Vendas);
                }
            }

        }, function (data) {
            console.log('Erro ao obter lista de esattísticas de clientes.');
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
    self.salesReps = [];
    self.showAllEvents = false;
    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        if(id==null || id=='null'){
            return;
        }

        self.getCustomer(id);
        self.getCustomerEvents(id);
        self.getCustomerOrders(id);
        self.getSalesReps();
    };

    /**
     * GET users list from API
     */
    self.getSalesReps = function () {
        $http.get(API_URL + '/api/vendedores').then(function (data) {
            self.salesReps = data.data;

            self.matchSalesReps();

            console.log(data.data);
        });
    };

    self.matchSalesReps = function () {
        var findSalesRepByID = function (id) {
            for(var i=0; i<self.salesReps.length; i++){
                if(self.salesReps[i].VendedorID == id){
                    return self.salesReps[i];
                }
            }
            return {Nome: 'Not found.'};
        };

        for(var i=0; i<self.orders.length; i++){
            self.orders[i].Nome = findSalesRepByID(self.orders[i].Responsavel).Nome;
        }

        for(var i=0; i<self.events.length; i++){
            self.events[i].Nome = findSalesRepByID(self.events[i].CodVendedor).Nome;
        }
    };

    self.orderScope = function (scope) {
        return scope == 'customer';
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

            if(self.salesReps.length > 0) {
                self.matchSalesReps();
            }

            console.log(data);
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

            if(self.salesReps.length > 0) {
                self.matchSalesReps();
            }

            console.log(data);
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
            return customer.Vendas == 0;
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
    self.condPags = [];

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getCondPags();
    };

    self.getCondPags = function () {
        $http.get(API_URL + '/api/CondPag/').then(function (data) {
            self.condPags = data.data;

            console.log(data.data);
        });
    };

    /**
     * Add customer through API
     */
    self.addCustomer = function () {
        // TODO do form validation

        // set event type ID
        var selectBox = document.getElementById("pay-selector");
        self.newCustomer.CondPag = selectBox.options[selectBox.selectedIndex].value;

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