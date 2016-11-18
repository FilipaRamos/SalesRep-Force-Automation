var customersModule = angular.module('customersModule', []);

/**
 * CustomersController
 */
customersModule.controller('CustomersController', function ($http, $location) {
    var self = this;

    self.costumers = [];

    /**
     * initiate controller
     */
    self.initCtrl = function(){
        // TODO change this
        self.customers = customersTemp;
        //self.getCustomers();
    };

    /**
     * GET customers list from API
     */
    self.getCustomers = function () {
        $http.get('api/clientes').then(function (data) {
            self.customers = data;
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

/**
 * CustomerController
 */
customersModule.controller('CustomerController', function ($http, $location) {
    var self = this;

    self.customer = customersTemp[0];
    self.events = eventsTemp;
    self.orders = ordersTemp;

    /**
     * initiate controller
     */
    self.initCtrl = function(id){
        self.getCustomer(id);
        self.getCustomerEvents();
        self.getCustomerOrders();
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
     * GET customer orders list from API
     */
    self.getCustomerOrders = function () {

        $http.get('api/encomendas?clienteId=').then(function (data) {
            self.costumerOrders = data;
        });
    };

    /**
     * GET customer events list from API
     */
    self.getCustomerEvents = function () {
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
    self.initCtrl = function(){};

    /**
     * Add customer through API
     */
    self.addCustomer = function () {
        // TODO do form validation
        $http.post('api/cliente', self.newCustomer).then(
            function (data) {
                self.customers.push(self.newCustomer);
                self.newCustomer = {};

                $location.path('/clientes?id=' + data.id).replace();
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
        nome: 'Exemplo2',
        nome_fiscal: "Exemplo2",
        morada: "Porto",
        telefone: 919209872,
        contribuinte: 221009029,
        vendas: 2928.23
    },
    {
        id: "EFACECSA",
        nome: 'EFACEC',
        nome_fiscal: "EFACEC SA",
        morada: "Porto",
        telefone: 919209872,
        contribuinte: 221009029,
        vendas: 2922328.23
    },
    {
        id: "Exemplo3",
        nome: 'Exemplo3',
        nome_fiscal: "Exemplo3",
        morada: "Porto",
        telefone: 919209872,
        contribuinte: 221009029,
        vendas: 0
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
    {id: "12453253"},
    {id: "24564315"},
    {id: "85636346"},
    {id: "74536190"}
];