// Create The HumanWorkflow module
var ht = angular.module('HumanWorkflow.services');

ht.factory('HumanTaskService', function (UriService, ContextFactory, Global, Debug, $http, ProgressService) {

  var debug = Debug('HumantaskService');

  // Service urls
  var baseUrl = Global.Server + '/bridgesvc/';
  var taskQueryService = baseUrl + "TaskQueryService/";
  var taskServicePort = baseUrl + "TaskServicePort/";

  // Task cache
  var _task = null;
  var _workflowContext = null;

  /**
   * A function that returns a Promise to a task built
   * retrieved by the URL params
   * @returns A promise
   */
  function getTaskPromise() {
    var ctx = ContextFactory();
    // return a promise
    return $http.post(UriService.getTaskDetailsByIdUri, ctx).success(function (data) {
      _task = data["env:Envelope"]["env:Body"].task;
    });
  }

  function getWorkflowContext() {
    var ctx = ContextFactory();

    return $http.post(UriService.getWorkflowContextUri, ctx).success(function (data) {
      _workflowContext = data["env:Envelope"]["env:Body"].workflowContext;
    });
  }

  /**
   * Update the target task
   * @param outcome
   */
  function updateOutcome(outcome) {

    // get the context and then
    // add an outcome
    var ctx = ContextFactory();
    ctx.outcome = outcome;

    debug("setOutcome", ctx);

    return $http.post(UriService.taskUpdateOutcomeUri, ctx).success(function () {
      debug('Updating task');
    });
  }

  function getAssignedTasks(workflowContext) {
    var ctx = {
      'workflowContext' : workflowContext,
      'startRow' : '0',
      'endRow' : '0',
      'assignmentFilter' : 'My+Group',
      'textAttributes' : ['textAttribute1','textAttribute2','textAttribute3', 'textAttribute4','textAttribute5','textAttribute6', 'textAttribute7'],
      'clauses' : [
        { 'joinOperator' : 'AND', 'column' : 'state', 'operator' : 'EQ', 'value' : 'ASSIGNED'}
      ]
    };

    return $http.post(UriService.getQueryTasksUri, ctx).success(function (data) {
    });
  }

  function getAssignedTasksBy(workflowContext, clauses) {
    var ctx = {
      'workflowContext' : workflowContext,
      'startRow' : '0',
      'endRow' : '0',
      'assignmentFilter' : 'My+Group',
      'textAttributes' : ['textAttribute1','textAttribute2','textAttribute3', 'textAttribute4','textAttribute5','textAttribute6', 'textAttribute7'],
      'clauses' : clauses
    };

    return $http.post(UriService.getQueryTasksUri, ctx).success(function (data) {
      //_workflowContext = data["env:Envelope"]["env:Body"].workflowContext;
    });
  }

  /**
   * Expose a public API
   * @type {{baseUrl: string, getTaskPromise: getTaskPromise, updateOutcome: updateOutcome}}
   */
  var result = {
    baseUrl: baseUrl,
    getTaskPromise: getTaskPromise,
    getWorkflowContext: getWorkflowContext,
    updateOutcome: updateOutcome,
    getAssignedTasks: getAssignedTasks,
    getAssignedTasksBy: getAssignedTasksBy
  };

  /**
   * Define additional properties to the public API
   */
  Object.defineProperty(result, 'task', {
    get: function () {
      if (_task == null) throw Error('There is no task cached.')
      return _task;
    },
    set: function(task) {
      _task = task;
    }
  });

  Object.defineProperty(result, 'workflowContext', {
    get: function () {
      if (_workflowContext == null) {
        var message = 'There is no workflowContext cached.';
        ProgressService.$error(message);
        throw Error(message)
      }
      return _workflowContext;
    },
    set: function(context) {
      _workflowContext = context;
    }
  });

  // Return the result
  return result;
});
