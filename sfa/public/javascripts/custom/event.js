var app = angular.module('sfa', []);

/**
 * EventController
 */
app.controller('EventController', function ($http) {
    this.event = events[0];

    this.getEvent = function () {
        var that = this;
        $http.get('api/evento?id=').then(function(data){
            that.event = data;
        })
    };

    this.getEvent();

    this.cancelEvent = function () {
        var that = this;
        $http.post('api/remove_evento?id=').then(function(data){
            $location.path('/agenda').replace();
        })
    }

});

// TODO retrieve event list from primavera
// TODO change event url so that on click it redirects to event page
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var events = [
    {
        id:1,
        tipo: 'Reunião',
        data: '12-3-2017',
        hora: '12:40',
        descricao: 'Dar a conhecer novos produtos',
        oportunidades: [],
        notas: 'Não esquecer.',
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
var customer = [
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