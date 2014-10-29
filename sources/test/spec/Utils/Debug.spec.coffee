'use strict'

describe 'Debug Service', ->

  # Load the main Module
  beforeEach module('main')

  Debug = null
  debug = null

  injectDependencies = ->
    # Inject the dependencies for each test
    beforeEach inject (_Debug_) ->
      Debug = _Debug_
      debug = Debug('testing');

      # Put spy on log function
      spyOn(console, 'log')

  describe 'in development', ->

    beforeEach module (DebugProvider) ->
      DebugProvider.useStacking();

    injectDependencies()

    # Test Cases
    it 'should be a function', ->
      expect(typeof Debug).toEqual "function"

    it 'should create a debugging function', ->
      expect(typeof debug).toEqual "function"

    it 'should log a message with the debugging function', ->
      debug('MyMessage');
      expect(console.log).toHaveBeenCalled()
      expect(Debug.stack[0]).toEqual("MyMessage")

    it 'should log objects as stringified', ->
      testObj = {"hello": "test"}
      debug(testObj);
      expect(console.log).toHaveBeenCalled()
      expect(Debug.stack[0]).toEqual(JSON.stringify(testObj))

    it 'should accept more than 2 parameters', ->
      testObj = {"hello": "test"}
      debug("myObj", "myOther", testObj);
      expect(console.log).toHaveBeenCalled()
      expect(Debug.stack[0]).toEqual("%c:myObj:" + 'myOther:' + JSON.stringify(testObj))


  describe 'in production', ->

    beforeEach module (DebugProvider) ->
      DebugProvider.useEnvironment('production')
      DebugProvider.useStacking();

    injectDependencies()

    it 'should not log when using production mode', ->
      debug('MyMessage');
      expect(console.log).not.toHaveBeenCalled()

    it 'should stack messages to be recovered', ->
      debug('MyMessage');
      expect(Debug.stack[0]).toEqual("MyMessage")


  describe 'without stacking', ->

    beforeEach module 'main', (DebugProvider) ->
      DebugProvider.useEnvironment('production')

    injectDependencies()

    it 'should not have a stack and do stacking', ->
      debug('MyMessage');
      expect(Debug.stack).toBeUndefined()


  describe 'in IE9', ->

    beforeEach module (DebugProvider) ->
      DebugProvider.useStacking()

      window.console.log.apply = null

    injectDependencies()

    it 'should log messages using pure console.log without apply', ->
      debug('MyMessage');
      expect(console.log).toHaveBeenCalled()
      expect(Debug.stack[0]).toEqual("MyMessage")


  return