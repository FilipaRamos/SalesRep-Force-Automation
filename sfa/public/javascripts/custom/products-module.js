var productsModule = angular.module('productsModule', []);

/**
 * ProductsController
 */
productsModule.controller('ProductsController', function ($http) {
    var self = this;

    self.products = [];
    self.categories = [];
    self.filter = 'all';

    /**
     * initiate controller
     */
    self.initCtrl = function() {
        // TODO change this
        self.products = productsTemp;
        self.categories = categoriesTemp;
        self.getProducts();
        //self.getProductCategories();
    };

    /**
     * GET products list from API
     */
    self.getProducts = function () {
        $http({
            method: 'GET',
            url:'http://172.16.1.51:49338/api/artigos',
        }).then(function (data) {
            console.log(data);
            self.products = data.data;
        }, function (data) {
            console.log(data);
        });
    };

    /**
     * GET categories list from API
     */
    self.getCategories = function () {
        $http.get('api/Familias').then(function (data) {
            self.products = data;
        });
    };

    /**
     * Category filter handlers
     */
    self.filteringBy = function(category){
        return self.filter === 'all' || self.filter === category;
    };

    self.filterBy = function(category){
        self.filter = category;
    };

    self.isFilterEmpty = function () {
      var result =  self.products.find(function (product) {
          return product.Familia == self.filter;
      })
        return result == undefined && self.filter != 'all';
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

    self.product = {};
    self.warehouses = [];

    /**
     * initiate controller
     */
    self.initCtrl = function(id){
        // TODO change this
        self.product = productsTemp[0];
        self.warehouses = warehousesTemp;

        //self.getProduct(id);
        //self.getProductWarehouses(id);
    };

    /**
     * GET product info from API
     */
    self.getProduct = function (id) {
        $http.get('api/produtos?id=' + id).then(function (data) {
            self.product = data;
        });
    };

    /**
     * GET product's warehouses list from API
     */
    self.getWarehouses = function (id) {
        $http.get('api/armazens?produtoId=' +  id).then(function (data) {
            self.costumerOrders = data;
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

// TODO retrieve client list
var categoriesTemp = [
    {
        Familia: 'Processadores'
    },
    {
        Familia: 'Gráficas'
    },
    {
        Familia: 'Outros'
    }
];

// TODO retrieve client list
var productsTemp = [
    {
        CodArtigo: "Exemplo2",
        nome: 'ProdutoExemplo2',
        DescArtigo: "Produto descrição ....",
        IVA: 13,
        PrecoMedio: 22.12,
        StockAtual: 100,
        stock_disponivel: 85,
        Familia: "Processadores"
    },
    {
        CodArtigo: "Exemplo3",
        nome: 'ProdutoExemplo3',
        DescArtigo: "Produto descrição ....",
        IVA: 13,
        PrecoMedio: 22.12,
        StockAtual: 100,
        stock_disponivel: 85,
        Familia: "Cat2"
    },
    {
        CodArtigo: "Exemplo4",
        nome: 'ProdutoExemplo4',
        DescArtigo: "Produto descrição ....",
        IVA: 13,
        PrecoMedio: 22.12,
        StockAtual: 100,
        stock_disponivel: 85,
    },
    {
        CodArtigo: "Exemplo5",
        nome: 'ProdutoExemplo2',
        DescArtigo: "Produto descrição ....",
        IVA: 13,
        PrecoMedio: 22.12,
        StockAtual: 100,
        stock_disponivel: 85
    },
    {
        CodArtigo: "Exemplo",
        nome: 'ProdutoExemplo5',
        DescArtigo: "Produto descrição ....",
        IVA: 13,
        PrecoMedio: 22.12,
        StockAtual: 100,
        stock_disponivel: 85
    }
];

// TODO retrieve or generate warehouse list
var warehousesTemp = [
    {
        ArmazemID: "Exemplo2",
        Morada: 'morada exemplo',
        Stock: 10
    },
    {
        ArmazemID: "Exemplo2",
        Morada: 'morada exemplo',
        Stock: 10
    },
    {
        ArmazemID: "Exemplo2",
        Morada: 'morada exemplo',
        Stock: 10
    }
];
