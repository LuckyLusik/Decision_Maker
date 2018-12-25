$(document).ready(function() {
  // var addChoice = 0;
  var addChoice = 3;
  var prevChoice = 2;
// When Add Choice button clicked - adds a new choice
  function addNewChoice(choiceNum) {
    let newChoiceDiv =
    `<div class="newchoice${addChoice}" style="display: none">
      <div class="form-group">
        <label class="control-label col-sm-2" for="choice${addChoice}">Choice ${addChoice}:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="choice${addChoice}" placeholder="Enter choice #${addChoice}" name="choice${addChoice}">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2 remove" id="rem${addChoice}" for="choice">Remove Choice ${addChoice}</label>
        <div class="col-sm-10">
          <textarea type="text" class="form-control" id="descr${addChoice}" placeholder="Enter description for choice #${addChoice} (optional, 150 symbols max)" name="choiceDescription${addChoice}"></textarea>
        </div>
      </div>
    </div>`
    return newChoiceDiv;
  }

// Use it for SUBMIT button when empty fields
  $("#poll-info").submit(function(event) {
    event.preventDefault();
    $(".alert, .alert-danger").slideDown("slow");
  });

  $("#poll-info").on( "keyup", function() {
    $(".alert, .alert-danger").slideUp("slow");
  });
// -------------------------------------

// index.ejs:
// On click "Add choice" more choice added
$("#addchoice").click(function(event) {
    $(`.newchoice${prevChoice}`).after(addNewChoice(addChoice));
    $(`.newchoice${addChoice}`).slideDown("slow");
    $(`#rem${prevChoice}`).css('visibility', 'hidden');
    addChoice += 1;
    prevChoice = addChoice - 1;
  });

// Old version:
// $("#addchoice").click(function(event) {
//     if (addChoice === 0){
//       $(".newchoice3").slideDown("slow");
//       addChoice += 1;
//     } else {
//       if (addChoice === 1){
//       $(".newchoice4").slideDown("slow");
//       $("#rem3").css('visibility', 'hidden');
//       addChoice += 1;
//       } else {
//         if (addChoice === 2){
//           $(".newchoice5").slideDown("slow");
//           $("#rem4").css('visibility', 'hidden');
//           addChoice += 1;
//           $("#addchoice").attr("disabled", "disabled");
//         }
//       }
//     }
//   });

//Remove a freshly added choice
  $("#poll-info").on("click", ".remove", function(event){
    $(`.newchoice${prevChoice}`).slideUp("slow", function() {
      $(`.newchoice${prevChoice}`).remove();
      if (prevChoice >= 3) {
        $(`#rem${prevChoice-1}`).css('visibility', 'visible');
      }
      addChoice -= 1;
      prevChoice = addChoice - 1;
    });
  });

// Old version:
  // $("#rem3").click(function() {
  //   $(".newchoice3").slideUp("slow");
  //   addChoice -= 1;
  // });

  // $("#rem4").click(function() {
  //   $(".newchoice4").slideUp("slow");
  //   $("#rem3").css('visibility', 'visible');
  //   addChoice -= 1;
  // });

  // $("#rem5").click(function() {
  //   $(".newchoice5").slideUp("slow");
  //   $("#rem4").css('visibility', 'visible');
  //   addChoice -= 1;
  //   $("#addchoice").removeAttr("disabled");
  // });


// ---------------------------------------

// voting.ejs:
// On click on the certain star on one choice
// the same star will be disable on others choices
  $(".choice_rank").click(function(event) {
    if (event.target.id === "ch1-star5" ||
        event.target.id === "ch2-star5" ||
        event.target.id === "ch3-star5" ||
        event.target.id === "ch4-star5" ||
        event.target.id === "ch5-star5") {
      $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5")
        .attr("disabled", "disabled");
    }
    if (event.target.id === "ch1-star4" ||
        event.target.id === "ch2-star4" ||
        event.target.id === "ch3-star4" ||
        event.target.id === "ch4-star4" ||
        event.target.id === "ch5-star4") {
        $("#ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4")
        .attr("disabled", "disabled");
    }
    if (event.target.id === "ch1-star3" ||
        event.target.id === "ch2-star3" ||
        event.target.id === "ch3-star3" ||
        event.target.id === "ch4-star3" ||
        event.target.id === "ch5-star3") {
        $("#ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3")
        .attr("disabled", "disabled");
    }
    if (event.target.id === "ch1-star2" ||
        event.target.id === "ch2-star2" ||
        event.target.id === "ch3-star2" ||
        event.target.id === "ch4-star2" ||
        event.target.id === "ch5-star2") {
        $("#ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2")
        .attr("disabled", "disabled");
    }
    if (event.target.id === "ch1-star1" ||
        event.target.id === "ch2-star1" ||
        event.target.id === "ch3-star1" ||
        event.target.id === "ch4-star1" ||
        event.target.id === "ch5-star1") {
        $("#ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
        .attr("disabled", "disabled");
    }
  });

// When choice was made you cannot click to another star
// for this choice
  $(".block1").click(function(event) {
    if (event.target.value) {
      $(".block1").css("pointer-events" , "none");
    }
  });
  $(".block2").click(function(event) {
    if (event.target.value) {
      $(".block2").css("pointer-events" , "none");
    }
  });
  $(".block3").click(function(event) {
    if (event.target.value) {
      $(".block3").css("pointer-events" , "none");
    }
  });
  $(".block4").click(function(event) {
    if (event.target.value) {
      $(".block4").css("pointer-events" , "none");
    }
  });
  $(".block5").click(function(event) {
    if (event.target.value) {
      $(".block5").css("pointer-events" , "none");
    }
  });

// Reset all choices
  $("#reset-btn").click(function(event) {
    $(".block1, .block2, .block3, .block4, .block5").css("pointer-events" , "auto");
    $(".block1, .block2, .block3, .block4, .block5").attr("value" , "");
    // $(".rating input").attr("checked" , "false");
    $( ".rating input" ).prop( "checked", false );
    // $(".rating input").removeAttr("checked");
    $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5, #ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4, #ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3, #ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2, #ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
    .removeAttr("disabled");
  });

// --------------------

});

