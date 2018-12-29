

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

    function renderResultsPage(dataObject){
        const pollData = dataObject.pollData;
        const choiceData = dataObject.choiceData;
        const pollCreatorData = dataObject.pollCreatorData;
        //const rankData = dataObject.rankData;
        const choicesTotals = dataObject.choicesTotals;
        const pollVoter = dataObject.pollVoter;
        $("#resultsInsert").prepend(resultsTitleDescriptionTime(pollCreatorData, pollData, choiceData, choicesTotals, pollVoter)) //
    }



    function resultsTitleDescriptionTime(pollCreator, poll){
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
        </section>`
    };

    // function resultsPieChart(choice, rank, pollVoter) {
    // console.log(choice, rank, pollVoter)
    // return renderString =
    // `<section class="piechart">
    //     <div class="pie-graph">
    //     <div>
    //     <div class="pieID pie" `${findObjectValues(results)}`>

    //     </div>
    //     </div>
    //     <div class="leader">
    //     <h2>Leader: </h2>
    //     <h2>Choice ##</h2>
    //     <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</h5>
    //     </div>
    //     </div>
    //     <section class="expire">
    //         <h3>Expire in ## / Ended at ##</h3>
    //     </section>
    //     <ul class="pieID legend" `${findObjectKeys(results)}`>
    //     <li>
    //         <em>Choice 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
    //         <span id="ch1-pie">718</span>
    //     </li>
    //     <li>
    //         <em>Choice 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
    //         <span id ="ch2-pie">531</span>
    //     </li>
    //     <li>
    //         <em>Choice 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
    //         <span id="ch3-pie">868</span>
    //     </li>
    //     <li>
    //         <em>Choice 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
    //         <span id="ch4-pie">344</span>
    //     </li>
    //     <li>
    //         <em>Choice 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
    //         <span id="ch5-pie">1145</span>
    //     </li>
    //     </ul>
    // </section>`
    // }


        //".pieID.legend" is DataElement in piechart.js
        //this function needs organizeVoteData(choiceData) from pollAdmin to work
        // to separate values from greatest to least into an array
    // function findObjectValues(results) {
    // let sortable = [];
    // for (let max in result) {
    //     sortable.push([max, result[max]]);
    // }
    // sortable.sort(function(a, b) {
    //     let orderedList = b[1] - a[1];
    //     console.log(orderedList)
    // })
    // let choiceValues = Object.value(orderedList);
    // console.log(choiceValues)
    // return choiceValues
    // }

    // //".pieID.pie" is pieElement in piechart.js
    // //this function needs organizeVoteData(choiceData) from pollAdmin to work
    // //to separate keys from greatest to least into an array
    // function findObjectKeys(results) {
    // let sortable = [];
    // for (let max in result) {
    //     sortable.push([max, result[max]]);
    // }
    // sortable.sort(function(a, b) {
    //     let orderedList = b[1] - a[1];
    //     console.log(orderedList)
    // })
    // let choiceKeys = Object.key(orderedList);
    // console.log(choiceKeys)
    // return choiceKeys
    // }


    // //use this function to input titles and descriptions into results pie chart
    // function choiceTitleDescriptions (titles, descriptions) {
    // //loop through titles and show them
    // //loop through descriptions and show them
    // }
    // choiceTitleDescriptions(findObjectValues(results))


    // //use this function to input rank totals for each choice
    // function choiceRankTotals (rankTotals) {
    // //loop through totals and display them
    // }
    
    // choiceRankTotals(findObjectKeys(results));


$(document).ready(function() {
    console.log("Results.js has loaded")
    let identifyKey = {};
    const shortUrl = location.pathname.split('/vr/');
    const remove = shortUrl.shift();
    identifyKey.shortUrl = shortUrl; 
    console.log('identifyKey.shortUrl: ', identifyKey.shortUrl)
    $.ajax(
        '/render/voteResultRender',
        {method: 'POST',
        data : identifyKey,
    }).then(validateExpiration)
})
