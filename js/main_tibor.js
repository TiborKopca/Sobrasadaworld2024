const mesDOM = document.querySelector("#button__description-mes");
const castellano = document.querySelector("#castellano");
const slovak = document.querySelector("#slovak");
const english = document.querySelector("#english");
const french = document.querySelector("#french");

//date
const monthNamesEN = [
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
const monthNamesES = [
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
const monthNamesSK = [
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

//CHANGE MONTH NAMES ACCORDING TO THE SELECTED LANGUAGE
function fillMonthToDom() {
  const date = new Date();
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  const idioma = langParam || navigator.language || navigator.userLanguage;
  // console.log('month in :'+idioma); //en-US
  switch (idioma) {
    case "sk":
      return monthNamesSK[date.getMonth()];
    case "en":
      return monthNamesEN[date.getMonth()];
    case "es":
      return monthNamesES[date.getMonth()];
    default:
      return monthNamesEN[date.getMonth()];
  }
}

//EVENTOS ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  mesDOM.innerHTML = fillMonthToDom();
  detectarIdioma();
  detectarNavegador();
});

//CHECK THE BROWSER LANGUAGE - TIBOR CODE
function detectarIdioma() {
  // Get the language parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);

  const langParam = urlParams.get("lang"); //gets the parameter (en, es, sk) from the URL
  console.log("langParam :" + langParam);

  // Use URL parameter if present, otherwise fall back to browser language
  const idioma = langParam || navigator.language || navigator.userLanguage;
  console.log("navigator-language :" + idioma); //en-US

  //GET THE CURRENT PAGE NAME
  // const currentPage = window.location.pathname;
  // if (currentPage !== "/index.html") {
  //   window.location.href = "/index.html";
  // }
  const paginaActual = window.location.pathname.split("/").pop();
  console.log(paginaActual);

  if (document.cookie === "") {
    //REDIRECT TO THE SELECTED LANGUAGE AT THE LOAD OF THE PAGE
    switch (idioma) {
      case "sk": //url parameter
      case "sk-SK": //navigator language
        if (paginaActual !== "sk.html") {
          document.cookie = `idioma=sk-SK`;
          window.location.href = "sk.html?lang=sk";
        }
        break;
      case "en":
      case "en-EN":
      case "en-US":
        if (paginaActual !== "index.html") {
          document.cookie = `idioma=en-US`;
          window.location.href = "index.html?lang=en";
        }
        break;
      case "es":
      case "es-ES":
        if (paginaActual !== "es.html") {
          document.cookie = `idioma=es-ES`;
          window.location.href = "es.html?lang=es";
        }
        break;
      default:
        if (paginaActual !== "index.html") {
          document.cookie === "idioma=en-US";
          window.location.href = "index.html?lang=en";
        }
    }
  }else{

  }
}
//INSERT COOKIES ON CLICK EVENTS
// Envento para insertar cokkies
// document.getElementById("nav__es").addEventListener("click", () => {
//   document.cookie = `idioma=es-ES`;
// });

// document.getElementById("nav__en").addEventListener("click", () => {
//   document.cookie = `idioma=en-EN`;
// });

// document.getElementById("nav__sk").addEventListener("click", () => {
//   document.cookie = `idioma=sk-SK`;
// });

//OBTAIN INFORMATION ABOUT THE BROWSER
const navigatorType = navigator.userAgent;
//FUNCTION TO OBTAIN THE BROWSER
function detectarNavegador() {
  if (navigatorType.indexOf("Chrome") !== -1) {
    console.log("Chrome");
  } else if (navigatorType.indexOf("Firefox") !== -1) {
    console.log("Firefox");
  } else if (navigatorType.indexOf("Safari") !== -1) {
    console.log("Safari");
  } else if (navigatorType.indexOf("Opera") !== -1) {
    console.log("Opera");
  } else if (navigatorType.indexOf("Edge") !== -1) {
    console.log("Edge");
  } else if (navigatorType.indexOf("Trident") !== -1) {
    console.log("Internet Explorer");
  } else if (navigatorType.indexOf("MSIE") !== -1) {
    console.log("Internet Explorer");
  }
}

//OPTIONS TO REDIRECT TO THE SELECTED LANGUAGE

//READ COOKIE ON LOAD
// window.onload = function () {
//   const paginaActual = window.location.pathname.split("/").pop(); // Obtiene el nombre de la página actual

//   if (
//     document.cookie.includes("idioma=castellano") &&
//     paginaActual !== "castellano.html"
//   ) {
//     window.location.href = "castellano.html";

//   } else if (
//     document.cookie.includes("idioma=slovak") &&
//     paginaActual !== "slovak.html"
//   ) {
//     window.location.href = "slovak.html";
//   } else if (
//     document.cookie.includes("idioma=english") &&
//     paginaActual !== "english.html"
//   ) {

//     window.location.href = "english.html";
//   } else if (
//     document.cookie.includes("idioma=french") &&
//     paginaActual !== "french.html"
//   ) {
//     window.location.href = "french.html";
//   }

//   if (paginaActual == "castellano.html") {
//   document.getElementById("castellano").classList.add("active");
//   }else if (paginaActual == "slovak.html") {
//     document.getElementById("slovak").classList.add("active");
//   }else if (paginaActual == "english.html") {
//     document.getElementById("english").classList.add("active");
//   }else if (paginaActual == "french.html") {
//     document.getElementById("french").classList.add("active");
//   }
// };

//EVENTS - CREATE COOKIE WITH EXPIRATION DATE

// castellano.addEventListener("click", () => {
//   const fechaActual = new Date();
//   const fechaExpiracion = new Date(
//     fechaActual.getTime() + 1000 * 60 * 60 * 24 * 7
//   ); //30 days in milliseconds
//   document.cookie = `idioma=castellano; expires=${fechaExpiracion.toUTCString()}; path=/`;
//   window.location.href = "castellano.html";
// });

