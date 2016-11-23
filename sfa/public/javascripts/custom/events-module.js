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
        self.getEvents();

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
        $http.get(API_URL + '/api/Reuniao/').then(function (data) {
                self.events = data.data;
                console.log(data.data);

                // set info to be displayed
                self.events.forEach(function (event) {
                    event.url = '/evento?id=' + event.CodReuniao;
                    event.title = event.Descricao;
                    event.start = event.DataInicio;
                    event.end = event.TodoDia ? undefined : event.DataFim;
                    event.allDay = event.TodoDia;
                });

                if(self.calendar){
                    self.calendar.fullCalendar('removeEvents');
                    self.calendar.fullCalendar('addEventSource', self.events);
                    self.calendar.fullCalendar('refetchEvents');
                }

                if(self.eventList){
                    self.eventList.fullCalendar('removeEvents');
                    self.eventList.fullCalendar('addEventSource', self.events);
                    self.eventList.fullCalendar('refetchEvents');
                }
            },
            function (data) {
                console.log("Erro ao listar eventos.");
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
        self.getEvent(id);
    };

    /**
     * GET event info from API
     */
    self.getEvent = function (id) {
        $http.get(API_URL + '/api/Reuniao/' + id).then(function (data) {
                self.event = data.data;
                console.log(data.data);
            },
            function (data) {
                console.log("Erro ao obter evento " + id);
                console.log(data);
            });
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

        console.log(productId);
        
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
        
        console.log(self.selectedOpportunities);
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

/**
 * EditEventController
 */
newEventModule.controller('EditEventController', function ($http, $location) {
    var self = this;

    self.event = {};
    self.eventTypes = eventTypesTemp;
    self.productOpportunities = [];
    self.selectedOpportunities = [];

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
       // self.getEvent(id);
        //self.getEventTypes();
    };

    /**
     * GET event info from API
     */
    self.getEvent = function (id) {
        $http.get('api/eventos?id=' + id).then(function (data) {
            self.event = data;

            //TODO add product opportunities
        })
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
     * Save event through API
     */
    self.saveEvent = function () {
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