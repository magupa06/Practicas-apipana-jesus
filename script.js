const API_KEY = 'MQDXK2JTF5TQ29AMW4PGDTLB6';

let tempC = 0;
let feelsLikeC = 0;
let enCelsius = true;

async function buscar() {
  const ciudad = document.getElementById('ciudad').value.trim();

  if (!ciudad) return;

  document.getElementById('cargando').style.display = 'block';
  document.getElementById('tarjeta').style.display = 'none';
  document.getElementById('error').style.display = 'none';

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(ciudad)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    tempC = datos.currentConditions.temp;
    feelsLikeC = datos.currentConditions.feelslike;

    const humedad = datos.currentConditions.humidity;
    const viento = datos.currentConditions.windspeed;
    const condicion = datos.currentConditions.conditions;

    document.getElementById('nombre-ciudad').textContent =
      datos.resolvedAddress;

    document.getElementById('condicion').textContent =
      condicion;

    document.getElementById('humedad').textContent =
      humedad + '%';

    document.getElementById('viento').textContent =
      viento + ' km/h';

    mostrarTemperatura();

    document.getElementById('tarjeta').style.display = 'block';

  } catch (err) {
    document.getElementById('error').textContent =
      'No se pudo obtener el clima: ' + err.message;

    document.getElementById('error').style.display = 'block';

    console.error(err);

  } finally {
    document.getElementById('cargando').style.display = 'none';
  }
}

function mostrarTemperatura() {
  const temp = enCelsius
    ? tempC
    : (tempC * 9/5) + 32;

  const feels = enCelsius
    ? feelsLikeC
    : (feelsLikeC * 9/5) + 32;

  const unidad = enCelsius ? '°C' : '°F';

  document.getElementById('temperatura').textContent =
    Math.round(temp) + unidad;

  document.getElementById('sensacion').textContent =
    Math.round(feels) + unidad;
}

function cambiarUnidad() {
  enCelsius = !enCelsius;
  mostrarTemperatura();
}
