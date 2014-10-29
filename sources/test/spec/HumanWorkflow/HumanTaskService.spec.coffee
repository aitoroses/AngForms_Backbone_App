'use strict'

describe 'HumanTaskService', ->

  # URLS
  getTaskUrl = "http://soa-server:7003/bridgesvc/TaskQueryService/getTaskDetailsById"
  getWorkflowCtxUrl = "http://soa-server:7003/bridgesvc/TaskQueryService/getWorkflowContext"
  updateOutcomeUrl = "http://soa-server:7003/bridgesvc/TaskServicePort/updateOutcome"

  # Load the main Module
  beforeEach module('main')

  # Provide a Mocked version of $routeParams
  beforeEach module ($provide, $routeParamsMockProvider, DebugProvider) ->
    $routeParamsMockProvider.setParams('ContextFactory')
    $provide.provider '$routeParams', $routeParamsMockProvider
    # Setup loggint to test
    DebugProvider.useEnvironment('testing')
    return # this is needed

  # Global context
  root = this

  # Inject the dependencies for each test
  $injector = null
  HumanTaskService = null
  $httpBackend = null
  $transposer = null
  ContextFactory = null

  beforeEach inject (_HumanTaskService_, _$httpBackend_, _$injector_, _$transposer_, _ContextFactory_) ->
    HumanTaskService = _HumanTaskService_
    $httpBackend = _$httpBackend_
    $injector = _$injector_
    $transposer = _$transposer_
    ContextFactory = _ContextFactory_

    # Mock $httpBackend here
    envelope = (obj) ->
      "env:Envelope":
        "env:Body":obj

    # Mock responses
    root.taskMock = envelope("task": "mytask")
    root.ctxMock =  envelope("workflowContext": "RandomString")

    # Http backend service mocking
    $httpBackend.when('POST', getTaskUrl)
      .respond -> [200, root.taskMock]
    $httpBackend.when('POST', getWorkflowCtxUrl)
      .respond -> [200, root.ctxMock]
    $httpBackend.when('POST', updateOutcomeUrl)
      .respond -> [200, {}]

    return

  flushAndVerify = ->
    $httpBackend.flush()
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    return


  # Test Cases
  it 'should be an object', ->
    expect(typeof HumanTaskService).toEqual "object"

  it 'should have some methods', ->
    expect(typeof HumanTaskService.getTaskPromise).toEqual "function"
    expect(typeof HumanTaskService.getWorkflowContext).toEqual "function"
    expect(typeof HumanTaskService.updateOutcome).toEqual "function"

  it 'should throw error when accessing task without first calling the promise', ->
    exception = null
    try
      task = HumanTaskService.task
    catch error
      exception = error
    expect(exception).not.toEqual null

  it 'should return inner _task property', ->
    task = {task: "task"}
    HumanTaskService.task = task
    expect(HumanTaskService.task).toEqual task

  it 'should throw error when accessing workflowContext without first calling the getWorkflowContext', ->
    exception = null
    try
      task = HumanTaskService.workflowContext
    catch error
      exception = error
    expect(exception).not.toEqual null

  it 'should return inner _workflowContext property', ->
    workflow = {w: "f"}
    HumanTaskService.workflowContext = workflow
    expect(HumanTaskService.workflowContext).toEqual workflow

  it 'should return a promise when getTaskPromise is called', ->
    promise = HumanTaskService.getTaskPromise()
    expect(promise.then? && promise.catch?).toBe true

  it 'should return a promise when getWorkflowContext is called', ->
    promise = HumanTaskService.getWorkflowContext()
    expect(promise.then? && promise.catch?).toBe true

  it 'should return a promise when updateOutcome is called', ->
    promise = HumanTaskService.updateOutcome()
    expect(promise.then? && promise.catch?).toBe true

  it 'should return a task when calling getTaskPromise', (done) ->
    $httpBackend.expectPOST(getTaskUrl)
    promise = HumanTaskService.getTaskPromise()
    promise.then (res) ->
      task = $transposer('$..task', res)
      setTimeout ->
        expect(task).toBe "mytask"
        done()
    flushAndVerify()
    return

  it 'should return a workflowContext when calling getWorkflowContext', (done) ->
    $httpBackend.expectPOST(getWorkflowCtxUrl)
    promise = HumanTaskService.getWorkflowContext()
    promise.then (res) ->
      ctx = $transposer('$..workflowContext', res)
      setTimeout ->
        expect(ctx).toBe "RandomString"
        done()
    flushAndVerify()
    return

  it 'should call updateOutcome with proper body structure', (done) ->
    $httpBackend.expectPOST(updateOutcomeUrl)
    # Call updateOutcome
    promise = HumanTaskService.updateOutcome('SUBMIT')
    promise.then (res) ->
      expect(res.config.data).toEqual {workflowContext: "context", taskId: "taskId", outcome: "SUBMIT"}
      done()
    # Verify http calls
    flushAndVerify()
    return

