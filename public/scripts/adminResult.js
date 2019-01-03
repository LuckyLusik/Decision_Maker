
// Pie chart functions
//----------------------------------------------------
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

// html rendering functions below
//------------------------------------------

    function sortChoicesResult(choicesTotals){
        const sorted = [];
        for (let choice in choicesTotals){
            sorted.push([choice, choicesTotals[choice]])
        }
        sorted.sort(function(a,b){
            return b[1] - a[1];
        })
        return sorted;
    }
    function matchTitle(title,choicesResultArray){
        for (let each of choicesResultArray){
            if (title === each[0]){
                return each[1];
            }
        };
    }

    function renderResultsPage(dataObject){
        const pollData = dataObject[0];
        const choiceData = dataObject[1];
        const pollCreatorData = dataObject[2];
        //const rankData = dataObject.rankData;
        const choicesTotals = dataObject[3];
        const voterNameData = dataObject[4]; 
        let choicesResultArray = sortChoicesResult(choicesTotals); // Array in array. Largest value will be in position 0, [[key0, value0],[key1,value1], ... ]
        renderString = "";
        console.log("Inside renderResultPage: ", dataObject, choicesResultArray);
        let winnersString = winners(choicesResultArray);
        resultsTitleDescriptionTime(pollCreatorData, pollData, choiceData, winnersString);
        resultsPieChart(choiceData, choicesResultArray);
        choiceUserName(voterNameData);
        $(".main_descrip").append(renderString) //
        createPie(".pieID.legend", ".pieID.pie");
    }

    function winners(choicesResultArray){
      let winnerString = "";
      let winnerValue = 0;
      for (let each in choicesResultArray){
        console.log("Winner Each: ", choicesResultArray[each])
        if (choicesResultArray[each][1] >= winnerValue) {
          winnerString += `${choicesResultArray[each][0]}, `;
          winnerValue = choicesResultArray[each][1];
          console.log("Winners Function: ", winnerValue, winnerString)
        }
      }
      console.log("winner string: ", winnerString)
      return winnerString.slice(0,-2);
    }

    function resultsTitleDescriptionTime(pollCreator, poll, choice, winner){
        console.log(pollCreator, poll, choice);
        return renderString =
        `<p>Welcome to ${pollCreator[0].name}'s Poll Page!</p>
        </section>
        <section class="vote-descr">
            <h3>${poll[0].title}</h3>
            <p>${poll[0].description}</p>
        </section>
        <section class="expire">
            <h3>Expiration: ${moment(poll[0].end_date).add(5,'hours').fromNow()}</h3>
        </section>
        <section class="piechart">
        <div class="pie-graph">
        <div>
        <div class="pieID pie">

        </div>
        </div>
        <div class="leader">
        <h2>Leader: </h2>
        <h2>${winner}</h2>
        </div>
        </div>
        <ul class="pieID legend">
        `
    };

    function choiceUserName (voterNameData){
      console.log("inside Choice user Name", voterNameData)
      let eachVoterLoop = 
      `<section class="choice-user-name">
      <table>
        <caption>Voter Summary</caption>
        <thead>
          <tr>
           
          </tr>
        </thead>
        <tbody>`;
      for (let eachName of voterNameData){
        eachVoterLoop +=
        `<tr>
        <td data-label="Voter's Name">${eachName.name}</td>
        </tr>`
      };
      eachVoterLoop += 
      `  </tbody>
        </table>
      </section>`

      return renderString += eachVoterLoop
    }

    function resultsPieChart(choicesData, choicesResultArray) {
        console.log("results PieChart: ", choicesResultArray)
        let loopString = 
        `<li>
        <em>${choicesData[0].title}: ${choicesData[0].description}</em>
        <span id="ch1-pie">${matchTitle(choicesData[0].title, choicesResultArray)}</span>
        </li>`;

        for (let i = 1; i < choicesData.length; i++) {
            console.log('each: ', choicesData[i].title)
            loopString += 
            `<li>
            <em>${choicesData[i].title}: ${choicesData[i].description}</em>
            <span>${matchTitle(choicesData[i].title, choicesResultArray)}</span>
            </li>`
        }
        loopString += `</ul> </section>`
        return renderString += loopString;
    }


$(document).ready(function() {
    console.log("Results.js has loaded")
    let identifyKey = {};
    let renderString= "";
    const shortUrl = location.pathname.split('/pa/');
    const remove = shortUrl.shift();
    identifyKey.shortUrl = shortUrl; 
    console.log('identifyKey.shortUrl: ', identifyKey.shortUrl)
    $.ajax(
        '/render/adminResult',
        {method: 'POST',
        data : identifyKey,
    }).then((result)=>(renderResultsPage(result)))
})
