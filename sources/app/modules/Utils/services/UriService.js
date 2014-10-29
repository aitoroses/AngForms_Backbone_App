var app = angular.module('Utils.services');

app.factory('UriService', function (Global, $location, Utils) {

  function tmplFn(uri) {
    return _.template(Global.Server + uri);
  }

  function tmpl(uri, context) {
    return _.template(Global.Server + uri)({});
  }

  return {
    get statsByIdUri() {
      return tmplFn('/eeers/configcache/stats/lastupdated/${installId}');
    },
    get statsByNameUri() {
      return tmplFn('/eeers/configcache/stats/lastupdated/name:${installName}');
    },
    get configByIdUri() {
      return tmplFn('/eeers/configcache/config/${installId}');
    },
    get configByNameUri() {
      return tmplFn('/eeers/configcache/config/name:${installName}');
    },
    get ticketByIdUri() {
      return tmplFn('/eeers/runtime/tickets/${ticketId}');
    },
    get ticketWithTaskUri() {
      return tmplFn('/eeers/runtime/tickets/${ticketId}/task:${taskId}');
    },
    get ticketUpdateUri() {
      return tmpl('/eeers/runtime/tickets/update');
    },
    get manualTicketCreationUri() {
      return tmpl('/bridgesvc/EEEServices/manualTicketCreation');
    },
    get privilegedTicketCreationUri() {
      return tmpl('/bridgesvc/EEEServices/privilegedTicketCreation');
    },
    get hrCoreInfoUri() {
      return tmplFn('/eeers/interfaces/get/action:${action}/employee:${employee}');
    },
    get ummUser() {
      return tmplFn('/umms/user/uid:${uid}/fn:${firstName}/ln:${lastName}');
    },
    get getTaskDetailsByIdUri() {
      return tmpl('/bridgesvc/TaskQueryService/getTaskDetailsById');
    },
    get getWorkflowContextUri() {
      return tmpl('/bridgesvc/TaskQueryService/getWorkflowContext');
    },
    get authenticateUri() {
      return tmpl('/bridgesvc/TaskQueryService/authenticate');
    },
    get getQueryTasksUri() {
      return tmpl('/bridgesvc/TaskQueryService/queryTasks');
    },
    get taskUpdateServiceUri() {
      return tmpl('/bridgesvc/TaskServicePort/updateTask');
    },
    get taskUpdateOutcomeUri() {
      return tmpl('/bridgesvc/TaskServicePort/updateOutcome');
    },
    get manualCreationPopupUri() {
      var cookies = Utils.helpers.cookies;
      var e3u = encodeURIComponent(cookies['e3u']);
      var e3rl = encodeURIComponent(cookies['e3rl']);
      return $location.protocol() + '://' + $location.host() + ':' + $location.port() + document.location.pathname + '#/create?e3u=' + e3u + '&e3rl=' + e3rl;
    },
    get privilegedCreationPopupUri() {
      var cookies = Utils.helpers.cookies;
      var e3u = encodeURIComponent(cookies['e3u']);
      var e3rl = encodeURIComponent(cookies['e3rl']);
      return $location.protocol() + '://' + $location.host() + ':' + $location.port() + document.location.pathname + '#/privileged?e3u=' + e3u + '&e3rl=' + e3rl;
    }
  };

});
