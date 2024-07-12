//VARIABLES / CONSTANTS
const formDOM = document.getElementById("mainForm");
// const outputJoke = document.getElementById('jokeWrapper')

// que tipo de idioma tiene el navegador, insertar en una veriable
// detectar el idioma
function detectarIdioma() {
  const paginaActual = window.location.pathname.split("/").pop(); // Obtiene el nombre de la página actual
  console.log(paginaActual); //form.html


  const idioma = navigator.language;
  // si la cookie no existe
  if (document.cookie === "") {
    // redirigir a la pagina de idioma al inicio
    switch (idioma) {
      case "es-ES":
        if (window.location.pathname !== "/form-es.html") {
          window.location.href = "form-es.html";
        }
        break;
      case "en-EN":
        if (window.location.pathname !== "/form-en.html") {
          window.location.href = "form.html";
        }
        break;
      case "sk-SK":
        if (window.location.pathname !== "/form-sk.html") {
          window.location.href = "form-sk.html";
        }
        break;
    }
  }
  // si la cookie existe
  else {
    // console.log(window.location.href) //http://127.0.0.1:5500/index.html
    switch (window.location.href) {
      case "es-ES":
        if (window.location.pathname !== "/form-es.html") {
          window.location.href = "form-es.html";
        }
        break;
      case "en-EN":
        if (window.location.pathname !== "/form-en.html") {
          window.location.href = "form.html";
        }
        break;
      case "sk-SK":
        if (window.location.pathname !== "/form-sk.html") {
          window.location.href = "form-sk.html";
        }
        break;
    }
  }
}

//OBTAIN LOCALE DATA FROM THE JSON FILE
async function getDataFromJSONfile() {
  //API_URL CAN BE CHANGED FROM LOCALHOST TO THE SERVER URL
  const API_URL =
    "https://tiborkopca.github.io/Sobrasadaworld2024/JSON/DB.json";
    const API_URL_LOCAL =
    "../JSON/DB.json";
  const localLanguage = document.documentElement.lang;
  console.log(localLanguage);
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
        // return console.log(localeData.en);
    }
    fillLocaleData(localLanguageData);
  } catch (error) {
    console.error(error);
  }
}

function fillLocaleData(data) {
  console.log(data);
  //SEO
  const title = document.querySelector("#title");
  title.innerHTML = data.seo.title__form;
  const description = document.querySelector("meta[name=description]");
  description.content = data.seo.description;
  //main content
  const header = document.querySelector("#header-main-text");
  header.innerHTML = data.certificate;
  const formButton = document.querySelector("#formBtn");
  formButton.innerHTML = data.form_button;
  const formButtonDescription = document.querySelector("#formTextData");
  formButtonDescription.innerHTML = data.form_button_description;
  const form_personal_data_title = document.querySelector("#personalDataTitle");
  form_personal_data_title.innerHTML = data.form_personal_data_title;
  const form_send_data = document.querySelector("#shippingDataTitle");
  form_send_data.innerHTML = data.form_send_data;
  const form_name = document.querySelector("#nameLabel");
  form_name.innerHTML = data.form_name;
  const form_mobil = document.querySelector("#movilLabel");
  form_mobil.innerHTML = data.form_mobil;
  const form_surname = document.querySelector("#lastnameLabel");
  form_surname.innerHTML = data.form_surname;
  const form_adress = document.querySelector("#adressLabel");
  form_adress.innerHTML = data.form_adress;
  const form_city = document.querySelector("#cityLabel");
  form_city.innerHTML = data.form_city;
  const form_postalcode = document.querySelector("#pcLabel");
  form_postalcode.innerHTML = data.form_postalcode;
  const form_email = document.querySelector("#emailLabel");
  form_email.innerHTML = data.form_email;
  const form_input_name = document.querySelector("#nameInput");
  form_input_name.placeholder = data.form_name_placeholder;
  const form_input_lastname = document.querySelector("#lastnameInput");
  form_input_lastname.placeholder = data.form_surname_placeholder;
  const form_input_email = document.querySelector("#emailInput");
  form_input_email.placeholder = data.form_email_placeholder;
  const form_input_mobil = document.querySelector("#movilInput");
  form_input_mobil.placeholder = data.form_mobil_placeholder;
  const form_input_adress = document.querySelector("#adressInput");
  form_input_adress.placeholder = data.form_adress_placeholder;
  const form_input_city = document.querySelector("#cityInput");
  form_input_city.placeholder = data.form_city_placeholder;
  const form_input_pc = document.querySelector("#pcInput");
  form_input_pc.placeholder = data.form_postalcode_placeholder;
  // const mainText = document.querySelector("#main-text-long");
  // mainText.innerHTML = data.description;
  // const button = document.querySelector("#button-main");
  // button.innerHTML = data.main_button;
  // const buttonDescription = document.querySelector("#buttonDescription");
  // buttonDescription.innerHTML = data.main_button_description;
}
// Zona de Control
function form() {
  detectarIdioma();
  getDataFromJSONfile();
}

//MAIN FUNCTION STARTS HERE
form();



//FUNCTION TO PROCESS THE FORM
const processAllData = (event) => {
  event.preventDefault();

  const rawData = new FormData(event.target);
  const dataComplete = Object.fromEntries(rawData.entries());
  const dataJSON = JSON.stringify(dataComplete);
  console.log(dataComplete, dataJSON);

  formDOM.reset();
  localStorage.clear();

  localStorage.setItem("formdata", dataJSON);

  //USE OF THE MODULE FS TO SAVE THE FILE -- this is not working without NODE.js modules
  //   const fs = require("fs");

  //   //WRITE FILE WITH DATA
  //   if (!fs.existsSync("../JSON")) {
  //     fs.mkdirSync("../JSON");
  //   }
  //   fs.writeFile("../JSON/users.json", dataJSON, 'utf8', (err) => {
  //     if (err) {
  //         console.error('Error escribiendo el archivo:', err);
  //         return;
  //       }
  //       console.log('Archivo escrito exitosamente');
  //   });  

  console.log(getDataFormJSONfile());
};

//FUNCTION
async function getDataFormJSONfile() {
  try {
    //response object
    const response = await fetch(API_URL);
    //check for response error
    if (!response.ok) {
      throw new Error("Could not fetch resource.");
    }
    //this also returns a promise
    const data = await response.json();
    console.log(data);
    // const newCharacterJSON = data;
    // let phrase = newCharacterJSON.value;
    // outputJoke.innerHTML = phrase;
  } catch (error) {
    console.error(error);
  }
}

//EVENT LISTENER
formDOM.addEventListener("submit", processAllData);
