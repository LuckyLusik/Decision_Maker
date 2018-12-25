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
          $("#addchoice").attr("disabled", "disabled");
        }
      }
    }
  });

  $(".choice_rank").click(function(event) {
    console.log("choice clicked")
    if (event.target.id === "ch1-star5" ||
        event.target.id === "ch2-star5" ||
        event.target.id === "ch3-star5" ||
        event.target.id === "ch4-star5" ||
        event.target.id === "ch5-star5") {
      $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5")
        .attr("readonly", "readonly");
    }
    if (event.target.id === "ch1-star4" ||
        event.target.id === "ch2-star4" ||
        event.target.id === "ch3-star4" ||
        event.target.id === "ch4-star4" ||
        event.target.id === "ch5-star4") {
        $("#ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4")
        .attr("readonly", "readonly");
    }
    if (event.target.id === "ch1-star3" ||
        event.target.id === "ch2-star3" ||
        event.target.id === "ch3-star3" ||
        event.target.id === "ch4-star3" ||
        event.target.id === "ch5-star3") {
        $("#ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3")
        .attr("readonly", "readonly");
    }
    if (event.target.id === "ch1-star2" ||
        event.target.id === "ch2-star2" ||
        event.target.id === "ch3-star2" ||
        event.target.id === "ch4-star2" ||
        event.target.id === "ch5-star2") {
        $("#ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2")
        .attr("readonly", "readonly");
    }
    if (event.target.id === "ch1-star1" ||
        event.target.id === "ch2-star1" ||
        event.target.id === "ch3-star1" ||
        event.target.id === "ch4-star1" ||
        event.target.id === "ch5-star1") {
        $("#ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
        .attr("readonly", "readonly");
    }
   });
   
   $(".block1").click(function() {
    if (event.target.value) {
      $(".block1").css("pointer-events" , "none");
    }
   });
   $(".block2").click(function() {
    if (event.target.value) {
      $(".block2").css("pointer-events" , "none");
    }
   });
   $(".block3").click(function() {
    if (event.target.value) {
      $(".block3").css("pointer-events" , "none");
    }
   });
   $(".block4").click(function() {
    if (event.target.value) {
      $(".block4").css("pointer-events" , "none");
    }
   });
   $(".block5").click(function() {
    if (event.target.value) {
      $(".block5").css("pointer-events" , "none");
    }
   });
   
   $("#reset-btn").click(function() {
    $(".block1, .block2, .block3, .block4, .block5").css("pointer-events" , "auto");
    $(".block1, .block2, .block3, .block4, .block5").attr("value" , "");
    // $(".rating input").attr("checked" , "false");
    $( ".rating input" ).prop( "checked", false );
    // $(".rating input").removeAttr("checked");
    $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5, #ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4, #ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3, #ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2, #ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
    .removeAttr("disabled");
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

  $("#formData").on("submit", function(event) {
    event.preventDefault();
    serialized = $('#formData').serializeArray();
    let voteValue= {};
    let voteDuplicate = false;
    const shortUrl = location.pathname.split('/vl/');
    const remove = shortUrl.shift();        
    for (let i = 1; i < serialized.length; i++){
      voteValue[serialized[i].value] ? voteDuplicate = true : voteValue[serialized[i].value] = 1; 
      console.log('counter: ', i, serialized[i].value)
    }
    if (voteDuplicate){
      console.log('vote clear triggered');
        $('#formData').trigger('reset');
        $("#formData, .block1, .block2, .block3, .block4, .block5").css("pointer-events" , "auto");
        $("#formData, .block1, .block2, .block3, .block4, .block5").attr("value" , "");
        $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5, #ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4, #ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3, #ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2, #ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1").removeAttr("disabled")
    }
    console.log('formData: ',voteDuplicate, shortUrl, serialized)
    $.ajax(
      '/render/voteSubmission',
      {method: 'POST',
      data: { serialized,
        shortUrl,
      }
    })
  })
});

