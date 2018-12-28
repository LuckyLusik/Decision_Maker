$(document).ready(function() {
  var addChoice = 3;
  var prevChoice = 2;
  let numChoices = document.getElementsByClassName("choice_rank");
  let starNumber = "";
  let starDig = "";
  let choiceNumber = "";

  //---------------------------------------------------------------------
  // for landing page 

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

  $("#addchoice").click(function(event) {
    $(`.newchoice${prevChoice}`).after(addNewChoice(addChoice));
    $(`.newchoice${addChoice}`).slideDown("slow");
    $(`#rem${prevChoice}`).css('visibility', 'hidden');
    addChoice += 1;
    prevChoice = addChoice - 1;
  });
  
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
    // on submit  it auto shows as red. Need code to check blank fields to show red only.
    $("#poll-info").submit(function(event) {
      let serialized = $('#poll-info').serializeArray();
      console.log(serialized)
      // let voteDuplicate = false;
      const shortUrl = location.pathname.split('/vl/');
      const remove = shortUrl.shift();
      event.preventDefault();
      let errorOnPage = false;
      if (document.getElementById("name-adm").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter your name!</p>`);
        $("#name-adm").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("email-admin").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an email!</p>`);
        $("#email-admin").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("end-date").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an end date!</p>`);
        $("#end-date").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("end-time").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter an end time!</p>`);
        $("end-time").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("poll-title").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a poll title!</p>`);
        $("#poll-title").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("choice1").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a title for choice one!</p>`);
        $("#choice1").addClass("redd");
        errorOnPage = true; 
      }
      if (document.getElementById("choice2").value === "") {
        $("#alert-adm").append(`<p class="rank-ch">Please, enter a title for choice two!</p>`);
        $("#choice2").addClass("redd");
        errorOnPage = true; 
      }
      if (errorOnPage) {
        $(".alert, .alert-danger").slideDown("slow");
        errorOnPage = false;
      } else {
        $.ajax(
          '/',
          {method: 'POST',
          data : serialized,
        })
      }

    });

    $("#poll-info").on("click", function() {
      $(".alert, .alert-danger").slideUp("slow", function(){
        $(".rank-ch").remove();
      });
      $("input").removeClass("redd");
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

//--------------------------------------------------------------------------------------
  // for voting page only
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
      let checkedChoice = false;
      // let voteDuplicate = false;
      const shortUrl = location.pathname.split('/vl/');
      const remove = shortUrl.shift();
      const voterNameText = voteValue[serialized[0].voter-name];
      
      if (document.getElementById("voter-name").value === "") {
        $("#check-rank-form").append(`<p class="rank-ch">Please, enter your name!</p>`);
        $("input").addClass("redd");
      }
      for (let z = 1; z <= numChoices.length; z++) {
        for (let x = 1; x <= numChoices.length; x++) {
          if ($(`#ch${z}-star${x}`).prop("checked")) {
            checkedChoice = true;
          }
        }
        if (checkedChoice === false) {
          $("#check-rank-form").append(`<p class="rank-ch">Please, rank Choice #${z}!</p>`);
          $(".alert, .alert-danger").slideDown("slow");
        }
        checkedChoice = false;
      }
      
      $.ajax(
        '/render/voteSubmission',
        {method: 'POST',
        data: { serialized,
        shortUrl,
        }
      })
  });

  $("#formData").on("click", function() {
    $(".alert, .alert-danger").slideUp("slow", function(){
      $(".rank-ch").remove();
    });
    $("input").removeClass("redd");
  });
       

});
