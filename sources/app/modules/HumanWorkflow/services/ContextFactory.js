var app = angular.module('HumanWorkflow.services');

app.factory('ContextFactory', function ($routeParams, ProgressService, Debug) {

  var debug = Debug('ContextFactory');

  return function () {
    var ctx = {};

    ctx.workflowContext = $routeParams.bpmWorklistContext;
    ctx.taskId = $routeParams.bpmWorklistTaskId;

    if (ctx.workflowContext == undefined || ctx.taskId == undefined) {
      var message = 'Must specify bpmWorklistContext and bpmWorklistTaskId';
      ProgressService.$error(message);
      throw Error(message);
    }

    debug('GetContext', ctx);

    return ctx;
  };
});
