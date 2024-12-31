function randomInt(min,max){
    return Math.floor( Math.random() * (max - min + 1)) + min;
}

// Crear Objects weather
function createWeather(minTemperature, maxTemperature, weatherType, windSpeed){
    let weather = {
        minTemperature: minTemperature, // Temperatura mínima
        maxTemperature: maxTemperature, // Temperatura máxima
        weatherType: weatherType,       // Clima
        windSpeed: windSpeed,           // Velocidad del viento
        
        // Método para calcular la temperatura media del día
        averageTemperature:function(){
            return (this.minTemperature + this.maxTemperature) / 2
        },

        toString: function () {
            return "Temperatura mínima: " + this.minTemperature + "°C\n" +
                   "Temperatura máxima: " + this.maxTemperature + "°C\n" +
                   "Clima: " + this.weatherType + "\n" +
                   "Velocidad del viento: " + this.windSpeed + " km/h";
        },

        weatherIcon: function() {
            switch (this.weatherType) {
                case 'soleado':
                    return '☀️';
                case 'lluvia':
                    return '🌧️';
                case 'nublado':
                    return '☁️';
                case 'parcialmente nublado':
                    return '🌤️';
                case 'nieve':
                    return '❄️';
                default:
                    return '❓';
            }
        },
    }
    
    return weather;
}

function createRandomWeather(){
    const weatherTypes = ['soleado','parcialmente nublado','nublado','lluvia','nieve'];
    let minTemperature = randomInt(10, 20)

    return createWeather(
       minTemperature,
       randomInt(minTemperature, 40),
       weatherTypes.at(randomInt(0,weatherTypes.length-1)),
       randomInt(0,100)
    );
}

function createDay(increment, dayIndex, monthDay, month, year) {
    const day = createRandomWeather();

    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();   // Último día del mes

    monthDay += increment;

    if(monthDay > lastDayOfMonth){
        monthDay -= lastDayOfMonth;
        if(++month == 12){
            month = 0;
            year++;
        }
    }

    const weekDay = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    day.weekDay = weekDay[(dayIndex + increment) % 7];
    day.monthDay = monthDay;

    console.log(`Día ${increment} (${day.weekDay} ${monthDay}/${month+1}/${year}): \n${day.toString()}\n-----------------`);

    return day;
}

function renderDay(weather, container) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-info-container");

    dayDiv.innerHTML = `
        <h3>${weather.weekDay} ${weather.monthDay}</h3>
        <div class="icon-container">${weather.weatherIcon()}</div>
        <div class="temp-container">
            <span class="temp-min">${weather.minTemperature}°C</span>
            <span class="temp-max">${weather.maxTemperature}°C</span>
        </div>
        <div class="wind-container">
            <span class="wind-speed">Viento: ${weather.windSpeed} km/h</span>
        </div>
    `;

    container.appendChild(dayDiv);
}

function renderTemperatureSummary(averageMin, averageMax, container) {
    container.innerHTML = `
        <p class="temp-min">Temperatura media mínima: ${averageMin}°C</p>
        <p class="temp-max">Temperatura media máxima: ${averageMax}°C</p>
    `;
}

const daysNumber = 7;
let days = [];    // Array unidimensional con los datos de la temperatura de una semana 

minTemperatureSum = 0;
maxTemperatureSum = 0;

const date = new Date();

for (let i = 0; i < daysNumber; i++) {
    let day = createDay(i, date.getDay(),date.getDate(),date.getMonth(),date.getFullYear());
    days.push(day);
    minTemperatureSum += day.minTemperature;
    maxTemperatureSum += day.maxTemperature;
}

//Calcular la media de las temperaturas máximas y la media de las temperaturas mínimas
averageMinTemperature = Math.round(minTemperatureSum/days.length);
averageMaxTemperature = Math.round(maxTemperatureSum/days.length);

console.log("Temperatura minima media:" + averageMinTemperature);
console.log("Temperatura maxima media:" + averageMaxTemperature);

if (typeof document !== 'undefined'){
    const weatherContainer = document.getElementById("weather-container");
    days.forEach(day => renderDay(day, weatherContainer));
    
    const temperatureContainer = document.getElementById("temperature-summary");
    renderTemperatureSummary(averageMinTemperature, averageMaxTemperature, temperatureContainer);
}