//function to Render title and description and end buttons. Tool will utilize 

function validateExpiration(dataObject){
    const pollData = dataObject.pollData
    const pollEndTime = moment(pollData[0].end_date).add(5,'hours');
    const currentTime = new Date()

    if ( moment(pollEndTime).isBefore(currentTime)) {
        console.log('what time is pollEndTime: ', pollEndTime, currentTime)
    } else {
        console.log('No issue with poll time ending')
        renderVotingPage(dataObject)
    }
}

function renderVotingPage(dataObject){
    const pollData = dataObject.pollData;
    const choiceData = dataObject.choiceData;
    const pollCreatorData = dataObject.pollCreatorData;
    $("#voteInsert").prepend(voteTitleDescription(pollCreatorData, pollData, choiceData))
}

function voteTitleDescription(pollCreator, poll, choice){
    console.log(pollCreator, poll, choice);
    return renderString =
    `<section class="main_descrip">
        <p>Welcome to ${pollCreator[0].name}'s Poll Page!</p>
    </section>
    <section class="vote-descr">
        <h3>${poll[0].title}</h3>
        <p>${poll[0].description}</p>
    </section>
    <section class="expire">
        <h3>Expiration: ${moment(poll[0].end_date).add(5,'hours').fromNow()}</h3>
    </section>
    <form class="form-horizontal formSub" id="formData" name="formData" action="/">
        <div class="form-group">
        <label class="control-label col-sm-2" for="voter-name">Name:</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="voter-name" name="voter-name" placeholder="Enter your name">
        </div>
        </div>
        <hr>
        ${votingElement(choice)}
        <div class="form-group row">
        <div class="col-md-12">
            <div class="add-choice centr">
            <button type="button" class="btn btn-default" id="reset-btn">Reset all choices</button>
            </div>
        </div>
        </div>
        <hr>
        <div class="alert alert-danger">
        <strong>Attention!</strong> This alert box could indicate a dangerous or potentially negative action.
        </div>
        <div class="form-group row">
        <div class="col-md-12">
            <div class="but-div">
            <button type="submit" class="btn btn-default" id="vote-btn" name="formSubmit">Submit</button>
            </div>
        </div>
        </div>
        </div>
    </form>
    </section>
    <script type="text/javascript" src="/scripts/app.js"></script>
    `
};

//function Render voting options

function votingElement(choice){
    const voteNum = Number(choice.length);
    let votingString = "";
    
    for (let j = 0; j < voteNum; j++) {
        let ratingString = "";

        for (let i = voteNum; i > 0; i--) {
            ratingString +=`<input type="radio" id="ch${j+1}-star${i}" name="ch${j+1}-rating" value="${i}" /><label class = "full class${i}" for="ch${j+1}-star${i}" title="${i} stars"></label>`
        }
        
        votingString +=
        `<div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank block${j+1}">
            <h4>Choice ${j+1}:</h4>
            <fieldset class="rating stars">
            ${ratingString}
            </fieldset>
            </div>
            <h5>
              ${choice[j].title}
            </h5>
            <p>
              ${choice[j].description}
            </p>
            <hr>
          </div>
        </div>
        `
    }
    return votingString;
}

// OLD
//function ratingElement(aNum){
//     let ratingString = "";
//     const voteNum = aNum;
//     console.log(voteNum)

        

//     console.log(ratingString, voteNum);
//     return ratingString;
// }


$(document).ready(function() {
    let identifyKey = {};
    const shortUrl = location.pathname.split('/vl/');
    const remove = shortUrl.shift();
    identifyKey.shortUrl = shortUrl; 
    console.log(identifyKey.shortUrl);
    $.ajax(
        '/render/voteRender',
        {method: 'POST',
        data : identifyKey,
    }).then(validateExpiration)
});