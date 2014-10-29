'use strict'

describe 'Context Factory', ->

  # Load the main Module
  beforeEach module('main')

  describe 'with params', ->



    # Provide a Mocked version of $routeParams
    beforeEach module ($provide, $routeParamsMockProvider, DebugProvider) ->
      $routeParamsMockProvider.setParams('ContextFactory')
      $provide.service '$routeParams', $routeParamsMockProvider.$get
      DebugProvider.useEnvironment('testing')
      return # this is needed

    # Inject the dependencies for each test
    ContextFactory = null
    beforeEach inject (_ContextFactory_) ->
      ContextFactory = _ContextFactory_

    # Test Cases
    it 'should be a function', ->
      expect(typeof ContextFactory).toEqual "function"

    it 'should return a context object', ->
      context = ContextFactory();
      expect(context.workflowContext).toEqual "context"
      expect(context.taskId).toEqual "taskId"

    return

  describe 'without params', ->

    # Load the main Module
    beforeEach module('main')

    # Inject the dependencies for each test
    ContextFactory = null
    beforeEach inject (_ContextFactory_) ->
      ContextFactory = _ContextFactory_

    # Test Cases
    it 'should throw an error', ->
      exception = null
      try
        context = ContextFactory()
      catch error
        exception = error
      finally
        expect(exception).not.toBe null



    return
