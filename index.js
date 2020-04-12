$("#searchbtn").on("click", function (event) {
    event.preventDefault();
    currentweatherajax();
    $(".citydisplay").empty();
});

function currentweatherajax() {
    // calling the current forecast api on api.openweathermap.org
    const cityName = $("#searchinput").val();
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&&APPID=f4c95ff5da6ac45aff62770ee6dbda0c'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // making the citydisplay div which will contain the current weather, as well as the future 5 day forecast
        const jumbotron = $("<div class='card' id='citydisplayjumbotron'></div>");
        const currentdisplay = $("<div class='currentdisplay'></div>");
        const card1 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
        const cardbody1 = $("<div class='card-body'></div>");
        const nameDateIcon = $("<h4 style='color: white;'>" + response.name + ", " + response.sys.country + " - " + "(" + new Date((response.dt) * 1000).toLocaleDateString("en-US") + ")" + "<img class='forecasticon' src=" + "'" + 'http://openweathermap.org/img/wn/' + response.weather[0].icon + ".png" + "'" + ">" + "</h4>");
        const temp1 = $("<h5 style='color: white;'>" + "Temperature: " + response.main.temp + "°F" + "</h5>");
        const humidity1 = $("<h5 style='color: white;'>" + "Humidity: " + response.main.humidity + "%" + "</h5>");
        const windspeed1 = $("<h5 style='color: white;'>" + "Windspeed: " + response.wind.speed + " MPH" + "</h5>");
        const today = $("<h2 class='my-3' style='color: white;'>Today's Forecast:</h2>");
        cardbody1.append(nameDateIcon, temp1, humidity1, windspeed1);
        card1.append(cardbody1);
        currentdisplay.append(today, card1)
        jumbotron.append(currentdisplay);
        $(".citydisplay").append(jumbotron);
        // now calling the uv index api via "UVindex"
        const UVindex = 'https://api.openweathermap.org/data/2.5/uvi?appid=f4c95ff5da6ac45aff62770ee6dbda0c&lat=' + response.coord.lat + '&lon=' + response.coord.lon + '';
        $.ajax({
            url: UVindex,
            method: "GET"
        }).then(function (response) {
            const uv = $("<h5 style='color: white;'>" + "UV Index: " + "<p id='uvcolor'></p>" + "</h5>");
            cardbody1.append(uv);
            card1.append(cardbody1);
            // now using logic to basically say if uvi is under 5, make text green. if between 5-10, make text yellow. And also anything over 10, make text red.
            if (response.value <= 5) {
                const uvcolorEl = document.getElementById("uvcolor");
                uvcolorEl.setAttribute("style", "color: green;");
                const favorable = response.value + " (Favorable)";
                $("#uvcolor").append(favorable);
            } else if (response.value <= 10 && response.value > 5) {
                const uvcolorEl = document.getElementById("uvcolor");
                uvcolorEl.setAttribute("style", "color: yellow;");
                const moderate = response.value + " (Moderate)";
                $("#uvcolor").append(moderate);
            } else if (response.value > 10) {
                const uvcolorEl = document.getElementById("uvcolor");
                uvcolorEl.setAttribute("style", "color: red;");
                const severe = response.value + " (Severe)";
                $("#uvcolor").append(severe);
            }
        })
        // now calling the 5 day forecast api
        const cityName = $("#searchinput").val();
        const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&&APPID=f4c95ff5da6ac45aff62770ee6dbda0c'
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            const futuredisplay = $("<div class='futuredisplay my-2'></div>");
            // card number 1
            const card1 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
            const cardbody1 = $("<div class='card-body'></div>");
            const date1 = $("<p style='color: white;'>" + new Date((response.list[8].dt) * 1000).toLocaleDateString("en-US") + "</p>");
            const icon1 = $("<img class=" + "'" + "forecasticon" + "'" + " src=" + "'" + "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + ".png" + "'" + ">");
            const temp1 = $("<p style='color: white;'>" + "Temperature: " + response.list[8].main.temp + "°F" + "</p>");
            const humidity1 = $("<p style='color: white;'>" + "Humidity: " + response.list[8].main.humidity + "%" + "</p>");
            // card number 2
            const card2 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
            const cardbody2 = $("<div class='card-body'></div>");
            const date2 = $("<p style='color: white;'>" + new Date((response.list[16].dt) * 1000).toLocaleDateString("en-US") + "</p>");
            const icon2 = $("<img class=" + "'" + "forecasticon" + "'" + " src=" + "'" + "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + ".png" + "'" + ">");
            const temp2 = $("<p style='color: white;'>" + "Temperature: " + response.list[16].main.temp + "°F" + "</p>");
            const humidity2 = $("<p style='color: white;'>" + "Humidity: " + response.list[16].main.humidity + "%" + "</p>");
            // card number 3
            const card3 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
            const cardbody3 = $("<div class='card-body'></div>");
            const date3 = $("<p style='color: white;'>" + new Date((response.list[24].dt) * 1000).toLocaleDateString("en-US") + "</p>");
            const icon3 = $("<img class=" + "'" + "forecasticon" + "'" + " src=" + "'" + "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + ".png" + "'" + ">");
            const temp3 = $("<p style='color: white;'>" + "Temperature: " + response.list[24].main.temp + "°F" + "</p>");
            const humidity3 = $("<p style='color: white;'>" + "Humidity: " + response.list[24].main.humidity + "%" + "</p>");
            // card number 4
            const card4 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
            const cardbody4 = $("<div class='card-body'></div>");
            const date4 = $("<p style='color: white;'>" + new Date((response.list[32].dt) * 1000).toLocaleDateString("en-US") + "</p>");
            const icon4 = $("<img class=" + "'" + "forecasticon" + "'" + " src=" + "'" + "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + ".png" + "'" + ">");
            const temp4 = $("<p style='color: white;'>" + "Temperature: " + response.list[32].main.temp + "°F" + "</p>");
            const humidity4 = $("<p style='color: white;'>" + "Humidity: " + response.list[32].main.humidity + "%" + "</p>");
            // card number 5
            const card5 = $("<div class='card my-3 mx-2' id='futurecard'></div>");
            const cardbody5 = $("<div class='card-body'></div>");
            const date5 = $("<p style='color: white;'>" + new Date((response.list[39].dt) * 1000).toLocaleDateString("en-US") + "</p>");
            const icon5 = $("<img class=" + "'" + "forecasticon" + "'" + " src=" + "'" + "http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png" + "'" + ">");
            const temp5 = $("<p style='color: white;'>" + "Temperature: " + response.list[39].main.temp + "°F" + "</p>");
            const humidity5 = $("<p style='color: white;'>" + "Humidity: " + response.list[39].main.humidity + "%" + "</p>");
            // appending all the cards to the futuredisplay. Theres alot of repeating syntax bc a for loop wouldnt be practical.. due to the fact i only want 5 days (5 arrays), and this api return about 40. so its easier to just hardcode 5 cards w/o a forloop.
            const fiveday = $("<h2 style='color: white;'>5 Day Forecast:</h2>");
            cardbody1.append(date1, icon1, temp1, humidity1);
            cardbody2.append(date2, icon2, temp2, humidity2);
            cardbody3.append(date3, icon3, temp3, humidity3);
            cardbody4.append(date4, icon4, temp4, humidity4);
            cardbody5.append(date5, icon5, temp5, humidity5);
            card1.append(cardbody1);
            card2.append(cardbody2);
            card3.append(cardbody3);
            card4.append(cardbody4);
            card5.append(cardbody5);
            futuredisplay.append(fiveday, card1, card2, card3, card4, card5);
            jumbotron.append(futuredisplay);
        })
    })
}

