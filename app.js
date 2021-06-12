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
const appointentList = document.querySelector('#appointments');
//1.4 Editing input variable
let editing;


//2. Events

eventListeners();

function eventListeners() {
    clientNameInput.addEventListener('change', appointmentData);
    companyInput.addEventListener('change', appointmentData);
    emailInput.addEventListener('change', appointmentData);
    dateInput.addEventListener('change', appointmentData);
    timeInput.addEventListener('change', appointmentData);
    detailsInput.addEventListener('change', appointmentData);
    form.addEventListener('submit', newAppointment);
};

//3.Main Object

const mainObj = {
    client: "",
    company: "",
    email: "",
    date: "",
    time: "",
    details: ""
};


//5. Classes
//5.1 UI -->all visual part: print HTML. No constructor needed.
class UI {
    printAlert(message, type) { //Method to print message
        //Create divElement
        const divMessage = document.createElement('div');
        //Add bootstrap classes for styling
        divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');
        //conditional depending on the type of message (error or success)
        if (type === 'error') {
            divMessage.classList.add('alert-danger')
        } else {
            divMessage.classList.add('alert-success')
        }
        //add error messadge
        divMessage.textContent = message;
        //add divMessage to the DOM
        document.querySelector('#content').insertBefore(divMessage, document.querySelector('#left-side'));
        //setTimeOut to remove alert message
        setTimeout(() => {
            divMessage.remove();
        }, 5000)
    }
    //Print appointments method
    printAppointment({
        appointments
    }) {
        this.cleanHTML();

        appointments.forEach(appointment => {
            const {
                client,
                company,
                email,
                date,
                time,
                details,
                id
            } = appointment;

            //create appointment div
            const appDiv = document.createElement('div');
            appDiv.classList.add('appointments-card', 'p-3');
            appDiv.dataset.id = id;

            //Scripting of appointment elements
            const clientP = document.createElement('h2');
            clientP.classList.add('card-title', 'font-weight-bolder', 'text-center',);
            clientP.innerHTML = `<strong>${client}</strong>`;
            const companyP = document.createElement('p');
            const emailP = document.createElement('p');
            const dateP = document.createElement('p');
            const timeP = document.createElement('p');
            const detailsP = document.createElement('p');


            companyP.innerHTML = `
                <span class="font-weight-bolder"> <strong>Company:</strong> </span> ${company};
            `;
            emailP.innerHTML = `
                <span class="font-weight-bolder"><strong>Email:</strong> </span> ${email};
            `;
            dateP.innerHTML = `
                <span class="font-weight-bolder"><strong>Date:</strong> </span> ${date};
             `;
            timeP.innerHTML = `
                <span class="font-weight-bolder"><strong>Time:</strong></span> ${company};
            `;
            detailsP.innerHTML = `
                <span class="font-weight-bolder"><strong>Details:</strong></span> ${company};
            `;

            //delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'me-2', 'button-style')
            deleteBtn.innerHTML = 'Delete <i class="far fa-times-circle"></i>'
            deleteBtn.onclick = () => deleteApp(id);
            //edit Button
            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-info', 'button-style', 'text-white');
            editBtn.innerHTML = 'Edit <i class="far fa-edit"></i>';
            editBtn.onclick = () => editApp(appointment);

            //Add paragraphs to appDiv
            appDiv.appendChild(clientP);
            appDiv.appendChild(companyP);
            appDiv.appendChild(emailP);
            appDiv.appendChild(dateP);
            appDiv.appendChild(timeP);
            appDiv.appendChild(detailsP);
            appDiv.appendChild(deleteBtn);
            appDiv.appendChild(editBtn);

            //add appDiv to HTML
            appointentList.appendChild(appDiv);
        });
    }

    //delete firstChild to dont get repeated appointments anytime one is added

    cleanHTML() {
        while (appointentList.firstChild) {
            appointentList.removeChild(appointentList.firstChild);
        }
    }
};

//5.2 appointments--> make, edit and delete appointments
class Appointents {
    constructor() {
        this.appointments = [];
    }

    addAppointment(appointment) {
        this.appointments = [...this.appointments, appointment];
    }

    deleteOneApp(id) {
        this.appointments = this.appointments.filter(appointment => appointment.id != id)
    }

    editingApp(updatedApp){
        this.appointments = this.appointments.map(appointment => appointment.id === updatedApp.id ? updatedApp : appointment);
    }
}

//6. instantiate classes

const ui = new UI();
const manageAppointments = new Appointents()

//4. Functions
//4.1 Get the data from inputs and add them to the Main Object (3)

function appointmentData(e) {
    mainObj[e.target.name] = e.target.value;
};


//4.2 validate and add a new appointment to class Apointments

function newAppointment(e) {
    e.preventDefault();
    const {
        client,
        company,
        email,
        date,
        time,
        details
    } = mainObj; //Extract the info from the mainObj

    if (client === "" || company === "" || email === "" || date === "" || time === "" || details === "") { //No empty inputs
        ui.printAlert('All fields are required', 'error')
    }

    if(editing) {
        //print the message
        ui.printAlert('Edition correct');
        //put appointemnt object into edition mode
        manageAppointments.editingApp({...mainObj});
        //Bring text button back to origin messge
        form.querySelector('button[type = "submit"]').textContent = 'Add To Appointments';
        //disabling editing mode
        editing = false;
    } else {
        //Add Id to object
        mainObj.id = Date.now();
        //Add new appointment
        manageAppointments.addAppointment({ ...mainObj });
        ui.printAlert('Successfully added');
    };

    //Restart mainObj
    restartObject();
    //reset form
    form.reset();
    //print appointments
    ui.printAppointment(manageAppointments);

};

//4.3 Restart the object

function restartObject() {
    mainObj.client = "";
    mainObj.company = "";
    mainObj.email = "";
    mainObj.date = "";
    mainObj.time = "",
        mainObj.details = ""
}

//4.4 Delete appointmetns

function deleteApp(id) {
    //Delete
    manageAppointments.deleteOneApp(id);
    //Show succes message when deleting
    ui.printAlert('Succesfully deleted');
    //update appointment List
    ui.printAppointment(manageAppointments);
};


//Charge data and edition mode

function editApp(appointment) {
    const {
        client,
        company,
        email,
        date,
        time,
        details,
        id,
    } = appointment;
    //fill the inputs
    clientNameInput.value = client;
    companyInput.value = company;
    emailInput.value = email;
    dateInput.value = date;
    timeInput.value = time;
    detailsInput.value = details;

    //Filling the mainObj with appointment values

    mainObj.client = client;
    mainObj.company = company;
    mainObj.email = email;
    mainObj.date = date;
    mainObj.time = time;
    mainObj.details = details;
    mainObj.id = id;
    //Change button text when editing the form
    form.querySelector('button[type = "submit"]').textContent = 'Save changes';
    editing = true;
}