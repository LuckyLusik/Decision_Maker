function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}
  
function addSlice(sliceSize, pieElement, offset, sliceID, color) { 
    $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("."+sliceID).css({
      "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
    });
    $("."+sliceID+" span").css({
      "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
      "background-color": color
    });
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s"+dataCount+"-"+sliceCount;
    var maxSize = 179;
    if(sliceSize<=maxSize) {
      addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(maxSize, pieElement, offset, sliceID, color);
      iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
}
  
function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var color = [
      "#97CAEF",
      "#55BCB9",
      "#3FEEE6",
      "gray",
      "#FC4445",
      "turquoise",
      "crimson",
      "purple",
      "forestgreen",
      "navy"
    ];
    for(var i=0; i<listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(size, pieElement, offset, i, 0, color[i]);
      $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
      offset += size;
    }
}
    createPie(".pieID.legend", ".pieID.pie");
//note the execution above. Is tied to the html?  

  let dataElement = function (results) {
    let sortable = [];
    for (let max in result) {
      sortable.push([max, result[max]]);
    }
    sortable.sort(function(a, b) {
      let orderedList = b[1] - a[1];
      console.log(orderedList)
    })
    let choiceValues = Object.value(orderedList);
    console.log(choiceValues)
    return choiceValues
  }
  
  let pieElement = function (results) {
    let sortable = [];
    for (let max in result) {
      sortable.push([max, result[max]]);
    }
    sortable.sort(function(a, b) {
      let orderedList = b[1] - a[1];
      console.log(orderedList)
    })
    let choiceKeys = Object.key(orderedList);
    console.log(choiceKeys)
    return choiceKeys
  }
    

    function renderResultsPage(dataObject){
        const pollData = dataObject.pollData;
        const choiceData = dataObject.choiceData;
        const pollCreatorData = dataObject.pollCreatorData;
        //const rankData = dataObject.rankData;
        const choicesTotals = dataObject.choicesTotals;
        console.log("Inside renderResultPage: ", dataObject)
        $("#voteInsert").append(resultsTitleDescriptionTime(pollCreatorData, pollData, choiceData)) //
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

    function resultsPieChart(choice, rank, pollVoter) {
    console.log(choice, rank, pollVoter)
    return renderString +=
    `<section class="piechart">
        <div class="pie-graph">
        <div>
        <div class="pieID pie" ${findObjectValues(results)}>

        </div>
        </div>
        <div class="leader">
        <h2>Leader: </h2>
        <h2>Choice ##</h2>
        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</h5>
        </div>
        </div>
        <section class="expire">
            <h3>Expire in ## / Ended at ##</h3>
        </section>
        <ul class="pieID legend" ${findObjectKeys(results)}>
        <li>
            <em>Choice 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
            <span id="ch1-pie">718</span>
        </li>
        <li>
            <em>Choice 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
            <span id ="ch2-pie">531</span>
        </li>
        <li>
            <em>Choice 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
            <span id="ch3-pie">868</span>
        </li>
        <li>
            <em>Choice 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
            <span id="ch4-pie">344</span>
        </li>
        <li>
            <em>Choice 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</em>
            <span id="ch5-pie">1145</span>
        </li>
        </ul>
    </section>`
    }


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
    let renderString= "";
    const shortUrl = location.pathname.split('/vr/');
    const remove = shortUrl.shift();
    identifyKey.shortUrl = shortUrl; 
    console.log('identifyKey.shortUrl: ', identifyKey.shortUrl)
    $.ajax(
        '/render/voteResult',
        {method: 'POST',
        data : identifyKey,
    }).then(renderResultsPage)
})
