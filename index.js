$("#citysearchnow").on("click", function(event){
    event.preventDefault();
    $(".citydisplayed").empty();
    const cityName = $("#inputcity").val();
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&&APPID=f4c95ff5da6ac45aff62770ee6dbda0c'
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    const newBody = $("<div>");
    const nameDateIcon = $("<div>")
    const time = new Date((response.dt) * 1000 ).toLocaleDateString("en-US");
    const date = $("<div>").text(response.name +' - '+ time);
    nameDateIcon.append(date);
    newBody.append(nameDateIcon);
    const temp = $("<div>").text('Temperature: ' + response.main.temp + '°F');
    const humid = $("<div>").text('Humidity: ' + response.main.humidity + '%');
    const speed = $("<div>").text('Wind Speed: ' + response.wind.speed + ' MPH');
    newBody.append(temp,humid,speed)
    $(".citydisplayed").append(newBody);
})
});

$("#citysearchnow").on("click", function(event){
    event.preventDefault();
    $(".day1").empty();
    $(".day2").empty();
    $(".day3").empty();
    $(".day4").empty();
    $(".day5").empty();
    const cityName = $("#inputcity").val();
    const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&&APPID=f4c95ff5da6ac45aff62770ee6dbda0c'
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    const newBody = $("<div>")
    const time = new Date((response.list[0].dt) * 1000 ).toLocaleDateString("en-US");
    const date = $("<div>").text(time);
    const temp = $("<div>").text('Temp: ' + response.list[0].main.temp + '°F');
    const humid = $("<div>").text('Humidity: ' + response.list[0].main.humidity + '%');
    newBody.append(date,temp,humid);
    $(".day1").append(newBody);
    const newBody2 = $("<div>")
    const time2 = new Date((response.list[10].dt) * 1000 ).toLocaleDateString("en-US");
    const date2 = $("<div>").text(time2);
    const temp2 = $("<div>").text('Temp: ' + response.list[10].main.temp + '°F');
    const humid2 = $("<div>").text('Humidity: ' + response.list[10].main.humidity + '%');
    newBody2.append(date2,temp2,humid2);
    $(".day2").append(newBody2);
    const newBody3 = $("<div>")
    const time3 = new Date((response.list[20].dt) * 1000 ).toLocaleDateString("en-US");
    const date3 = $("<div>").text(time3);
    const temp3 = $("<div>").text('Temp: ' + response.list[20].main.temp + '°F');
    const humid3 = $("<div>").text('Humidity: ' + response.list[20].main.humidity + '%');
    newBody3.append(date3,temp3,humid3);
    $(".day3").append(newBody3);
    const newBody4 = $("<div>")
    const time4 = new Date((response.list[30].dt) * 1000 ).toLocaleDateString("en-US");
    const date4 = $("<div>").text(time4);
    const temp4 = $("<div>").text('Temp: ' + response.list[30].main.temp + '°F');
    const humid4 = $("<div>").text('Humidity: ' + response.list[30].main.humidity + '%');
    newBody4.append(date4,temp4,humid4);
    $(".day4").append(newBody4);
    const newBody5 = $("<div>")
    const time5 = new Date((response.list[39].dt) * 1000 ).toLocaleDateString("en-US");
    const date5 = $("<div>").text(time5);
    const temp5 = $("<div>").text('Temp: ' + response.list[39].main.temp + '°F');
    const humid5 = $("<div>").text('Humidity: ' + response.list[39].main.humidity + '%');
    newBody5.append(date5,temp5,humid5);
    $(".day5").append(newBody5);
})
});

$("#citysearchnow").on("click", function(event){
    event.preventDefault();
    const name = $("#inputcity").val();
    $(".savedcitysearches").empty();
    const historyArray = [];
    for (let i = 0; i < historyArray.length; i++) {
        const newDiv = $("<div>");
        const newBtn = $("button");
        newBtn.addClass("historybtns");
        newBtn.text(historyArray[i]);
        newBtn.attr("#inputcity", historyArray[i]);
        newDiv.append(newBtn);
        $(".savedcitysearches").append(newDiv);
    }
    historyArray.push(name);
    console.log(historyArray);
});


