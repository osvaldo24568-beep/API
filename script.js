const apiKey = "ad9437b305d99a7aafa901b0eb9dbe62";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMsg = document.getElementById("error-msg");

// NUEVO: Seleccionamos la imagen principal del clima de nuestro HTML
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    // Si el usuario no escribe nada, salimos de la función
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        // Imprime en la consola para depurar (F12 en el navegador)
        console.log("Respuesta de la API:", response.status);

        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherInfo.style.display = "none";
        } else if (response.status == 401) {
            alert("Error: Tu API Key aún no está activada. Espera 30-60 min.");
        } else {
            const data = await response.json();
            console.log(data); // Ver todos los datos recibidos

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // NUEVO: Esto actualiza la imagen dinámicamente usando el icono que manda la API
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

            weatherInfo.style.display = "block";
            errorMsg.style.display = "none";
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

// Evento para el botón
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value.trim());
});

// Evento para la tecla Enter
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value.trim());
    }
});