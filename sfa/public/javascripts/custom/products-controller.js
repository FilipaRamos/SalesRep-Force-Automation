var productsModule = angular.module('productsModule', []);

/**
 * ProductsController
 */
productsModule.controller('ProductsController', function () {
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
        //self.getProducts();
        //self.getProductCategories();
    };

    /**
     * GET products list from API
     */
    self.getProducts = function () {
        $http.get('api/produtos').then(function (data) {
            self.products = data;
        });
    };

    /**
     * GET categories list from API
     */
    self.getCategories = function () {
        $http.get('api/categorias').then(function (data) {
            self.products = data;
        });
    };

    /**
     * Category filter handlers
     */
    self.filteringBy = function(category){
        return self.filter === 'all' || self.filter === category;
    }

    self.filterBy = function(category){
        self.filter = category;
    }
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
        id: "Cat1",
        nome: 'Processadores'
    },
    {
        id: "Cat2",
        nome: 'Gráficas'
    },
    {
        id: "Cat3",
        nome: 'Outros'
    }
];

// TODO retrieve client list
var productsTemp = [
    {
        id: "Exemplo2",
        nome: 'ProdutoExemplo2',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85,
        categoria: "Cat1"
    },
    {
        id: "Exemplo3",
        nome: 'ProdutoExemplo3',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    },
    {
        id: "Exemplo4",
        nome: 'ProdutoExemplo4',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    },
    {
        id: "Exemplo5",
        nome: 'ProdutoExemplo2',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    },
    {
        id: "Exemplo",
        nome: 'ProdutoExemplo5',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    }
];

// TODO retrieve or generate warehouse list
var warehousesTemp = [
    {
        id: "Exemplo2",
        nome: 'nome 1',
        morada: 'morada exemplo',
        stock: 10
    },
    {
        id: "Exemplo2",
        nome: 'nome 2',
        morada: 'morada exemplo',
        stock: 10
    },
    {
        id: "Exemplo2",
        nome: 'nome 3',
        morada: 'morada exemplo',
        stock: 10
    }
];
