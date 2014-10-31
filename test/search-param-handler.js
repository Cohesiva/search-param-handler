'use strict';

describe('Service SearchParamHandler', function() {

    var $rootScope,
        $scope,
        $location,
        SearchParamHandler,
        searchParamHandler,
        searchParamHandlerParams,
        callback;

    function createSearchParamHandler() {
        searchParamHandlerParams = {
            scope: $scope,
            name: 'searchParamName',
            allowedValues: [true, 'bbb'],
            callback: callback
        };
        searchParamHandler = new SearchParamHandler(searchParamHandlerParams);
        $scope.$digest();
    }

    function setSearchParamHandlerSearchParam(value) {
        var search = {};
        search[searchParamHandlerParams.name] = value;
        $location.search.and.returnValue(search);
    }

    beforeEach(function() {

        callback = jasmine.createSpy('callback');

        $location = jasmine.createSpyObj('$location', ['search']);

        module('cohesiva.searchParamHandler', ['$provide',
            function($provide) {
                $provide.value('$location', $location);
            }
        ]);

        inject(['$injector',
            function($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                SearchParamHandler = $injector.get('SearchParamHandler');
            }
        ]);

    });

    describe('when there is no specified search param in url', function() {

        beforeEach(function() {
            $location.search.and.returnValue({});
            createSearchParamHandler();
        });

        it('should call callback with undefined', function() {
            expect(callback).toHaveBeenCalledWith(undefined);
        });

        it('should call callback once', function() {
            expect(callback.calls.count()).toBe(1);
        });

        it('and search param in url is changed to allowed value, should call callback with this value', function() {
            callback.calls.reset();
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[0]);
            $scope.$digest();
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[0]);
        });

        it('and search param in url is changed to another allowed value, should call callback with this value', function() {
            callback.calls.reset();
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[1]);
            $scope.$digest();
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[1]);
        });

        describe('and search param in url is changed to value other than allowed value', function() {

            beforeEach(function() {
                callback.calls.reset();
                setSearchParamHandlerSearchParam('aaa');
                $scope.$digest();
            });

            it('should call callback with undefined', function() {
                expect(callback).not.toHaveBeenCalled();
            });

            it('should correct search param value in url', function() {
                expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, null);
            });

        });

        it('and set url param is requested with allowed value, should change saerch param in url to this value', function() {
            $location.search.calls.reset();
            searchParamHandler.setSearchParam(searchParamHandlerParams.allowedValues[0]);
            expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, searchParamHandlerParams.allowedValues[0]);
        });

        it('and set url param is requested with another allowed value, should change saerch param in url to this value', function() {
            $location.search.calls.reset();
            searchParamHandler.setSearchParam(searchParamHandlerParams.allowedValues[1]);
            expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, searchParamHandlerParams.allowedValues[1]);
        });

        it('and set url param is requested with not allowed value, should not change saerch param in url', function() {
            $location.search.calls.reset();
            searchParamHandler.setSearchParam('aaa');
            expect($location.search).not.toHaveBeenCalled();
        });

    });

    describe('when specified search param in url is set to allowed value', function() {

        beforeEach(function() {
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[0]);
            createSearchParamHandler();
        });

        it('should set showRightPanel to true', function() {
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[0]);
        });

        it('should call callback once', function() {
            expect(callback.calls.count()).toBe(1);
        });

        it('and search param in url dissapears, should call callback with undefined', function() {
            callback.calls.reset();
            $location.search.and.returnValue({});
            $scope.$digest();
            expect(callback).toHaveBeenCalledWith(undefined);
        });

        it('and search param in url is changed to another allowed value, should call callback with this value', function() {
            callback.calls.reset();
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[1]);
            $scope.$digest();
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[1]);
        });

        describe('and search param in url is changed to value other than allowed value', function() {

            beforeEach(function() {
                setSearchParamHandlerSearchParam('aaa');
                $scope.$digest();
            });

            it('should not call callback', function() {
                callback.calls.reset();
                expect(callback).not.toHaveBeenCalled();
            });

            it('should correct search param value in url', function() {
                expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, searchParamHandlerParams.allowedValues[0]);
            });

        });

        it('and set url param is requested with null, should remove search param from url', function() {
            $location.search.calls.reset();
            searchParamHandler.setSearchParam(null);
            $scope.$digest();
            expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, null);
        });

    });

    describe('when specified search param in url is set to another allowed value', function() {

        beforeEach(function() {
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[1]);
            createSearchParamHandler();
        });

        it('should set showRightPanel to true', function() {
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[1]);
        });

        it('should call callback once', function() {
            expect(callback.calls.count()).toBe(1);
        });

        it('and search param in url is changed to another allowed value, should call callback with this value', function() {
            callback.calls.reset();
            setSearchParamHandlerSearchParam(searchParamHandlerParams.allowedValues[0]);
            $scope.$digest();
            expect(callback).toHaveBeenCalledWith(searchParamHandlerParams.allowedValues[0]);
        });

    });

    describe('when search param in url is set to value other than allowed', function() {

        beforeEach(function() {
            setSearchParamHandlerSearchParam('aaa');
            createSearchParamHandler();
            $location.search.and.returnValue({});
            $scope.$digest();
        });

        it('should call callback with undefined', function() {
            expect(callback).toHaveBeenCalledWith(undefined);
        });

        it('should call callback once', function() {
            expect(callback.calls.count()).toBe(1);
        });

        it('should correct search param value in url', function() {
            expect($location.search).toHaveBeenCalledWith(searchParamHandlerParams.name, null);
        });

    });

});
