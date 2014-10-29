/**
 * Created by anet on 19/08/14.
 */

var app = angular.module('HumanWorkflow.services');

app.factory('TaskUpdateService', function (UriService, Debug, $http, $routeParams, HumanTaskService) {

  var debug = Debug("TaskUpdateService");

  function newInstance() {
    return {"soapenv:Envelope": {"@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/", "@xmlns:tas": "http://xmlns.oracle.com/bpel/workflow/taskService", "@xmlns:tas1": "http://xmlns.oracle.com/bpel/workflow/TaskEvidenceService", "soapenv:Header": "", "soapenv:Body": {"tas:updateTask": {"workflowContext": {"@xmlns:default": "http://xmlns.oracle.com/bpel/workflow/common", "token": "?"}, "task": {"@xmlns:default": "http://xmlns.oracle.com/bpel/workflow/task"}}}}};
  }

  function updateTask() {
    var storedTask = HumanTaskService.task;
    var task = newInstance();
    task["soapenv:Envelope"]["soapenv:Body"]["tas:updateTask"].task = storedTask;
    task["soapenv:Envelope"]["soapenv:Body"]["tas:updateTask"].workflowContext.token = $routeParams.bpmWorklistContext;

    return $http.post(UriService.taskUpdateServiceUri, task).success(function (res) {
      debug(res);
    });
  }

  return {
    newInstance: newInstance,
    updateTask: updateTask
  };
});
