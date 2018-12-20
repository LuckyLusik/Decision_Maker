$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });;

});


$(document).ready(function() {
  var addChoice = 0;

  $("#addchoice").click(function() {
    if (addChoice === 0){
      $(".newchoice3").slideDown("slow");
      addChoice += 1;
    } else {
      if (addChoice === 1){
      $(".newchoice4").slideDown("slow");
      $("#rem3").css('visibility', 'hidden');
      addChoice += 1;
      } else {
        if (addChoice === 2){
          $(".newchoice5").slideDown("slow");
          $("#rem4").css('visibility', 'hidden');
          addChoice += 1;
        } else {
          $("#addchoice").attr("disabled", "disabled");
        }
      }
    }
  });


  $("#rem3").click(function() {
    $(".newchoice3").slideUp("slow");
    addChoice -= 1;
  });

  $("#rem4").click(function() {
    $(".newchoice4").slideUp("slow");
    $("#rem3").css('visibility', 'visible');
    addChoice -= 1;
  });

  $("#rem5").click(function() {
    $(".newchoice5").slideUp("slow");
    $("#rem4").css('visibility', 'visible');
    addChoice -= 1;
    $("#addchoice").removeAttr("disabled");
  });
});

