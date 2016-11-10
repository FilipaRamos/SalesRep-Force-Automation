var app = angular.module('sfa', []);

/**
 * ProductsController
 */
app.controller('ProductController', function () {
    this.product = product;
    this.warehouses = warehouses;

    this.filter = 'all';

    this.filteringBy = function(category){
        return this.filter === 'all' || this.filter === category;
    }

    this.filterBy = function(category){
        this.filter = category;
    }
});

// TODO retrieve client list
var product = {
        id: "Exemplo2",
        nome: 'ProdutoExemplo2',
        descricao: "Produto descrição ....",
        iva_atual: 13,
        preco_atual: 22.12,
        stock_total: 100,
        stock_disponivel: 85,
        categoria: 'id'
    };

// TODO retrieve or generate warehouse list
var warehouses = [
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