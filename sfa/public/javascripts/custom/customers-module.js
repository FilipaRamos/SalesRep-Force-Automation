var customersModule = angular.module('customersModule', []);

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
            var customerOption = '<option value="' + customer.CodCliente + '" data-subtext="&emsp;' + customer.vendas + '€" " id="customer-' + customer.CodCliente + '">' + customer.CodCliente + '</option>';
            selector.append(customerOption);
        }

        selector.selectpicker('refresh');
    };

    /**
     * Redirect to selected customer pages
     */
    self.goToCustomer = function () {
        var customerId = $("#customer-selector option:selected").text().trim();
        if (customerId) {
            window.location.replace('produto?id="' + customerId + '"');
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

    self.loading = true;
    self.customer = {};
    self.events = eventsTemp;
    self.orders = ordersTemp;

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
        console.log(id);
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.customer = data.data;
            self.loading = false;
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * GET customer orders list from API
     */
    self.getCustomerOrders = function (id) {

        $http.get('api/encomendas?clienteId=').then(function (data) {
            self.costumerOrders = data;
        });
    };

    /**
     * GET customer events list from API
     */
    self.getCustomerEvents = function (id) {
        $http.get('api/eventos?clienteId=').then(function (data) {
            self.costumerEvents = data;
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

    self.customer = customersTemp[0];

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
        $http.get('api/clientes?id=' + id).then(function (data) {
            self.costumer = data;
        });
    };

    /**
     * POST customer info through API
     */
    self.saveCustomer = function () {
        //TODO
        $http.post('api/clientes?id=' + id).then(function (data) {
            self.costumer = data;
        });
    };
});

/**
 * NewCustomerController
 */
customersModule.controller('NewCustomerController', function ($http, $location) {
    var self = this;

    self.newCustomer = {};

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
        $http.post('api/cliente', self.newCustomer).then(
            function (data) {
                self.customers.push(self.newCustomer);
                self.newCustomer = {};

                $location.path('/cliente?id=' + data.id).replace();
            },
            function (data) {
                console.log(data);
            });
    };

});

// TODO retrieve client list
var customersTemp = [
    {
        id: "Exemplo2",
        Nome: 'Exemplo2',
        NomeFiscal: "Exemplo2",
        Fac_Mor: "Porto",
        Fac_Tel: 919209872,
        NumContribuinte: 221009029,
        vendas: 2928.23
    },
    {
        id: "EFACECSA",
        Nome: 'EFACEC',
        NomeFiscal: "EFACEC SA",
        Fac_Mor: "Porto",
        Fac_Tel: 919209872,
        NumContribuinte: 221009029,
        vendas: 2922328.23
    },
    {
        id: "Exemplo3",
        Nome: 'Exemplo3',
        NomeFiscal: "Exemplo3",
        Fac_Mor: "Porto",
        Fac_Tel: 919209872,
        NumContribuinte: 221009029,
        vendas: 12
    }
];

var ordersTemp = [
    {
        id: 14351,
        cliente_id: "Manel LDA.",
        produtos: [
            {id: 61653, preco: 32.00, iva: 21, desconto: 0},
            {id: 61893, preco: 21.00, iva: 21, desconto: 0}
        ],
        status: 2,
        total: 53.00,
        data: new Date(2016, 03, 02)
    },
    {
        id: 16786,
        cliente_id: "Firmino & Firmino LDA.",
        produtos: [
            {id: 31553, preco: 10.00, iva: 21, desconto: 0},
            {id: 51293, preco: 5.00, iva: 21, desconto: 2},
        ],
        status: 1,
        total: 15.00,
        data: new Date(2016, 03, 06)
    },
    {
        id: 11302,
        cliente_id: "FVUP - Faculdade da Vida.",
        produtos: [
            {id: 56853, preco: 7.00, iva: 21, desconto: 7},
            {id: 41223, preco: 2.00, iva: 21, desconto: 1}
        ],
        status: 3,
        total: 9.00,
        data: new Date(2016, 06, 05)
    }
];

var eventsTemp = [
    {
        id: "12453253",
        tipo: "Reunião",
        descricao: "some event"
    },
    {
        id: "24564315",
        tipo: "Reunião",
        descricao: "some event"
    },
    {
        id: "85636346",
        tipo: "Reunião",
        descricao: "some event"
    },
    {
        id: "74536190",
        tipo: "Reunião",
        descricao: "some event"
    }
];