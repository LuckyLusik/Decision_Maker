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
  var listData = [n];
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
