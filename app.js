//1. Variables

//1.1. Form Inputs
const clientNameInput = document.querySelector('#form-name');
const companyInput = document.querySelector('#form-company');
const emailInput = document.querySelector('#form-email');
const dateInput = document.querySelector('#form-date');
const timeInput = document.querySelector('#form-time');
const detailsInput = document.querySelector('#form-details');
//1.2 Whole Form
const form = document.querySelector('#management-form');
//1.3 List where appointments will be created
const appointentList = document.querySelector('appointments');


//2. Events

eventListeners();

function eventListeners(){
    clientNameInput.addEventListener('change', appointmentData);
    companyInput.addEventListener('change', appointmentData);
    emailInput.addEventListener('change', appointmentData);
    dateInput.addEventListener('change', appointmentData);
    timeInput.addEventListener('change', appointmentData);
    detailsInput.addEventListener('change', appointmentData);
};

//3.Main Object

const mainObj = {
    client: "",
    company: "",
    email: "",
    date: "",
    time: "",
    details:""
};

//4. Functions
//4.1 Get the data from inputs and add them to the Main Object (3)

function appointmentData(e) {
    mainObj[e.target.name] = e.target.value;
    console.log(mainObj);
};
