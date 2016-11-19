var eventsModule = angular.module('eventsModule', []);
var newEventModule = angular.module('newEventModule', ['moment-picker', 'customersModule', 'productsModule']);

/**
 * EventsController
 */
eventsModule.controller('EventsController', function ($http, $location, $window) {
    var self = this;

    self.events = [];
    self.calendar = null;
    self.eventList = null;
    self.showAll = false;

    /**
     * initiate controller
     */
    self.initCtrl = function (calendarType) {
        // TODO change this
        //self.getEvents();
        self.events = eventsTemp;
        self.events.forEach(function (event) {
            event.url = '/evento?id=' + event.id;
            event.title = event.descricao ? event.descricao : event.title;
        });

        if(calendarType=='min') {
            self.initMinCalendar();
        }else if(calendarType=='full') {
            self.initFullCalendar();
        }
    };

    /**
     * GET events list from API
     */
    self.getEvents = function () {
        $http.get('api/eventos').then(
            function (data) {
                self.events = data;

                // set url so that it goes to event page when clicked
                that.events.forEach(function (event) {
                    event.url = '/evento?id=' + event.id;
                });

                if(self.calendar){
                    // set info to be displayed
                    self.events.forEach(function (event) {
                        event.url = '/evento?id=' + event.id;
                        event.title = event.cliente;
                    });

                    self.calendar.fullCalendar('removeEvents');
                    self.calendar.fullCalendar('addEventSource', self.events);
                    self.calendar.fullCalendar('refetchEvents');
                }

                if(self.eventList){
                    // set info to be displayed
                    self.events.forEach(function (event) {
                        event.url = '/evento?id=' + event.id;
                        event.title = event.cliente + event.descricao;
                    });

                    self.eventList.fullCalendar('removeEvents');
                    self.eventList.fullCalendar('addEventSource', self.events);
                    self.eventList.fullCalendar('refetchEvents');
                }
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Min/Full calendar and event list handlers
     */
    self.initMinCalendar = function () {
        $(document).ready(function() {
            self.calendar = $('#calendar').fullCalendar({
                header: {left:   '',
                    center: 'title',
                    right:  ''},
                weekends: false,
                selectable: false,
                selectHelper: true,
                editable: false,
                events: self.events,
                eventLimitText: 'eventos'
            });
        });
    };

    self.initFutureEventList = function () {
        $(document).ready(function () {
            self.eventList = $('#upcomming').fullCalendar({
                weekends: false,
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                views: {
                    listNext: {start: date, type: 'list', duration: {days: 5}}
                },
                defaultView: 'listNext',
                events: self.events,
                noEventsMessage: 'Não foram encontrados eventos...'
            });
        });
    };

    self.changeView = function () {
        self.showAll = !self.showAll;
        var newView = self.showAll ? 'listYear' : 'listNext';
        self.eventList.fullCalendar('changeView', newView);

        var label = self.showAll ? 'Ver futuros' : 'Ver todos';
        $("#change-view").html(label);
    };

    self.initFullCalendar = function () {
        $(document).ready(function () {
            self.calendar = $('#calendar').fullCalendar({
                weekends: false,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable: true,
                selectHelper: true,
                select: function (start, end, allDay) {
                    self.calendar.fullCalendar('unselect');
                    var date = start._d.getDay() + '-' + start._d.getMonth() + '-' + start._d.getFullYear();
                    $window.location.href = '/criar_evento?data="' + date + '"';
                },
                editable: false,
                events: self.events,
                eventLimitText: 'eventos'
            });
        });
    };
});

/**
 * EventController
 */
eventsModule.controller('EventController', function ($http, $location) {
    var self = this;

    self.event = {};

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        // TODO change this
        self.event = eventsTemp[0];
        //self.getEvent(id);
    };

    /**
     * GET event info from API
     */
    self.getEvent = function (id) {
        $http.get('api/eventos?id=' + id).then(function (data) {
            self.event = data;
        })
    };

    self.cancelEvent = function () {
        $http.post('api/remove_evento?id=').then(
            function (data) {
                $location.path('/agenda').replace();
            },
            function (data) {
                console.log(data);
            });
    };
});

/**
 * NewEventController
 */
newEventModule.controller('NewEventController', function ($http, $location) {
    var self = this;

    self.newEvent = {};
    self.eventTypes = eventTypesTemp;
    self.newEvent.eventType = self.eventTypes[0];
    self.productOpportunities = [];
    self.selectedOpportunities = [];

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getEventTypes();
        self.getProductOpportunities();
    };

    /**
     * GET event types list from API
     */
    self.getEventTypes = function () {
        $http.get('api/tipos_evento').then(
            function (data) {
                self.eventTypes = data;
                self.newEvent.eventType = self.eventTypes[0];
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * GET product list from API
     */
    self.getProductOpportunities = function () {
        $http.get('api/produtos').then(
            function (data) {
                self.productOpportunities = data;
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * GET events list from API
     */
    self.getEvents = function () {
        $http.get('api/eventos').then(
            function (data) {
                self.events = data;
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Add event through API
     */
    self.addEvent = function () {
        // TODO add form validation

        $http.post('api/evento', self.newEvent).then(
            function (data) {
                $location.path('/eventos?id=' + data.id).replace();
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Product opportunities handlers
     */
    self.addOpportunity = function () {
        var selectBox = document.getElementById("product-selector");
        var productId = selectBox.options[selectBox.selectedIndex].value;

        // add product to opportunities, if not present already
        if (productId && self.productOpportunities.indexOf(productId) == -1) {
            self.productOpportunities.push(productId);

            $("#product-" + productId).toggle(false);
        }

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    }

    self.toggleOpportunitySelected = function(id) {
        var index = self.selectedOpportunities.indexOf(id);

        if(index!=-1){
            self.selectedOpportunities.splice(index, 1);
        }else{
            self.selectedOpportunities.push(id);
        }
    };

    self.removeOpportunity = function () {

        self.productOpportunities = self.productOpportunities.filter( function(el) {
            if(self.selectedOpportunities.indexOf(el) == -1){
                return true;
            }

            $("#product-" + el).toggle(true);
            return false;
        });

        self.selectedOpportunities = [];

        var selector = $('#product-selector');
        selector.selectpicker('val', '');
        selector.selectpicker('refresh');
    }

    self.isProductOpportunity = function (productId) {
        if(productId) {
            return self.productOpportunities.indexOf(productId) != -1;
        }else{
            return self.productOpportunities.length > 0;
        }
    };
});

// TODO retrieve event list from primavera
// TODO change event url so that on click it redirects to event page
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var eventsTemp = [
    {
        id: 1,
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
        id: 2,
        title: 'Long Event',
        start: new Date(y, m, d + 5),
        end: new Date(y, m, d + 7)
    },
    {
        id: 3,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
    },
    {
        id: 4,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
    },
    {
        id: 5,
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false,
        url: '/evento?id=1'
    },
    {
        id: 6,
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false
    },
    {
        id: 7,
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    },
    {
        id: 8,
        title: 'EGrappler.com',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://EGrappler.com/'
    }
];

// TODO retrieve client list
var eventTypesTemp = [{id:1, nome: "Reunião"}, {id:2, nome: "Telefonema"}, {id:3, nome: "Visita"}];

// TODO retrieve client list
var productsTemp = [
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