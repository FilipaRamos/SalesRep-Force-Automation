var app = angular.module('sfa', []);

/**
 * CostumersController
 */
app.controller('CostumersController', function () {
    this.costumers = costumers;
    this.newCostumer = {};

    this.tab = 1;
    this.isSet = function (checkTab) {
        return this.tab === checkTab;
    };

    this.setTab = function (setTab) {
        this.tab = setTab;
    };
});

/**
 * NewEventController
 */
app.controller('NewEventController', function () {
    this.eventTypes = eventTypes;
    this.eventType = this.eventTypes[0];

    this.addCostumer = function () {


        costumers.push(this.newCostumer);
        this.newCostumer = {};
    };

    this.tab = 1;
    this.isSet = function (checkTab) {
        return this.tab === checkTab;
    };

    this.setTab = function (setTab) {
        this.tab = setTab;
    };
});


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