var eventsModule = angular.module('eventsModule', ['usersModule']);
var newEventModule = angular.module('newEventModule', ['moment-picker', 'customersModule', 'productsModule']);
var viewEventModule = angular.module('viewEventModule', ['eventsModule', 'productsModule']);

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

        if (calendarType == 'min') {
            self.initMinCalendar();
        } else if (calendarType == 'full') {
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
                    event.title = event.Descricao + ' - ' + event.Entidade;
                    event.start = event.DataInicio;
                    event.end = event.TodoDia ? undefined : event.DataFim;
                    event.allDay = event.TodoDia;
                });

                if (self.calendar) {
                    self.calendar.fullCalendar('removeEvents');
                    self.calendar.fullCalendar('addEventSource', self.events);
                    self.calendar.fullCalendar('refetchEvents');
                }

                if (self.eventList) {
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
        $(document).ready(function () {
            self.calendar = $('#calendar').fullCalendar({
                header: {
                    left: '',
                    center: 'title',
                    right: ''
                },
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
                    listNext: {start: Date.now(), type: 'list', duration: {days: 5}}
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
                    var date = start._d.getFullYear() + '-' + start._d.getMonth() + '-' + start._d.getDay();
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
eventsModule.controller('EventController', function ($http, $location)  {
    var self = this;

    self.event = {};
    self.eventTypes = [];
    self.customer = {};
    self.products = [];
    self.productOpportunities = [];
    self.loadingEvent = true;
    self.loadingCustomer = true;

    /**
     * initiate controller
     */
    self.initCtrl = function (id) {
        self.getEventTypes();
        self.getEvent(id);
    };

    /**
     * GET event types list from API
     */
    self.getEventTypes = function () {
        $http.get(API_URL + '/api/tiposreuniao').then(
            function (data) {
                self.eventTypes = data.data;
                console.log(self.eventTypes);

                if(self.event.TipoId != undefined){
                    self.event.Tipo = self.getEventType(self.event.TipoId);
                }
            },
            function (data) {
                console.log(data);
            });
    };

    self.getEventType = function(id){
        for(var i = 0; self.eventTypes.length; i++){
            if(self.eventTypes[i].Id == id){
                return self.eventTypes[i].Descricao;
            }
        }
        return null;
    };

    /**
     * GET event info from API
     */
    self.getEvent = function (id) {
        $http.get(API_URL + '/api/Reuniao/' + id).then(function (data) {
                self.event = data.data;
                console.log(data.data);

                self.getCustomer(self.event.Entidade);
                self.event.Tipo = self.getEventType(self.event.TipoId);

                if (self.event.Oportunidade) {
                    self.getProducts();
                    self.getProductOpportunities();
                }
            },
            function (data) {
                console.log("Erro ao obter evento " + id);
                console.log(data);
            });
    };

    /**
     * GET products list from API
     */
    self.getProducts = function () {
        $http.get(API_URL + '/api/artigos').then(function (data) {
            self.products = data.data;
            console.log(self.products);
            self.loading = false;
        }, function (data) {
            console.log('Erro ao obter lista de produtos.');
            console.log(data);
        });
    };

    /**
     * GET product opportunities from API
     */
    self.getProductOpportunities = function () {
        $http.get(API_URL + '/api/OportunidadeVenda/' + self.event.Oportunidade).then(function (data) {
                self.productOpportunities = data.data.Artigos;
                console.log(self.productOpportunities);
            },
            function (data) {
                console.log("Erro ao obter oportunidades de venda " + id);
                console.log(data);
            });
    };

    /**
     * GET customer info from API
     */
    self.getCustomer = function (id) {
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.customer = data.data;
            self.loadingCustomer = false;
            console.log(self.customer);
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    self.cancelEvent = function (id) {
        $http({
            url: API_URL + '/api/Reuniao/' + id,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            data: self.event
        }).then(
            function (data) {
                window.location.replace('/eventos');
            },
            function (data) {
                console.log(data);
            });
    };

    self.isProductOpportunity = function (productId) {
        if (productId) {
            return self.productOpportunities.indexOf(productId) != -1;
        } else {
            return self.productOpportunities.length > 0;
        }
    };
});

/**
 * TypesController
 */
newEventModule.controller('TypesController', function ($http) {
    var self = this;

    self.eventTypes = [];
    self.selected = null;

    /**
     * initiate controller
     */
    self.initCtrl = function () {
        self.getEventTypes();
    };

    self.setSelected = function (typeId) {
        self.selected = typeId;

        if (!self.eventTypes.empty) {
            $("#type-selector").val(self.selected);
        }
    };

    /**
     * GET event types list from API
     */
    self.getEventTypes = function () {
        $http.get(API_URL + '/api/tiposreuniao').then(
            function (data) {
                self.eventTypes = data.data;
                console.log(self.eventTypes);

                if (self.selected != null) {
                    $("#type-selector").val(self.selected);
                }
            },
            function (data) {
                console.log(data);
            });
    };
});

/**
 * NewEventController
 */
newEventModule.controller('NewEventController', function ($http) {
    var self = this;

    self.newEvent = {};
    self.productOpportunities = [];
    self.selectedOpportunities = [];
    self.waitingAPIResponse = false;

    /**
     * initiate controller
     */
    self.initCtrl = function (codVendedor) {
        self.newEvent.CodVendedor = codVendedor;
        self.newEvent.Prioridade = "1";
    };

    self.setCustomer = function (id) {
        if (id != 'null') {
            self.newEvent.Entidade = id;
        } else {
            self.newEvent.Entidade = null;
        }
    };

    /**
     * Add event through API
     */
    self.addEvent = function () {
        // TODO add form validation

        // set time variables
        self.newEvent.DataInicio = self.newEvent.startDate + 'T' + (self.newEvent.TodoDia ? "00:00:00" : self.newEvent.startTime);
        self.newEvent.DataFim = self.newEvent.startDate + 'T' + (self.newEvent.TodoDia ? "23:59:59" : self.newEvent.endTime);

        // set product opportunities
        self.newEvent.Artigos = self.productOpportunities;

        // set customer ID
        var selectBox = document.getElementById("customer-selector");
        var customerId = selectBox.options[selectBox.selectedIndex].value;
        self.newEvent.Entidade = customerId ? customerId : self.newEvent.Entidade;

        // set event type ID
        var selectBox = document.getElementById("type-selector");
        self.newEvent.TipoId = typeId = selectBox.options[selectBox.selectedIndex].value;

        if(self.newEvent.Descricao == undefined){
            self.newEvent.Descricao = "";
        }

        console.log(self.newEvent);

        self.waitingAPIResponse = true;
        $http({
            method: 'POST',
            url: API_URL + '/api/Reuniao/',
            headers: {'Content-Type': 'application/json'},
            data: self.newEvent
        }).then(
            function (data) {
                console.log(data);
                self.newEvent.CodReuniao = data.data.CodReuniao;

                if (self.productOpportunities.length == 0) {
                    window.location.replace('/evento?id=' + self.newEvent.CodReuniao);
                } else {
                    self.createSalesOpportunity();
                }
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Add event through API
     */
    self.createSalesOpportunity = function () {
        var salesOpportunity = {};
        salesOpportunity.CodReuniao = self.newEvent.CodReuniao;
        salesOpportunity.Descricao = self.newEvent.Descricao;
        salesOpportunity.CodVendedor = self.newEvent.CodVendedor;
        salesOpportunity.Entidade = self.newEvent.Entidade;
        salesOpportunity.Artigos = self.productOpportunities;

        console.log(self.newEvent);
        console.log(salesOpportunity);

        $http({
            method: 'POST',
            url: API_URL + '/api/OportunidadeVenda/',
            headers: {'Content-Type': 'application/json'},
            data: salesOpportunity
        }).then(
            function (data) {
                console.log(data);
                window.location.replace('/evento?id=' + self.newEvent.CodReuniao);
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

        console.log('here');
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

    self.toggleOpportunitySelected = function (id) {
        var index = self.selectedOpportunities.indexOf(id);

        if (index != -1) {
            self.selectedOpportunities.splice(index, 1);
        } else {
            self.selectedOpportunities.push(id);
        }

        console.log(self.selectedOpportunities);
    };

    self.removeOpportunity = function () {

        self.productOpportunities = self.productOpportunities.filter(function (el) {
            if (self.selectedOpportunities.indexOf(el) == -1) {
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
        if (productId) {
            return self.productOpportunities.indexOf(productId) != -1;
        } else {
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
    self.typesCtrl = null;
    self.productOpportunities = [];
    self.selectedOpportunities = [];
    self.waitingAPIResponse = false;
    self.loadingCustomer = true;

    /**
     * initiate controller
     */
    self.initCtrl = function (idEvent) {
        self.getEvent(idEvent);
    };

    self.setTypesCtrl = function (ctrl) {
        self.typesCtrl = ctrl;
    }

    /**
     * GET event info from API
     */
    self.getEvent = function (id) {
        $http.get(API_URL + '/api/reuniao/' + id).then(
            function (data) {
                self.event = data.data;
                self.event.startDate = self.event.DataInicio;
                self.getCustomer(self.event.Entidade);
                console.log(self.event);

                self.typesCtrl.setSelected(self.event.TipoId);

                if (self.event.Oportunidade != null) {
                    self.getProductOpportunities();
                }
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * GET customer info from API
     */
    self.getCustomer = function (id) {
        $http.get(API_URL + '/api/Cliente/' + id).then(function (data) {
            self.customer = data.data;
            self.loadingCustomer = false;
            console.log(self.customer);
        }, function (data) {
            console.log('Erro ao obter informação de cliente ' + id);
            console.log(data);
        });
    };

    /**
     * GET opportunities info from API
     */
    self.getProductOpportunities = function () {
        $http.get(API_URL + '/api/oportunidadevenda/' + self.event.Oportunidade).then(
            function (data) {
                var products = data.data.Artigos;

                for(var i=0; i < products.length; i++){
                    self.addOpportunity(products[i]);
                }
                console.log(products);
                console.log(self.event);
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Add event through API
     */
    self.saveEvent = function () {
        // TODO add form validation

        // set time variables
        self.event.DataInicio = self.event.startDate + 'T' + (self.event.TodoDia ? "00:00:00" : self.event.startTime);
        self.event.DataFim = self.event.startDate + 'T' + (self.event.TodoDia ? "23:59:59" : self.event.endTime);

        // set product opportunities
        self.event.Artigos = self.productOpportunities;

        // set customer ID
        self.event.Entidade = customerId ? customerId : self.event.Entidade;

        // set event type ID
        var selectBox = document.getElementById("type-selector");
        self.event.TipoId = typeId = selectBox.options[selectBox.selectedIndex].value;

        if(self.event.Descricao == undefined){
            self.event.Descricao = "";
        }

        console.log(self.event);

        self.waitingAPIResponse = true;
        $http({
            method: 'PUT',
            url: API_URL + '/api/Reuniao/',
            headers: {'Content-Type': 'application/json'},
            data: self.event
        }).then(
            function (data) {
                console.log(data);
                self.event.CodReuniao = data.data.CodReuniao;

                if (self.productOpportunities.length == 0) {
                    window.location.replace('/evento?id=' + self.event.CodReuniao);
                } else {
                    self.updateSalesOpportunity();
                }
            },
            function (data) {
                console.log(data);
                self.waitingAPIResponse = false;
            });
    };

    /**
     * Add event through API
     */
    self.updateSalesOpportunity = function () {
        var salesOpportunity = {};
        salesOpportunity.CodReuniao = self.event.CodReuniao;
        salesOpportunity.Descricao = self.event.Descricao;
        salesOpportunity.CodVendedor = self.event.CodVendedor;
        salesOpportunity.Entidade = self.event.Entidade;
        salesOpportunity.Artigos = self.productOpportunities;

        console.log(salesOpportunity);

        $http({
            method: 'PUT',
            url: API_URL + '/api/OportunidadeVenda/',
            headers: {'Content-Type': 'application/json'},
            data: salesOpportunity
        }).then(
            function (data) {
                console.log(data);
                window.location.replace('/evento?id=' + self.event.CodReuniao);
            },
            function (data) {
                console.log(data);
            });
    };

    /**
     * Product opportunities handlers
     */
    self.addOpportunity = function (productId) {
        if (productId == undefined) {
            var selectBox = document.getElementById("product-selector");
            productId = selectBox.options[selectBox.selectedIndex].value;
        }

        console.log('here');
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

    self.toggleOpportunitySelected = function (id) {
        var index = self.selectedOpportunities.indexOf(id);

        if (index != -1) {
            self.selectedOpportunities.splice(index, 1);
        } else {
            self.selectedOpportunities.push(id);
        }

        console.log(self.selectedOpportunities);
    };

    self.removeOpportunity = function () {

        self.productOpportunities = self.productOpportunities.filter(function (el) {
            if (self.selectedOpportunities.indexOf(el) == -1) {
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
        if (productId) {
            return self.productOpportunities.indexOf(productId) != -1;
        } else {
            return self.productOpportunities.length > 0;
        }
    };

});