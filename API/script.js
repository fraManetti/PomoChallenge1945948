$('body')
  .on('click', 'div.ten button.btn-search', function(event) {
    var $input = $('div.ten input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
      console.log(event.currentTarget);
    }
  })
 
;