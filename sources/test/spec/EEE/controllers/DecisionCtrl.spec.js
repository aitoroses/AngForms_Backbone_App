'use strict';


describe('Decision Controller', function() {

    // Prevent the alert logs
    beforeEach(function(){
      spyOn(window, 'alert').and.callFake(function(){});
    })

    var decisionCtrl, $scope, $httpBackend, $routeParams, modalInput, EEEService, RuntimeService;

    beforeEach(module('main'));

    // Mock some dependencies
    beforeEach(function() {
        module(function($provide, $qMockProvider, DebugProvider){
            $provide.value('$modal', jasmine.createSpy("$modal"));
            $provide.provider('$q', $qMockProvider);
            DebugProvider.useEnvironment('testing');
        });
    })

    beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$routeParams_ , _EEEService_,
                               _RuntimeService_) {

        // Mock RuntimeService
        RuntimeService = _RuntimeService_;
        spyOn(RuntimeService, 'getFromRoute').and.callThrough();

        // EEEService
        EEEService = _EEEService_;
        spyOn(EEEService, 'getApplicationData').and.callThrough();

        // Get a mockable $http service
        $httpBackend = _$httpBackend_;

        // Mock the ticket endpoint
        //$httpBackend.when('GET', Global.Server + '/eeers/runtime/tickets/MY_TICKET_ID').respond({});

        // Mock ticketId in the URL
        $routeParams = _$routeParams_;
        $routeParams.ticket = "MY_TICKET_ID";

        // Create a new $scope
        $scope = $rootScope.$new();

        // Instantiate the controller
        decisionCtrl = $controller('DecisionCtrl', {
            $scope: $scope
        });

        // Modal input
        modalInput = {
            scope: $scope,
            template: 'views/EEE/dlg-search-user.html',
            show: false,
            backdrop: 'static',
            animation: 'am-fade-and-slide-top'
        }

    }));

    it('should exist', function() {
        expect(decisionCtrl).not.toBeUndefined();
    });

    it('should been initialized with some initial values', function() {
        expect(decisionCtrl.params).toEqual($routeParams);
        expect(decisionCtrl.ticket).toEqual({});
        expect(decisionCtrl.config).toEqual({});
        expect(decisionCtrl.resolvers).toEqual({});
        expect(decisionCtrl.profiles).toEqual([]);
    });

    xit('should prepare a modal object for user search', inject(function($modal){
        expect($modal).toHaveBeenCalledWith(modalInput);
    }));

    it('should call a ticket', function(){
        expect(RuntimeService.getFromRoute).toHaveBeenCalled();
    });

    it('should request application data', function() {
        expect(EEEService.getApplicationData).toHaveBeenCalled();
    });

    xit('should call updateTicket with the ticket when saving', function() {
        expect(true).toBe(false);
    });

});