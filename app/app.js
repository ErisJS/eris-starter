define([
  "jquery"
],
function($) {

  // Application instance
  // --------------------
  var App = {
    appName: 'Eris Starter',
    companyName: 'Company Name',

    start: function() {
      console.log('app:start()');

      $(document).ready(function() {
        document.title = App.appName;
        $('.brand').html(App.companyName + '::' + App.appName);
        $('.copyright').html('Copyright &copy;2012 ' +  App.companyName + ', Inc.');
      });
    }
  };

  return App;
});
