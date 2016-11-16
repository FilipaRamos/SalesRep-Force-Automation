var app = angular.module('sfa', []);

/**
 * ProductsController
 */
app.controller('ProductsController', function () {
    this.products = products;
    this.categories = categories;

    this.filter = 'all';

    this.filteringBy = function(category){
        return this.filter === 'all' || this.filter === category;
    }

    this.filterBy = function(category){
        this.filter = category;
    }
});

// TODO retrieve client list
var categories = [
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
var products = [
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
