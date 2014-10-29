app = angular.module('HumanWorkflow.services');

app.provider 'ContextFactoryMock', ($provide, ContextFactoryProvider, $routeParamsMockProvider) ->

  # Mock it's dependecies
  $provide.service('$routeParams', $routeParamsMockProvider.$get)

  # Provider factory function
  this.$get = ($routeParams, ProgressService, Debug) ->
    $routeParamsMockProvider.setParams('ContextFactory')

    args = Array.prototype.slice.call(arguments, 0);

    # Return the function with the propper argument mapping
    return -> ContextFactoryProvider.$get.apply(ContextFactoryProvider.$get, args)

  return
