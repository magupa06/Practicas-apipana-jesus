const API_KEY = 'TU_API_KEY_AQUI';

let clima;
let enCelsius = true;

class Temperatura {
  constructor(valor) {
    this.valor = valor;
  }

  mostrar(enCelsius) {
    if (enCelsius) return this.valor + '°C';

    return Math.round(this.valor * 9 / 5 + 32) + '°F';
  }
}

async function buscar() {
  const ciudad = document.getElementById('ciudad').value;

  // REGLA 1: Evitar condiciones anidadas
  // REGLA 2: No usar else
  if (!ciudad.trim()) return alert('Introduce una ciudad');

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(ciudad)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  clima = datos.currentConditions;
  clima.temperatura = new Temperatura(clima.temp);
  clima.ciudad = ciudad;
  enCelsius = true;

  mostrarClima();

  document.getElementById('toggle').style.display = 'inline';
}

function mostrarClima() {
  document.getElementById('resultado').innerHTML = `
    <b>${clima.ciudad}</b><br>
    Temperatura: ${clima.temperatura.mostrar(enCelsius)}<br>
    Condición: ${clima.conditions}<br>
    Humedad: ${clima.humidity}%<br>
    Viento: ${clima.windspeed} km/h
  `;
}

function cambiarUnidad() {
  if (!clima) return;

  enCelsius = !enCelsius;
  mostrarClima();
}

