//function to Render title and description and end buttons. Tool will utilize 

function renderVotingPage(dataObject){
    voteTitleDescription(creatorName, pollTitle, pollDescription, expiration);
    votingElement(choiceNum, choiceTitle, choiceDesciption)
    ratingElement(choiceNum)
}

function voteTitleDescription(creatorName, pollTitle, pollDescription, expiration){

};

//function Render voting options

function votingElement(voteNum){

}

function ratingElement(aNum){
    const ratingString = "";
    const voteNum = Number(aNum);
    for (let i = voteNum.length+1; i < 1; i--){
        ratingString +=`<input type="radio" id="ch1-star${i}" name="ch1-rating" value="${i}" /><label class = "full" for="ch1-star${i}" title="${i} stars"></label>`
    }
    console.log(ratingString);
    return ratingString;
}

<div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank one">
            <h4>Choice 1:</h4>
            <fieldset class="rating stars">
              <input type="radio" id="ch1-star5" name="ch1-rating" value="5" /><label class = "full" for="ch1-star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="ch1-star4" name="ch1-rating" value="4" /><label class = "full" for="ch1-star4" title="Pretty good - 4 stars"></label>
              <input type="radio" id="ch1-star3" name="ch1-rating" value="3" /><label class = "full" for="ch1-star3" title="Meh - 3 stars"></label>
              <input type="radio" id="ch1-star2" name="ch1-rating" value="2" /><label class = "full" for="ch1-star2" title="Kinda bad - 2 stars"></label>
              <input type="radio" id="ch1-star1" name="ch1-rating" value="1" /><label class = "full" for="ch1-star1" title="No way! - 1 star"></label>
            </fieldset>
            </div>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <hr>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank two">
            <h4>Choice 2:</h4>
            <fieldset class="rating stars">
              <input type="radio" id="ch2-star5" name="ch2-rating" value="5" /><label class = "full" for="ch2-star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="ch2-star4" name="ch2-rating" value="4" /><label class = "full" for="ch2-star4" title="Pretty good - 4 stars"></label>
              <input type="radio" id="ch2-star3" name="ch2-rating" value="3" /><label class = "full" for="ch2-star3" title="Meh - 3 stars"></label>
              <input type="radio" id="ch2-star2" name="ch2-rating" value="2" /><label class = "full" for="ch2-star2" title="Kinda bad - 2 stars"></label>
              <input type="radio" id="ch2-star1" name="ch2-rating" value="1" /><label class = "full" for="ch2-star1" title="No way! - 1 star"></label>
            </fieldset>
            </div>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <hr>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank">
            <h4>Choice 3:</h4>
            <fieldset class="rating stars three">
              <input type="radio" id="ch3-star5" name="ch3-rating" value="5" /><label class = "full" for="ch3-star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="ch3-star4" name="ch3-rating" value="4" /><label class = "full" for="ch3-star4" title="Pretty good - 4 stars"></label>
              <input type="radio" id="ch3-star3" name="ch3-rating" value="3" /><label class = "full" for="ch3-star3" title="Meh - 3 stars"></label>
              <input type="radio" id="ch3-star2" name="ch3-rating" value="2" /><label class = "full" for="ch3-star2" title="Kinda bad - 2 stars"></label>
              <input type="radio" id="ch3-star1" name="ch3-rating" value="1" /><label class = "full" for="ch3-star1" title="No way! - 1 star"></label>
            </fieldset>
            </div>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <hr>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank four">
            <h4>Choice 4:</h4>
            <fieldset class="rating stars">
              <input type="radio" id="ch4-star5" name="ch4-rating" value="5" /><label class = "full" for="ch4-star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="ch4-star4" name="ch4-rating" value="4" /><label class = "full" for="ch4-star4" title="Pretty good - 4 stars"></label>
              <input type="radio" id="ch4-star3" name="ch4-rating" value="3" /><label class = "full" for="ch4-star3" title="Meh - 3 stars"></label>
              <input type="radio" id="ch4-star2" name="ch4-rating" value="2" /><label class = "full" for="ch4-star2" title="Kinda bad - 2 stars"></label>
              <input type="radio" id="ch4-star1" name="ch4-rating" value="1" /><label class = "full" for="ch4-star1" title="No way! - 1 star"></label>
            </fieldset>
            </div>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <hr>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-12">
            <div class="choice_rank five">
            <h4>Choice 5:</h4>
            <fieldset class="rating stars">
              <input type="radio" id="ch5-star5" name="ch5-rating" value="5" /><label class = "full" for="ch5-star5" title="Awesome - 5 stars"></label>
              <input type="radio" id="ch5-star4" name="ch5-rating" value="4" /><label class = "full" for="ch5-star4" title="Pretty good - 4 stars"></label>
              <input type="radio" id="ch5-star3" name="ch5-rating" value="3" /><label class = "full" for="ch5-star3" title="Meh - 3 stars"></label>
              <input type="radio" id="ch5-star2" name="ch5-rating" value="2" /><label class = "full" for="ch5-star2" title="Kinda bad - 2 stars"></label>
              <input type="radio" id="ch5-star1" name="ch5-rating" value="1" /><label class = "full" for="ch5-star1" title="No way! - 1 star"></label>
            </fieldset>
            </div>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <hr>
          </div>
        </div>

$(document).ready(function() {
    $.ajax(
        '/render',
        {method: 'GET'}
    ).then(renderVotingPage)





}