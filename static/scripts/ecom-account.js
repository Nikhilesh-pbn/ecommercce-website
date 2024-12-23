let data = localStorage.getItem("logged_info");
let {statusCode = null, session, username, redirect_url} = JSON.parse(data);
if(session){
    let displayUser = document.getElementById("displayUsername");
    displayUser.textContent = username;
}

const options = document.querySelectorAll('.options');

options.forEach(option => {
    option.addEventListener('click', function() {
        
        options.forEach(opt => {
            opt.classList.remove('static-effect');
            const link = opt.querySelector('a');
            if (link) {
                link.classList.remove('static-container');
            }
        });

        option.classList.add('static-effect');
        const clickedLink = option.querySelector('a');
        if (clickedLink) {
            clickedLink.classList.add('static-container');
        }
    });
});


const contentSections = document.querySelectorAll('.content-section');


function hideAllSections() {
    contentSections.forEach(section => {
        section.style.display = 'none'; 
    });
}


function showSection(targetId) {
    hideAllSections(); 
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block'; 
    }
}


options.forEach(option => {
    option.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target'); 
        showSection(targetId); 
    });
});


function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message; 
    notification.classList.add("show"); 
  
    
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }


let edits = document.getElementById("edit_button");
let save = document.getElementById('save_button');

let fields = document.getElementById("update_first_name");
let second = document.getElementById("update_last_name");

let genderMale = document.getElementById("gender_male");
let genderFemale = document.getElementById("gender_female");

let check_option = true;

function enableEditMode() {
    edits.textContent = 'Cancel';
    check_option = false;

    fields.disabled = false;
    fields.style.cursor = "text";

    second.disabled = false;
    second.style.cursor = "text";

    genderMale.disabled = false;
    genderMale.style.cursor = "pointer";

    genderFemale.disabled = false;
    genderFemale.style.cursor = "pointer";

    save.style.display = "block";

    setTimeout(()=>{
        fields.focus();
    },1000)
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('edit') === 'true') {
    enableEditMode(); 
}

function disableEditMode() {
    edits.textContent = 'Edit';
    check_option = true;

    fields.disabled = true;
    fields.style.cursor = "not-allowed";

    second.disabled = true;
    second.style.cursor = "not-allowed";

    genderMale.disabled = true;
    genderMale.style.cursor = "not-allowed";

    genderFemale.disabled = true;
    genderFemale.style.cursor = "not-allowed";

    save.style.display = "none";
}

edits.addEventListener('click', function () {
    if (check_option) {
        enableEditMode();
    } else {
        disableEditMode();
    }
});



save.addEventListener("click", function(event){
    event.preventDefault();
    let updated_data = {
        firstName : "",
        lastName : "",
        gender : "",
    }

    updated_data.firstName = fields.value;
    updated_data.lastName = second.value;

    if(genderMale.checked){
        updated_data.gender = genderMale.value;
    }else if (genderFemale.checked){
        updated_data.gender = genderFemale.value;
    }
    console.log(updated_data)
    showNotification("Account Details Updated!")
    disableEditMode();

    let update_local = localStorage.setItem("updated", updated_data);
})


let emailUpdate = document.getElementById("update_email_address");
let email_save_button = document.getElementById("email_save_button");

let email_edit_button = document.getElementById("edit_email_button");

let checkEmail = true
function emailEnableEditMode(){
    email_edit_button.textContent = "cancel";
    checkEmail = false;
    
    emailUpdate.disabled = false;
    emailUpdate.style.cursor = "text";

    email_save_button.style.display = "block";
}


function emailDisableEditMode(){
    email_edit_button.textContent = "Edit";
    checkEmail = true;

    emailUpdate.disabled = true;
    emailUpdate.style.cursor = "not-allowed";

    email_save_button.style.display = "none";
}

email_edit_button.addEventListener("click", function(){
    if(checkEmail){
        emailEnableEditMode();
    }
    else{
        emailDisableEditMode();
    }
})



email_save_button.addEventListener("click", function(event){
    event.preventDefault();

    let updatedEmail = {
        newEmail : "",
    }

    updatedEmail.newEmail = emailUpdate.value;

    showNotification("Account Details Updated!");
    console.log(updatedEmail);
    emailDisableEditMode();

})


let phone_edit_btn = document.getElementById("edit_phone_button");
let phoneUpdate = document.getElementById("update_phone_number");
let phone_save_button = document.getElementById("save_phone_button");

let checkPhone = true;
function phoneEnableEditMode(){
    phone_edit_btn.textContent = "cancel";
    checkPhone = false;

    phoneUpdate.disabled = false;
    phoneUpdate.style.cursor = "text";

    phone_save_button.style.display = "block";
}

function phoneDisableEditMode(){
    phone_edit_btn.textContent = "Edit";
    checkPhone = true;

    phoneUpdate.disabled = true;
    phoneUpdate.style.cursor = "not-allowed";

    phone_save_button.style.display = "none";
}

phone_edit_btn.addEventListener("click", (event) =>{
    if(checkPhone){
        phoneEnableEditMode();
    }else{
        phoneDisableEditMode();
    }
})

phone_save_button.addEventListener("click", (event) =>{
    event.preventDefault();

    let updatePhone = {
        oldPhone : phoneUpdate.value
    }
    updatePhone.oldPhone = phoneUpdate.value

    showNotification("Account Details Updated!");
    console.log(updatePhone);
    phoneDisableEditMode();
})

function validateInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
}

let addressFormContainer = document.getElementById("addressFormContainer")
let addressSave = document.getElementById("address_save_button");
let addressCancel = document.getElementById("address_cancel_button");
let newAddressBtn = document.getElementById("add_new_address_button");


newAddressBtn.addEventListener("click", ()=>{
    addressFormContainer.style.display = "block";
})

addressCancel.addEventListener("click", ()=>{
    addressFormContainer.style.display = "none";
})

document.getElementById('useCurrentLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("add_address_name").value = username;
                    document.getElementById("add_address_pin").value = data.address.postcode;
                    document.getElementById('add_address_area').value = "Parul University Of Engineering And Technology, Waghodia";
                    document.getElementById("add_address_locality").value = data.address.state_district;
                    document.getElementById("add_address_state").value = data.address.state; 
                    document.getElementById("add_address_city").value = data.address.state_district;
                    document.getElementById("add_address_landmark").value = data.address.county;
                    console.log(data);
                    
                })
                .catch(error => {
                    console.error('Error fetching the address:', error);
                });
        }, function(error) {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please enter it manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});


let editAddressForm = document.getElementById("addressFormContainer");

let editAddressFields = {
    name: document.getElementById("add_address_name"),
    phone: document.getElementById("add_address_phone"),
    pin: document.getElementById("add_address_pin"),
    locality: document.getElementById("add_address_locality"),
    area: document.getElementById("add_address_area"),
    city: document.getElementById("add_address_city"),
    state: document.getElementById("add_address_state"),
};

let addressTypes = {
    home: document.getElementById("add_address_home"),
    work: document.getElementById("add_address_work"),
};

let editSaveButton = document.getElementById("address_save_button");


function updateAdreesUi(ui){
        let{id,type,name,phone,pin,locality,area,city,state} = ui;
        
        let finalAddressContainer = document.createElement("div");
        
}


let uniqueId = 1
editAddressForm.addEventListener("submit", (event) =>{

    let saving_data = {
        id : uniqueId,
        saveType: "",
        saveName:"",
        savePhone : "",
        savePin : "",
        saveLocality : "",
        saveArea : "",
        saveCity : "",
        saveState : "",
    }

    let addressTypes = {
        home: document.getElementById("add_address_home"),
        work: document.getElementById("add_address_work"),
    };
    

    event.preventDefault();
    
    if(addressTypes.home.checked){
        saving_data.saveType = addressTypes.home.value;
    }else if (addressTypes.work.checked){
        saving_data.saveType = addressTypes.work.value;
    }

    saving_data.saveName =  editAddressFields.name.value;
    saving_data.savePhone = editAddressFields.phone.value;
    saving_data.savePin = editAddressFields.pin.value;
    saving_data.saveLocality = editAddressFields.locality.value;
    saving_data.saveArea = editAddressFields.area.value;
    saving_data.saveCity = editAddressFields.city.value;
    saving_data.saveState = editAddressFields.state.value;
    uniqueId += 1;
    updateAdreesUi(saving_data)
})























window.onload = function () {
    if (!sessionStorage.getItem("logged_in")) {
        window.location.href = "/loginpage";
    }
};

let logout = document.getElementById("loggedOut");
logout.addEventListener("click", () => {
    localStorage.clear("logged_info");
    sessionStorage.removeItem("logged_in");
    window.history.replaceState(null, null, '/');
    location.href = "/";
});

sessionStorage.setItem("logged_in", "true");

