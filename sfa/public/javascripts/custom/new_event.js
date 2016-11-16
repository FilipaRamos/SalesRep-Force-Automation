var app = angular.module('sfa', ['moment-picker']);

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
app.controller('OpportunitiesController', function ($scope) {
    this.products = products;
    this.productOpportunities = [];
    this.categories = categories;

    this.addOpportunity = function () {
        var selectBox = document.getElementById("product-selector");
        var productId = selectBox.options[selectBox.selectedIndex].value;

        var selectedProduct = this.products.find(function (product) {
            return productId == product.id;
        });

        if(selectedProduct && this.productOpportunities.indexOf(selectedProduct) == -1) {
            this.productOpportunities.push(selectedProduct.id);

            var element = document.getElementById("product-" + productId);
            element.parentNode.removeChild(element);
        }

        $('#product-selector').selectpicker('val', '');
        $('#product-selector').selectpicker('refresh');
    }

    this.isProductOpportunity = function(productId) {
        return this.productOpportunities.indexOf(productId) != -1;
    };
});

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

// TODO retrieve event list from primavera
// TODO change event url so that on click it redirects to event page
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var events = [
    {
        title: 'All Day Event',
        start: new Date(y, m, 1)
    },
    {
        title: 'Long Event',
        start: new Date(y, m, d + 5),
        end: new Date(y, m, d + 7)
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
    },
    {
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false
    },
    {
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false
    },
    {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    },
    {
        title: 'EGrappler.com',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://EGrappler.com/'
    }
];

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