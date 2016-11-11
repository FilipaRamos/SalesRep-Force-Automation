var app = angular.module('sfa', []);

app.controller('CostumersController', function () {
        this.costumer = costumer;
        this.orders = orders;

        this.tab = 1;
        this.isSet = function (checkTab) {
                return this.tab === checkTab;
        };

        this.setTab = function (setTab) {
                this.tab = setTab;
        };
});

var orders = [
        {
                id: 14351,
                cliente_id: "Manel LDA.",
                produtos : [
                        { id: 61653, preco: 32.00, iva: 21, desconto: 0},
                        { id: 61893, preco: 21.00, iva: 21, desconto: 0}
                ],
                status: 2,
                total: 53.00,
                data : new Date(2016, 03, 02)
        },
        {
                id: 14452,
                cliente_id: "Firmino & Firmino LDA.",
                produtos : [
                        { id: 31553, preco: 10.00, iva: 21, desconto: 0},
                        { id: 51293, preco: 5.00, iva: 21, desconto: 2}
                ],
                status: 1,
                total: 15.00,
                data : new Date(2016, 03, 06)
        },
        {
                id: 14452,
                cliente_id: "FVUP - Faculdade da Vida.",
                produtos : [
                        { id: 56853, preco: 7.00, iva: 21, desconto: 7},
                        { id: 41223, preco: 2.00, iva: 21, desconto: 1}
                ],
                status: 3,
                total: 9.00,
                data : new Date(2016, 06, 05)
        }
];

var costumer = {
        id: "Manel LDA.",
        nome: 'Manel LDA.',
        nome_fiscal: "Manel LDA.",
        morada: "Porto",
        telefone: 919209872,
        contribuinte: 221009029,
        vendas: 2928.23
};
