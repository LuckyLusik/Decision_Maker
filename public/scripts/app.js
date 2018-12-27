$(document).ready(function() {
  var addChoice = 0;
  let numChoices = document.getElementsByClassName("choice_rank");
  let starNumber = "";
  let starDig = "";
  let choiceNumber = "";


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
      addChoice -= 1;
      prevChoice = addChoice - 1;
    };
  });

<<<<<<< HEAD
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
// the same star will be disable on others choices.
// When choice was made you cannot click to another star
// for this choice.

  var starNumber = "";
  var starDig = "";
  var choiceNumber = "";
  $(".choice_rank").click(function(event) {
    starNumber = event.target.id;
    starDig = starNumber.slice(8);
    choiceNumber = starNumber.slice(2, 3);
    for (let i = 1; i <= 5; i++) {
      $(`.class${starDig}`).addClass("taken");
      $(`#ch${i}-star${starDig}`).attr("disabled", "disabled");
    }

    if (event.target.value) {
      $(`.block${choiceNumber}`).css("pointer-events" , "none");
    }
=======
    console.log("choice clicked", document.getElementsByClassName("choice_rank"))
    
    $(".choice_rank").click(function(event) {
      starNumber = event.target.id;
      starDig = starNumber.slice(8);
      choiceNumber = starNumber.slice(2, 3);
      for (let i = 1; i <= numChoices.length; i++) {
        $(`.class${starDig}`).addClass("taken");
        $(`#ch${i}-star${starDig}`).attr("disabled", "disabled");
      }
      if (event.target.value) {
        $(`.block${choiceNumber}`).css("pointer-events" , "none");
      }
    });
   
   $("#reset-btn").click(function(event) {
     console.log('Reset Button: ', numChoices.length)
    for (let i = 1; i <= numChoices.length; i++) {
      $(`.class${i}`).removeClass("taken");
      $(`.block${i}`).css("pointer-events" , "auto");
      $(`.block${i}`).attr("value" , "");
      $( ".rating input" ).prop( "checked", false );
      for (let j = 1; j <= numChoices.length; j++){
        $(`#ch${i}-star${j}`).removeAttr("disabled");
      }
    }
  });


  $("#rem3").click(function() {
    $(".newchoice3").slideUp("slow");
    addChoice -= 1;
>>>>>>> 1caa466fead096269d8e0825c215ed263e2b0432
  });
// Old version:
    // if (event.target.id === "ch1-star5" ||
    //     event.target.id === "ch2-star5" ||
    //     event.target.id === "ch3-star5" ||
    //     event.target.id === "ch4-star5" ||
    //     event.target.id === "ch5-star5") {
    //   $(".class5").addClass("taken");
    //   $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5")
    //     .attr("disabled", "disabled");

    // }
    // if (event.target.id === "ch1-star4" ||
    //     event.target.id === "ch2-star4" ||
    //     event.target.id === "ch3-star4" ||
    //     event.target.id === "ch4-star4" ||
    //     event.target.id === "ch5-star4") {
    //   $(".class4").addClass("taken");
    //     $("#ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4")
    //     .attr("disabled", "disabled");
    // }
    // if (event.target.id === "ch1-star3" ||
    //     event.target.id === "ch2-star3" ||
    //     event.target.id === "ch3-star3" ||
    //     event.target.id === "ch4-star3" ||
    //     event.target.id === "ch5-star3") {
    //   $(".class3").addClass("taken");
    //     $("#ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3")
    //     .attr("disabled", "disabled");
    // }
    // if (event.target.id === "ch1-star2" ||
    //     event.target.id === "ch2-star2" ||
    //     event.target.id === "ch3-star2" ||
    //     event.target.id === "ch4-star2" ||
    //     event.target.id === "ch5-star2") {
    //     $(".class2").addClass("taken");
    //     $("#ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2")
    //     .attr("disabled", "disabled");
    // }
    // if (event.target.id === "ch1-star1" ||
    //     event.target.id === "ch2-star1" ||
    //     event.target.id === "ch3-star1" ||
    //     event.target.id === "ch4-star1" ||
    //     event.target.id === "ch5-star1") {
    //     $(".class1").addClass("taken");
    //     $("#ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
    //     .attr("disabled", "disabled");
    // }


    console.log("choice clicked", document.getElementsByClassName("choice_rank"))
    
    $(".choice_rank").click(function(event) {
      starNumber = event.target.id;
      starDig = starNumber.slice(8);
      choiceNumber = starNumber.slice(2, 3);
      for (let i = 1; i <= numChoices.length; i++) {
        $(`.class${starDig}`).addClass("taken");
        $(`#ch${i}-star${starDig}`).attr("disabled", "disabled");
      }
      if (event.target.value) {
        $(`.block${choiceNumber}`).css("pointer-events" , "none");
      }
    });
   
   $("#reset-btn").click(function(event) {
     console.log('Reset Button: ', numChoices.length)
    for (let i = 1; i <= numChoices.length; i++) {
      $(`.class${i}`).removeClass("taken");
      $(`.block${i}`).css("pointer-events" , "auto");
      $(`.block${i}`).attr("value" , "");
      $( ".rating input" ).prop( "checked", false );
      for (let j = 1; j <= numChoices.length; j++){
        $(`#ch${i}-star${j}`).removeAttr("disabled");
      }
    }
  });


// Old version:
  // $("#reset-btn").click(function(event) {
  //   $(".class1, .class2, .class3, .class4, .class5").removeClass("taken");
  //   $(".block1, .block2, .block3, .block4, .block5").css("pointer-events" , "auto");
  //   $(".block1, .block2, .block3, .block4, .block5").attr("value" , "");
  //   // $(".rating input").attr("checked" , "false");
  //   $( ".rating input" ).prop( "checked", false );
  //   // $(".rating input").removeAttr("checked");
  //   $("#ch1-star5, #ch2-star5, #ch3-star5, #ch4-star5, #ch5-star5, #ch1-star4, #ch2-star4, #ch3-star4, #ch4-star4, #ch5-star4, #ch1-star3, #ch2-star3, #ch3-star3, #ch4-star3, #ch5-star3, #ch1-star2, #ch2-star2, #ch3-star2, #ch4-star2, #ch5-star2, #ch1-star1, #ch2-star1, #ch3-star1, #ch4-star1, #ch5-star1")
  //   .removeAttr("disabled");
  // });

// --------------------

  $("#rem5").click(function() {
    $(".newchoice5").slideUp("slow");
    $("#rem4").css('visibility', 'visible');
    addChoice -= 1;
    $("#addchoice").removeAttr("disabled");
  });

  $("#formData").on("submit", function(event) {
      event.preventDefault();
      const numBlocks = document.getElementsByClassName("choice_rank")  
      let allRatingsCompleted = false;
      for (let j = 0; j <= numBlocks.length; j++) {
        for (let i = 0; i <= numBlocks.length; i++) {
            $(`#ch${i}-star${j}`).removeAttr("disabled");
        } 
      }
      serialized = $('#formData').serializeArray();
      let voteValue= {};
      // let voteDuplicate = false;
      const shortUrl = location.pathname.split('/vl/');
      const remove = shortUrl.shift();
      const voterNameText = voteValue[serialized[0].voter-name];
      
      if (voterNameText === ""){
        console.log('vote clear triggered - Blank Name');
        $(".alert, .alert-danger").slideDown("slow");
      };
      console.log('formData: ',shortUrl, serialized)
      
      for(let x = 0; x <= numBlocks.length; x++){
        if (document.getElementsByClassName("block1").style['pointer-events']="auto") {
          return "there is incomplete field"
        } 
      }
      
      
       
      console.log('TEST TO SEE DATA: ', serialized)
      
      // $.ajax(
      //   '/render/voteSubmission',
      //   {method: 'POST',
      //   data: { serialized,
      //   shortUrl,
      //   }
      // })
  })
});

