'use strict'

describe 'Task Update Service', ->

  # Load the main Module
  beforeEach module('main')

  # Provide a Mocked version of $routeParams
  beforeEach module ($provide, $routeParamsMockProvider, DebugProvider) ->
    $routeParamsMockProvider.setParams('ContextFactory')
    $provide.service '$routeParams', $routeParamsMockProvider.$get
    DebugProvider.useEnvironment('testing')
    return # this is needed

  # Inject the dependencies for each test
  TaskUpdateService = null
  $transposer = null
  $routeParams = null
  HumanTaskService = null
  UriService = null
  $httpBackend = null

  beforeEach inject (_TaskUpdateService_, _$transposer_, _$routeParams_, _HumanTaskService_, _UriService_, _$httpBackend_) ->
    TaskUpdateService = _TaskUpdateService_
    $transposer = _$transposer_
    $routeParams = _$routeParams_
    HumanTaskService = _HumanTaskService_
    UriService = _UriService_
    $httpBackend = _$httpBackend_

    $httpBackend.whenPOST(UriService.taskUpdateServiceUri).respond -> [200, {task: "task"}]

    HumanTaskService.task = {task: "myTask"}

  flushAndVerify = ->
    $httpBackend.flush()
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    return

  # Test Cases
  it 'should be an object', ->
    expect(typeof TaskUpdateService).toEqual "object"

  it 'should have a method to create a new instance of placeholder data', ->
    instance = TaskUpdateService.newInstance()
    data = $transposer('$..tas:updateTask', instance)
    data.workflowContext.token = $routeParams.bpmWorklistContext;
    expect($transposer('$..token', instance)).toEqual("context")

  it 'should do an http call to TaskUpdateService and return the result', (done) ->
    $httpBackend.expectPOST(UriService.taskUpdateServiceUri)
    TaskUpdateService.updateTask().success((res) ->
      expect(res.task).toEqual "task"
      done()
    )
    flushAndVerify()

  return

