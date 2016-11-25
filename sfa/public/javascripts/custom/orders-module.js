var ordersModule = angular.module('ordersModule', ['customersModule']);
var newOrderModule = angular.module('newOrderModule', ['ordersModule', 'productsModule']);

/**
 * OrdersController
 */

ordersModule.controller('OrdersController', function ($http, $location) {
    var self = this;

    self.orders = [];

    /**
     * initiate controller
     */
    self.initCtrl = function (customerId) {
        self.getOrders(customerId);
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

    self.order = {};

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        self.getOrder(id);
    };

    /**
     * GET order info from API
     */
    self.getOrder = function (id) {
        $http.get(API_URL + '/api/encomendas?id=' + id).then(function (data) {
            self.costumer = data;
        });
    };
});

/**
 * NewOrderController
 */
newOrderModule.controller('NewOrderController', function ($http, $location) {
    var self = this;

    self.newOrder = {};
    self.products = [];
    self.linesDoc = [];

    /**
     * Initiate controller
     */
    self.initCtrl = function () {
    };

    self.setCustomer = function (id) {
        self.newOrder.Entidade = id;
    }

    /**
     * Add order through API
     */
    self.addOrder = function () {
        // TODO do form validation


        self.waitingAPIResponse = true;

        self.newOrder.Responsavel = "1"; // TODO change to vendedor loggin
        self.newOrder.Serie = "A";
        self.newOrder.LinhasDoc = self.linesDoc;

        $http({
            method: 'POST',
            url: API_URL + '/api/Encomendas/',
            headers: {'Content-Type': 'application/json'},
            data: self.newOrder
        }).then(
            function (data) {
                console.log(data);
                window.location.replace('/encomenda?id=' + data.data.Id);
            },
            function (data) {
                console.log(data);
            });
    };

    // displays the order price
    self.total = function () {
        var total = 0;
        self.linesDoc.forEach(function (element) {
            total += ((element.IVA / 100) + 1) * ((element.PrecoUnitario * element.Quantidade) - (element.Desconto * element.Quantidade));
        });
        return total;
    };

    // remove a product
    self.removeProduct = function () {
        if (self.selected) {
            var productIndex = self.products.indexOf(self.selected);
            self.products.splice(productIndex, 1);
            self.linesDoc.splice(productIndex, 1);

            $("#product-" + self.selected).toggle(true);

            self.selected = null;
        }

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    };

    /**
     * Product handlers
     */
    self.selectProduct = function (id) {
        self.selected = id;
        console.log("selected " + id);
    };

    self.isProductSelected = function (id) {
        return self.selected == id;
    }

    self.addProduct = function (productsCtrl) {
        var selectBox = document.getElementById("product-selector");
        var productId = selectBox.options[selectBox.selectedIndex].value;

        // add product to list of, if not present already
        if (productId && self.products.indexOf(productId) == -1) {
            var product = productsCtrl.getProductById(productId);

            self.products.push(productId);

            console.log(product);

            if (product) {
                var lineEntry = {};

                lineEntry.CodArtigo = product.CodArtigo;
                lineEntry.Stock = product.StockAtual;
                lineEntry.Quantidade = 1;
                lineEntry.PrecoUnitario = product.PrecoMedio;
                lineEntry.Iva = product.IVA;
                lineEntry.Desconto = 0;

                self.linesDoc.push(lineEntry);

                $("#product-" + productId).toggle(false);
            }
        }

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    };
});

/**
 * OrdersControllerAdmin
 */

ordersModule.controller('OrdersControllerAdmin', function ($http, $location) {
    var self = this;

    self.orders = [];
    self.loading = true;

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getOrders();
    };

    /**
     * GET orders list from API
     */
    self.getOrders = function () {
        $http.get(API_URL + '/api/encomendas').then(function (data) {
            self.orders = data.data;
            console.log(data.data);
            self.loading = false;
        });
    };

});