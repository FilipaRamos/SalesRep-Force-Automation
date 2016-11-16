var app = angular.module('sfa', []);

/**
 * CostumersController
 */
app.controller('CostumersController', function () {
    this.costumers = costumers;
});

/**
 * NewEventController
 */
app.controller('NewEventController', function () {
    this.eventTypes = eventTypes;
    this.eventType = this.eventTypes[0];

    this.addEvent = function () {
        // TODO save event in primavera
    }
});

/**
 * OpportunitiesController
 */
app.controller('OpportunitiesController', ['$scope', function ($scope) {
    this.products = products;
    this.productOpportunities = [];
    this.selectedProduct = {};

    this.categories = categories;

    this.addOpportunity = function () {
        var e = document.getElementById("product-selector");
        var productId = e.options[e.selectedIndex].value;

        console.log(productId);

        // TODO correct this to find the product with id selected
        this.selectedProduct = this.products.find(function (product) {
            return productId == product.id;
        });

        console.log(this.selectedProduct);
        this.productOpportunities.push(this.selectedProduct);
        var index = this.products.indexOf(this.selectedProduct);
        this.products.splice(index, 1);
        //$scope.$apply();
        //

        console.log(this.products);

        // TODO unselect product
        this.selectedProduct = {};
    }
}]);

// TODO retrieve client list
var categories = [
    {
        id: "Exemplo2",
        nome: 'Processadores'
    },
    {
        id: "Exemplo2",
        nome: 'Gráficas'
    },
    {
        id: "Exemplo2",
        nome: 'Outros'
    }
];

// TODO retrieve client list
var products = [
    {
        id: "Exemplo1",
        nome: 'ProdutoExemplo2',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85,
        categoria: 'Cat1'
    },
    {
        id: "Exemplo2",
        nome: 'ProdutoExemplo3',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85,
        categoria: 'Cat2'
    },
    {
        id: "Exemplo3",
        nome: 'ProdutoExemplo4',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    },
    {
        id: "Exemplo4",
        nome: 'ProdutoExemplo5',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    },
    {
        id: "Exemplo5",
        nome: 'ProdutoExemplo6',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85
    }
];


// TODO check event types
var eventTypes = [{id: 1, nome: 'Reunião'}, {id: 2, nome: 'Telefonema'}, {id: 3, nome: 'Email'}];



// TODO retrieve client list
var costumers = [
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