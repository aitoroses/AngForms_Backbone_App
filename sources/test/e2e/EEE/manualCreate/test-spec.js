describe('EEE creation page', function() {

  var createAsJlondon = Global.Server +
    "/#/create?e3u=eJzLysnPS8nPAwAL0AL1" +
    "&e3rl=H4sIAAAAAAAAAH1Q2wqCQBD9FT9A9iPSrSy8ZNZDEbLIJIs6WztuQV%2BfsBSVa08DZ86cyxw55ywHUu0NNAt5sGcHwF6LFspQAlIPvjfmZOvoBV8NDCS" +
    "Lu6ib2IVGRZlA%2F7iDbnxvZkgiEGVaVcMAYgutzCWESpJUWIgG9ITIjkB3AkUN3RDbJfVO6FJY5hb9srKrVZCmGc9dV1xiI8x5IlKhhUSJtdNvy%2F%2Fuk3kQ" +
    "fxDGbX5%2B4qpr9U5PocZi7toBAAA%3D";

  it("shouldn't let create without nothing", function() {
    browser.get(createAsJlondon);

    return element(by.css('[ng-click="submitTicket()"]')).evaluate('canPerformSubmit()')
      .then(function(v){
        expect(v).toEqual(false);
      });

  });

  it("shouldn't let create without selecting Employee", function() {
    browser.get(createAsJlondon);
    browser.sleep(2000);
    var manualAction = element(by.cssContainingText('option', 'Emergency Offboarding'))
    manualAction.click();
    manualAction.evaluate('create.ticket.ticketAction').then(function(v){
      expect(v).not.toEqual('0');
    });
    browser.sleep(5000)
  });
});
