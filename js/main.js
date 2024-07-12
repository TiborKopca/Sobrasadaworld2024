// que tipo de idioma tiene el navegador, insertar en una veriable
// detectar el idioma
function detectarIdioma() {
  const paginaActual = window.location.pathname.split("/").pop(); // Obtiene el nombre de la página actual
  console.log(paginaActual); //index.html
  console.log(window.location.pathname);

  const idioma = navigator.language;
  console.log(idioma);
  // si la cookie no existe
  if (document.cookie === "") {
    // redirigir a la pagina de idioma al inicio
    switch (idioma) {
      case "es-ES":
        if (paginaActual !== "es.html") {
          window.location.href = "es.html";
        } else {
          break;
        }
        break;
      case "en-EN":
      case "en-US":
      case "en-GB":
        if (paginaActual !== "index.html") {
          window.location.href = "index.html";
        } else {
          break;
        }
        break;
      case "sk-SK":
        if (paginaActual !== "sk.html") {
          window.location.href = "sk.html";
        }
        break;
      default:
        if (paginaActual !== "index.html") {
          window.location.href = "index.html";
        }
        break;
    }
  }
  // si la cookie existe
  else {
    console.log(document.cookie);
    console.log(window.location.href); //http://127.0.0.1:5500/index.html
    switch (document.cookie) {
      case "idioma=es-ES":
        if (paginaActual !== "es.html") {
          window.location.href = "es.html";
        }
        break;
      case "idioma=en-EN":
      case "idioma=en-US":
      case "idioma=en-GB":
        if (paginaActual !== "index.html") {
          window.location.href = "index.html";
        }
        break;
      case "idioma=sk-SK":
        if (paginaActual !== "sk.html") {
          window.location.href = "sk.html";
        }
        break;
      default:
        if (paginaActual !== "index.html") {
          window.location.href = "index.html";
        }
        break;
    }
  }
}

// buscar el mes actual y cambiar el texto dentro del id="mes"
function mesActual() {
  const mesDOM = document.querySelector("#button__description-mes");

  // Español
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  // Ingles
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Eslovaco
  const mesiace = [
    "Január",
    "Február",
    "Marec",
    "Apríl",
    "Máj",
    "Jún",
    "Júl",
    "August",
    "September",
    "Október",
    "November",
    "December",
  ];
  const fecha = new Date();
  const mes = fecha.getMonth();
  // si la cookie es en-EN
  if (document.cookie === "idioma=en-EN" || navigator.language === "en-EN") {
    mesDOM.textContent = months[mes];
  }
  // si la cookie es sk-SK
  else if (
    document.cookie === "idioma=sk-SK" ||
    navigator.language === "sk-SK"
  ) {
    mesDOM.textContent = mesiace[mes];
  }
  // si la cookie es es-ES
  else if (
    document.cookie === "idioma=es-ES" ||
    navigator.language === "es-ES"
  ) {
    mesDOM.textContent = meses[mes];
  } else {
    //NO COOKIE
    mesDOM.textContent = months[mes];
  }
}

//INSERT COOKIES EVENT LISTENERS
document.getElementById("nav__es").addEventListener("click", () => {
  document.cookie = `idioma=es-ES;`;

  // const fechaActual = new Date();
  //30 days in milliseconds
  // const fechaExpiracion = new Date(
  //   fechaActual.getTime() + 1000 * 60 * 60 * 24 * 7
  // );
  // document.cookie = `idioma=es-ES; expires=${fechaExpiracion.toUTCString()}; path=/language-cookie`;
});

document.getElementById("nav__en").addEventListener("click", () => {
  document.cookie = `idioma=en-EN`;
});

document.getElementById("nav__sk").addEventListener("click", () => {
  document.cookie = `idioma=sk-SK`;
});

//OBTAIN LOCALE DATA FROM THE JSON FILE - on the base of the html lang code
async function getDataFromJSONfile() {
  //API_URL CAN BE CHANGED FROM LOCALHOST TO THE SERVER URL
  const API_URL =
    "https://tiborkopca.github.io/Sobrasadaworld2024/JSON/DB.json";
  const localLanguage = document.documentElement.lang;
  // console.log(localLanguage);
  let localLanguageData = {};

  try {
    //response object
    const response = await fetch(API_URL);
    //check for response error
    if (!response.ok) {
      throw new Error("Could not fetch resource.");
    }
    //this also returns a promise
    // const localeData = await response.json();
    const localeData = await response.json();
    // const newCharacterJSON = JSON.parse(localeData);
    // console.log(newCharacterJSON.value);
    // let phrase = newCharacterJSON.value;
    // outputJoke.innerHTML = phrase;

    switch (localLanguage) {
      case "sk":
        localLanguageData = localeData.sk;
        // console.log(localLanguageData)
        // return localLanguageData;
        break;
      case "en":
        localLanguageData = localeData.en;
        // console.log(localLanguageData)
        break;
      // return localLanguageData;
      case "es":
        localLanguageData = localeData.es;
        // console.log(localLanguageData)
        // return localLanguageData;
        break;
      default:
        localLanguageData = localeData.en;
      // return console.log(localeData.en);
    }
    fillLocaleData(localLanguageData);
  } catch (error) {
    console.error(error);
  }
}

function fillLocaleData(data) {
  //SEO
  const title = document.querySelector("#title");
  title.innerHTML = data.seo.title;
  const description = document.querySelector("meta[name=description]");
  description.content = data.seo.description;
  //main content
  const header = document.querySelector("#header-main-text");
  header.innerHTML = data.certificate;
  const mainText = document.querySelector("#main-text-long");
  mainText.innerHTML = data.description;
  const button = document.querySelector("#button-main");
  button.innerHTML = data.main_button;
  const buttonDescription = document.querySelector("#buttonDescription");
  buttonDescription.innerHTML =
    data.main_button_description + " " + buttonDescription.textContent;
}
// Zona de Control
function main() {
  detectarIdioma();
  mesActual();
  getDataFromJSONfile();
  // fillLocaleData();
}

//MAIN FUNCTION STARTS HERE
main();
