/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

document.addEventListener("DOMContentLoaded", function() {
    /*
    =======================================
    TODO1: Welcome Board
    ---------------------------------------
    When the page loads, display a welcome message
    inside the <p> element with id="t1-msg".

    ✅ Task:
    - Select the element with id "t1-msg".
    - Change its text to "Hello, World!".

    💡 Hint:
    document.getElementById("t1-msg").innerHTML = "Hello, World!";
    */
    const t1Msg = document.getElementById("t1-msg").innerHTML = "Hello, World!";

    /*
    =======================================
    TODO2: Interaction Corner
    ---------------------------------------
    There is a button with id="t2-btn".
    When the button is clicked, change the text inside
    the <p> with id="t2-status" to:
        "You clicked the button!"

    ✅ Task:
    - Get the button element.
    - Add a click event listener.
    - Inside the event, change the text of the status paragraph.

    💡 Hint:
    button.addEventListener("click", function () {
        // change text here
    });
    */
    const t2Btn = document.getElementById("t2-btn");
    const t2Status = document.getElementById("t2-status");

    if (t2Btn && t2Status) {
        t2Btn.addEventListener("click", () => {
            t2Status.textContent = "You clicked the button!";
        });
    }

    /*
    =======================================
    TODO3: Inspiring Quote Board
    ---------------------------------------
    Use the Quotable API to display a random quote.

    🌍 API Link:
    https://dummyjson.com/quotes/random

    ✅ Task:
    - When the button with id="t3-loadQuote" is clicked:
        - Fetch a random quote from the API.
        - Display the quote text inside the <p> with id="t3-quote".
        - Display the author inside the <p> with id="t3-author".

    💡 Hint:
    The API returns JSON like:
    {
      "content": "Do not watch the clock. Do what it does. Keep going.",
      "author": "Sam Levenson"
    }

    Use:
    data.content   // the quote text
    data.author    // the author
    */
    const t3Btn = document.getElementById("t3-loadQuote");
    const t3Quote = document.getElementById("t3-quote");
    const t3Author = document.getElementById("t3-author");

    async function loadRandomQuote() {
        if (!t3Btn || !t3Quote || !t3Author) return;

        try {
            t3Btn.disabled = true;
            const originalText = t3Btn.textContent;
            t3Btn.textContent = "Loading…";

            const res = await fetch("https://dummyjson.com/quotes/random");
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();

            // Support both shapes:
            // dummyjson: { quote, author }
            // quotable-like: { content, author }
            const quoteText = data?.quote ?? data?.content ?? "Keep going.";
            const authorText = data?.author ?? "Unknown";

            t3Quote.textContent = `“${quoteText}”`;
            t3Author.textContent = `— ${authorText}`;

            t3Btn.textContent = originalText;
            t3Btn.disabled = false;
        } catch (err) {
            // Friendly fallback
            t3Quote.textContent =
                "“Do not watch the clock. Do what it does. Keep going.”";
            t3Author.textContent = "— Sam Levenson";
            t3Btn.textContent = "Inspire Me ✨";
            t3Btn.disabled = false;
            console.error(err);
        }
    }

    if (t3Btn) {
        t3Btn.addEventListener("click", loadRandomQuote);
    }

    /*
    =======================================
    TODO4: Dammam Weather Now
    ---------------------------------------
    Use the OpenWeatherMap API to display live weather data.

    🌍 API Link:
    https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

    ⚠️ Replace YOUR_API_KEY with your actual API key from:
    https://openweathermap.org/api

    ✅ Task:
    - When the button with id="t4-loadWx" is clicked:
        - Fetch current weather data for Dammam.
        - Show temperature in the element with id="t4-temp".
        - Show humidity in the element with id="t4-hum".
        - Show wind speed in the element with id="t4-wind".

    💡 Hint:
    data.main.temp      → temperature (°C)
    data.main.humidity  → humidity (%)
    data.wind.speed     → wind speed (m/s)
    */
    const t4Btn = document.getElementById("t4-loadWx");
    const t4Temp = document.getElementById("t4-temp");
    const t4Hum = document.getElementById("t4-hum");
    const t4Wind = document.getElementById("t4-wind");
    const t4Err = document.getElementById("t4-err");

    const OPENWEATHER_API_KEY = "9c29da573838fd8cdd561179419142d7";

    async function loadWeather() {
        if (!t4Btn || !t4Temp || !t4Hum || !t4Wind) return;

        const base = "https://api.openweathermap.org/data/2.5/weather";
        const city = "Dammam";
        const units = "metric";
        const url = `${base}?q=${encodeURIComponent(
            city
        )}&appid=${OPENWEATHER_API_KEY}&units=${units}`;

        try {
            t4Err && (t4Err.textContent = "");
            t4Btn.disabled = true;
            const originalText = t4Btn.textContent;
            t4Btn.textContent = "Loading…";

            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();

            const temp = Math.round(data?.main?.temp);
            const hum = data?.main?.humidity;
            const wind = data?.wind?.speed;

            t4Temp.textContent = Number.isFinite(temp) ? `${temp}°C` : "—";
            t4Hum.textContent = hum != null ? `${hum}%` : "—";
            t4Wind.textContent = wind != null ? `${wind} m/s` : "—";

            t4Btn.textContent = originalText;
            t4Btn.disabled = false;
        } catch (err) {
            if (t4Err) {
                t4Err.textContent =
                    "Could not load weather. Check your API key and network, then try again.";
            }
            t4Btn.textContent = "Check Weather ☁️";
            t4Btn.disabled = false;
            console.error(err);
        }
    }

    if (t4Btn) {
        t4Btn.addEventListener("click", loadWeather);
    }

});