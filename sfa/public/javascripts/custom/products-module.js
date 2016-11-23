var productsModule = angular.module('productsModule', []);
/**
 * ProductsController
 */
productsModule.controller('ProductsController', function ($http, $scope, $location) {
    var self = this;

    self.loading = true;
    self.products = [];
    self.categories = [];
    self.filter = 'all';

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getProducts();
    };

    /**
     * GET products list from API
     */
    self.getProducts = function () {
        $http.get(API_URL + '/api/artigos').then(function (data) {
            self.products = data.data;

            self.loading = false;
            self.getCategories();
        }, function (data) {
            console.log('Erro ao obter lista de produtos.');
            console.log(data);
        });
    };

    /**
     * Update the list from API
     */
    self.updateProductList = function () {
        var selector = $('#product-selector');

        for (productIndex in self.products) {
            var product = self.products[productIndex];
            var productOption = '<option value="' + product.CodArtigo + '" data-subtext="&emsp;' + product.PrecoMedio + '€" data-tokens="" id="product-' + product.CodArtigo + '">' + product.CodArtigo + '</option>';
            selector.append(productOption);
        }

        selector.selectpicker('refresh');
    };

    /**
     * Redirect to selected product page
     */
    self.goToProduct = function () {
        var productId = $("#product-selector option:selected").text().trim();
        if (productId) {
            window.location.replace('produto?id=' + productId);
        }
    };

    /**
     * GET categories list from API
     */
    self.getCategories = function () {
        $http.get(API_URL + '/api/Familias').then(function (data) {
            self.categories = data.data;

            for(productIndex in self.products){
                var product = self.products[productIndex];
                $("#product-" + product.CodArtigo).attr('data-subtext', self.getCategory(product.Familia));
            }

            var selector = $('#product-selector');
            selector.selectpicker('refresh');
        }, function (data) {
            console.log('Erro ao obter lista de famílias.');
            console.log(data);
        });
    };

    /**
     * Category filter handlers
     */
    self.filteringBy = function (category) {
        return self.filter === 'all' || self.filter === category;
    };

    self.filterBy = function (category) {
        self.filter = category;
    };

    self.isFilterEmpty = function () {
        var result = self.products.find(function (product) {
            return product.Familia == self.filter;
        })
        return result == undefined && self.filter != 'all';
    };

    self.getCategory = function (id) {
        var category = self.categories.find(function (category) {
            return category.Familia == id;
        });

        if(category) {
            return category.Descricao;
        }else{
            return '';
        }
    };

    /**
     * Products tab handlers
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
 * ProductController
 */
productsModule.controller('ProductController', function ($http, $location) {
    var self = this;

    self.loadingInfo = true;
    self.loadingWarehouses = true;
    self.product = {};
    self.warehouses = [];

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        self.getProduct(id);
        self.getProductWarehouses(id);
    };

    /**
     * GET product info from API
     */
    self.getProduct = function (id) {
        $http.get(API_URL + '/api/Artigos/' + id).then(function (data) {
            self.product = data.data;
            self.loadingInfo = false;
        }, function (data) {
            console.log('Erro ao informação sobre o produto ' + id);
            console.log(data);
        });
    };

    /**
     * GET product's warehouses list from API
     */
    self.getProductWarehouses = function (id) {
        $http.get(API_URL + '/api/ArtigoArmazem/' + id).then(function (data) {
            self.warehouses = data.data;
            self.loadingWarehouses = false;
        }, function (data) {
            console.log('Erro ao informação sobre armazéns do produto ' + id);
            console.log(data);
        });
    };

    /**
     * Product list tab handlers
     */
    self.tab = 1;
    self.isSet = function (checkTab) {
        return self.tab === checkTab;
    };

    self.setTab = function (setTab) {
        self.tab = setTab;
    };
});