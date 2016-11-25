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
    self.initCtrl = function(customerId){
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

    self.order = ordersTemp[0];

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

    // remove a product
    self.removeProduct = function(){
        if( self.selected >= 0) {
            self.products.splice(self.getSelected(self.selected), 1);
            self.selected = -1;
        }
    };

    // edit a product
    self.editProduct = function(){
        
    };

    // allows product selection
    self.selectProduct = function(id){
        if(self.selected){
            $("#" + id + " .editable").forEach(function (element) {

                console.log(element);
            });
        }

        self.selected = id;
        console.log("NOW SELECTED " + id);

        $("#" + id + " .editable").forEach(function (element) {

            console.log(element);
        });
    };

    // get index of selected product
    self.getSelected = function(id){
        for (var i = 0; i < self.products.length ; i++){
            if (self.products[i].id == id)
                return i;
        }
    };

    /**
     * Product opportunities handlers
     */
    self.addProduct = function (productsCtrl) {
        var selectBox = document.getElementById("product-selector");
        var productId = selectBox.options[selectBox.selectedIndex].value;

        // add product to list of, if not present already
        if (productId && self.products.indexOf(productId) == -1) {
            var product = productsCtrl.getProductById(productId);

            self.products.push(productId);

            console.log(product);

            if(product) {
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
    }

    self.toggleOpportunitySelected = function (id) {
        var index = self.selectedOpportunities.indexOf(id);

        if (index != -1) {
            self.selectedOpportunities.splice(index, 1);
        } else {
            self.selectedOpportunities.push(id);
        }

        console.log(self.selectedOpportunities);
    };

    self.removeProduct = function () {
        if(self.selected){
            console.log()
            var productIndex = self.products.indexOf(self.selected);
            self.linesDoc.splice(productIndex, 1);
            self.products.splice(productIndex, 1);

            $("#product-" + self.selected).toggle(true);
            self.selected = null;
        }

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    }

    self.isProductOpportunity = function (productId) {
        if (productId) {
            return self.productOpportunities.indexOf(productId) != -1;
        } else {
            return self.productOpportunities.length > 0;
        }
    };

    self.selected = -1;

});