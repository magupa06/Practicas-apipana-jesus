
const API_KEY = 'TU_API_KEY_AQUI';

let clima;
let enCelsius = true;

// REGLA 3: Encapsular la temperatura en una clase
// REGLA 7: Clase pequeña
// REGLA 8: Solo una variable de instancia
class Temperatura {
  constructor(valor) {
    this.valor = valor;
  }

  // REGLA 2: No usar else
  // REGLA 9: No usar getters ni setters
  mostrar(enCelsius) {
    if (enCelsius) return this.valor + '°C';

    return Math.round(this.valor * 9 / 5 + 32) + '°F';
  }
}

// REGLA 6: Usar nombres claros
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

// REGLA 5: Evitar cadenas largas de métodos
// REGLA 9: El objeto Temperatura hace la conversión
function mostrarClima() {
  document.getElementById('resultado').innerHTML = `
    <b>${clima.ciudad}</b><br>
    Temperatura: ${clima.temperatura.mostrar(enCelsius)}<br>
    Condición: ${clima.conditions}<br>
    Humedad: ${clima.humidity}%<br>
    Viento: ${clima.windspeed} km/h
  `;
}

// REGLA 1: Función sin condiciones anidadas
// REGLA 2: No utilizar else
function cambiarUnidad() {
  if (!clima) return;

  enCelsius = !enCelsius;
  mostrarClima();
}

