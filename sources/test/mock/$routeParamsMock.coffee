app = angular.module('Utils');

app.provider '$routeParamsMock', ->

  # Default key
  key = "default"

  # Params map
  params = {
    default: {}
    ContextFactory:
      bpmWorklistContext: 'context'
      bpmWorklistTaskId: 'taskId'
  }

  # Provider API for setting params
  this.setParams = (paramsFor) -> key = paramsFor

  # Provider factory function
  this.$get = -> params[key]

  return
