var ordersModule = angular.module('ordersModule', ['customersModule']);

/**
 * OrdersController
 */

ordersModule.controller('OrdersController', function ($http, $location) {
    var self = this;

    self.orders = [];

    /**
     * initiate controller
     */
    self.initCtrl = function(customerId){
        // TODO change this
        self.orders = ordersTemp;
        //self.getOrders(customerId);
    };

    /**
     * GET orders list from API
     */
    self.getOrders = function (customerId) {
        // TODO adapt to specific customer
        $http.get('api/clientes').then(function (data) {
            self.orders = data;
        });
    };

    /**
     * Order tab handlers
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
 * OrderController
 */
ordersModule.controller('OrderController', function ($http, $location) {
    var self = this;

    self.order = ordersTemp[0];
    self.events = eventsTemp;
    self.orders = ordersTemp;

    /**
     * initiate controller
     */
    self.initCtrl = function(id){
        self.getOrder(id);
    };

    /**
     * GET order info from API
     */
    self.getOrder = function (id) {
        $http.get('api/clientes?id=' + id).then(function (data) {
            self.costumer = data;
        });
    };

    /**
     * GET order orders list from API
     */
    self.getOrderOrders = function () {

        $http.get('api/encomendas?clienteId=').then(function (data) {
            self.costumerOrders = data;
        });
    };
});

/**
 * NewOrderController
 */
ordersModule.controller('NewOrderController', function ($http, $location) {
    var self = this;

    self.newOrder = {};

    /**
     * Initiate controller
     */
    self.initCtrl = function(){};

    /**
     * Add order through API
     */
    self.addOrder = function () {
        // TODO do form validation
        $http.post('api/encomennda', self.newOrder).then(
            function (data) {
                self.orders.push(self.newOrder);
                self.newOrder = {};

                $location.path('/encomenda?id=' + data.id).replace();
            },
            function (data) {
                console.log(data);
            });
    };

    // displays the order price
    self.total = function(){
        var total = 0;
        self.products.forEach(function(element){
            total += ((element.iva/100)+1)*((element.price * element.quantity) - (element.discount * element.quantity));
        });
        return total;
    };

    // adds a product
    self.addProduct = function(){
        self.products.push(
            {'id' : Math.floor((Math.random() * 99999) + 1),
                'quantity': Math.floor((Math.random() * 5) + 1),
                'price':  Math.floor((Math.random() * 10) + 1),
                'iva': Math.floor((Math.random() * 26) + 1),
                'discount': 0.20
            });
    };

    // remove a product
    self.removeProduct = function(){
        if( self.selected >= 0) {
            self.products.splice(self.getSelected(self.selected), 1);
            self.selected = -1;
        }
    };

    // edit a product
    self.editProduct = function(){
        if( self.selected >= 0) {
            self.products[self.getSelected(self.selected)].quantity = Math.floor((Math.random() * 5) + 1);
            self.products[self.getSelected(self.selected)].price = Math.floor((Math.random() * 10) + 1);
            self.products[self.getSelected(self.selected)].iva = Math.floor((Math.random() * 26) + 1);
            self.products[self.getSelected(self.selected)].discount = 0.20;
        }
    };

    // allows product selection
    self.selectProduct = function(id){
       self.selected = id;
    };

    // get index of selected product
    self.getSelected = function(id){
        for (var i = 0; i < self.products.length ; i++){
            if (self.products[i].id == id)
                return i;
        }
    };

    // array of products
    self.products = [
        {'id' : 15781, 'quantity' : 2, 'price' : 3 , 'iva' : 23, 'discount' : 0.20},
        {'id' : 74694, 'quantity' : 4, 'price' : 1 , 'iva' : 21, 'discount' : 0.40}
    ];

    self.selected = -1;

});

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