/*
 * AIRpollution 空氣汙染外掛 
 * 張睿玹版權所有
 * https://github.com/dwcoop/AIRpollution/license.html
 * 版本: V1.0.1-TW
 * 日期: 2019-06-08T15:27Z
 */
//prevent undefined functions
$.getScript("https://polyfill.io/v3/polyfill.min.js?features=es5,es6,es7&flags=gated")

//vitural DOM element
var elem = $("<select></select>").attr("id", "AIRpollution_Select");

//predefined data Array and Object
window.AIRpollution_Data = []

function AIRpollution_SetData(obj) {
  var data = obj,
    value = $("#AIRpollution_Select").val().split(","),
    cityData = {};

  for (var i = 0; i < data.length; i++) {
    var childData = data[i]
    if (childData.SiteName == value[0] && childData.County == value[1]) {
      cityData = childData;
      break;
    }
  }
  console.log("[AIRpollution]select data:" + JSON.stringify(cityData))
  $("#AIRpollution_Output").html("")

  {
    Object.keys(cityData).map(function (key, index) {
      //forEach data
      var value = cityData[key];
      $("#AIRpollution_Output").append(
        $("<li></li>")
        .html(AIRpollution_ToLocalLanguage(key) + ": " + value)
        .attr("id", "opt_" + key)
        .addClass("opt_" + key)
      )
    });
  }
}

function AIRpollution_ToLocalLanguage(text) {
  if (text in window.AIRpollution_localStringData) {
    return window.AIRpollution_localStringData[text]
  } else {
    return text + "(not translated)";
  }
}

$(function () {
  $("#AIRpollution_Container").append(elem)
  $("#AIRpollution_Select").change(function () {
    AIRpollution_SetData(window.AIRpollution_Data)
  })
  $.getScript("https://cdn.jsdelivr.net/gh/dwcoop/AIRpollution/language/localString-zh-TW.js", function () {
    console.log("[AIRpollution] got language data!")
  })
  $.ajax({
    type: "get",
    async: false,
    url: "https://cdn.jsdelivr.net/gh/dwcoop/AIRpollution/AIRpollution-data_zh-TW.js",
    dataType: "jsonp",
    jsonpCallback: 'AIRpollution_serverCallback',
    success: function (data) {
      window.AIRpollution_Data = data
      console.log("[AIRpollution] got data!");
      $.each(data, function (i, eachData) {
        //forEach cities and add to vitural DOM element
        var Site_name = eachData["SiteName"];
        var County = eachData["County"];
        elem.append(
          $("<option></option>")
          .html(County + " " + Site_name)
          .val(String([Site_name, County]))
        )
      });
    }
  });

});
