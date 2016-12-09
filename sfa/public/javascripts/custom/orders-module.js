var ordersModule = angular.module('ordersModule', ['customersModule']);
var newOrderModule = angular.module('newOrderModule', ['ordersModule', 'productsModule']);

/**
 * OrdersController
 */

ordersModule.controller('OrdersController', function ($http, $location) {
    var self = this;

    self.orders = [];
    self.loadingOrders = true;

    /**
     * initiate controller
     */
    self.initCtrl = function (customerId) {
        self.getOrders(customerId);
    };

    self.orderScope = function (scope) {
        return scope == 'all';
    };

    /**
     * GET orders list from API
     */
    self.getOrders = function (customerId) {
        $http.get(API_URL + '/api/Encomendas' + (customerId? '/Cliente/' + customerId : '')).then(function (data) {
            self.orders = data.data;
            console.log(data.data);
            self.loadingOrders = false;
        }, function (data) {
            console.log('Erro ao obter lista de encomendas.');
            console.log(data.data);
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
    self.linesDoc = [];
    self.customerCtrl = null;

    /**
     * initiate controller
     */
    self.initCtrl = function (id, customerCtrl) {
        self.customerCtrl = customerCtrl;
        self.getOrder(id);
    };

    /**
     * GET order info from API
     */
    self.getOrder = function (id) {
        $http.get(API_URL + '/api/encomendas?id=' + id).then(function (data) {
            self.order = data.data;

            self.linesDoc = self.order.LinhasDoc;
            self.customerCtrl.initCtrl(self.order.Entidade);

            for(var i=0; i<self.linesDoc.length; i++){
                self.getProduct(self.linesDoc[i].CodArtigo);
            }

            console.log(data);
        });
    };

    /**
     * GET product info from API
     */
    self.getProduct = function (id) {
        $http.get(API_URL + '/api/Artigos/' + id).then(function (data) {
            console.log(data);
            for(var i=0; i<self.linesDoc.length; i++){
                if(self.linesDoc[i].CodArtigo == id){
                    self.linesDoc[i].UnidadeVenda = data.data.UnidadeVenda;
                    self.linesDoc[i].IVA = data.data.IVA;
                }
            }
        }, function (data) {
            console.log('Erro ao informação sobre o produto ' + id);
            console.log(data);
        });
    };

    // displays the order price
    self.total = function () {
        var total = 0;
        self.linesDoc.forEach(function (element) {
            total += ((element.IVA / 100) + 1) * element.PrecoUnitario * element.Quantidade * (1-element.Desconto/100)*(1-((self.customerCtrl.customer? self.customerCtrl.customer.DescEntidade : 0 )/100));
        });
        return total;
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
    self.initCtrl = function (codVendedor) {
        self.newOrder.Responsavel = codVendedor;
        self.DescEntidade = 0;
    };

    /**
     * GET product opportunities from API
     */
    self.getProductOpportunities = function (id) {
        if(id==undefined || id==null || id=="null") {
            return;
        }

        $http.get(API_URL + '/api/OportunidadeVenda/' + id).then(function (data) {
                console.log(data);

                if(!self.productsCtrl.loading){
                    self.addCurrentOpportunities(data.data.Artigos);
                }
                else{
                    setTimeout(function(){
                        self.addCurrentOpportunities(data.data.Artigos);
                    },250);
                }
            },
            function (data) {
                console.log("Erro ao obter oportunidades de venda " + id);
                console.log(data);
            });
    };

    self.addCurrentOpportunities = function (opportnities) {
        for(var i=0; i < opportnities.length; i++){
            self.addProduct(opportnities[i]);
        }
    }

    self.setProductsCtrl = function (productsCtrl) {
        self.productsCtrl = productsCtrl;
    };

    self.setCustomer = function (id) {
        if(id!='null') {
            self.newOrder.Entidade = id;

            self.getCustomer(id);
        }
    };

    /**
     * GET customer info from API
     */
    self.getCustomer = function (id) {
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.DescEntidade = data.data.DescEntidade;
            console.log(data.data);
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    self.createLineDoc = function (productId) {
        var product = self.productsCtrl.getProductById(productId);

        if (product) {
            self.products.push(productId);

            var lineEntry = {};

            lineEntry.CodArtigo = product.CodArtigo;
            lineEntry.Stock = product.StockAtual;
            lineEntry.UnidadeVenda = product.UnidadeVenda;
            lineEntry.Quantidade = 1;
            lineEntry.PrecoUnitario = product.PVP1;
            lineEntry.IVA = product.IVA;
            lineEntry.Desconto = 0;

            self.linesDoc.push(lineEntry);
            return true;
        }else{
            return false;
        }
    }

    /**
     * Add order through API
     */
    self.addOrder = function () {
        if(self.linesDoc.length == 0) {
            return;
        }

        self.waitingAPIResponse = true;
        self.newOrder.Serie = (new Date()).getFullYear();
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
                self.waitingAPIResponse = false;
                console.log(data);
            });
    };

    // displays the order price
    self.total = function () {
        var total = 0;
        self.linesDoc.forEach(function (element) {
            total += ((element.IVA / 100) + 1) * element.PrecoUnitario * element.Quantidade * (1-element.Desconto/100)*(1-(self.DescEntidade/100));
        });
        return total;
    };


    /**
     * Product handlers
     */
    // remove a product from order
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

    self.selectProduct = function (id) {
        self.selected = id;
        console.log("selected " + id);
    };

    self.isProductSelected = function (id) {
        return self.selected == id;
    }

    self.addProduct = function (productId) {
        if(productId == undefined) {
            var selectBox = document.getElementById("product-selector");
            productId = selectBox.options[selectBox.selectedIndex].value;
        }

        // add product to list of, if not present already
        if (productId && self.products.indexOf(productId) == -1) {
            if(self.createLineDoc(productId)) {
                $("#product-" + productId).toggle(false);
            }
        }

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    };
});