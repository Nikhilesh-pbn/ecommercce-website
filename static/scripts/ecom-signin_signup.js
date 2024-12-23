// Login Page (ecom-signin.html)
let loginForm = document.getElementById("login_form");

if (loginForm) {
    let login_user = document.getElementById("login_username");
    let userNameError = document.getElementById("error_username");

    let login_password = document.getElementById("login_password");
    let userPassError = document.getElementById("error_password");

    
    function validateForm(){
        let isValid = true;

        if(!login_user.value.trim() || login_user.value.length <= ""){
            userNameError.textContent = "*Required";
            isValid = false;
        }else{
            userNameError.textContent = "";
        }

        login_user.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
    
                if (login_user.value !== "") {
                    userNameError.textContent = ""; 
                    let login_password = document.getElementById("login_password");
                    if (login_password) {
                        login_password.focus();
                    }
                } else {
                    userNameError.textContent = "*Required";
                    event.preventDefault();
                }
            }
        });

        

        if(!login_password.value.trim() || login_password.value <= ""){
            userPassError.textContent = "*Required";
            isValid = false;
        }else{
            userPassError.textContent = "";
        }
        return isValid;
    };

    let loginShowPass = document.getElementById("loginCheckBox");
    check = true;
    loginShowPass.addEventListener("change", function(){
        if(check){
            login_password.type = "text";
            check = false;
        }else{
            login_password.type = "password";
            check = true;
        }
    });

    loginForm.addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault(); 
        }
    });

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            if (validateForm()) {
                const data = {
                    login_username: login_user.value,
                    login_password: login_password.value,
                };

                let url = '/login';
                let options = {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify(data),
                }
    
                fetch(url,options)
                .then(response => {
                    if(response.ok){
                        return response.json()
                    }
                    else {
                        return response.json().then(json => {
                            throw json;
                        });
                    }
                }
                )
                .then(json => {
                    localStorage.setItem("logged_info", JSON.stringify(json));
                    let object = localStorage.getItem("logged_info");
                    console.log(object);
                    let {statusCode,session,redirect_url} = JSON.parse(object);
                    if(statusCode === 200 && session === true){
                        userNameError.textContent = "Login successfull";
                        userNameError.style.color = "green";
                        setTimeout(() => {
                            userNameError.textContent = "Redirecting...";
                            userNameError.style.color = "black";
                            loginForm.reset();
                            setTimeout(function(){
                                if(session === true){
                                    location.href = redirect_url;
                                    loginForm.value = "";

                                }else{
                                    location.href = redirect_url;
                                }
                            }, 1000);
    
                        }, 1000);
                        
                    }else if(statusCode === 401){
                        userNameError.textContent = "Invalid email/username or password";
                        login_password.value = ""
                    }
                })
                .catch(error => {
                    console.error("Error during login request:", error);
                    alert("An error occurred. Please try again later.");
                });
            }
        });
    }

}

// Register Page (ecom-signup.html)

let register_form = document.getElementById("register_form");

if(register_form){
    let registering_fullname = document.getElementById("register_fullname");
    let register_email = document.getElementById("register_email");
    let register_pass = document.getElementById("register_password");
    let registerShowPass = document.getElementById("registerCheckBox");

    function validateRegister(){
        let isValid = true;
        let errorFullame = document.getElementById("error_fullname");
        if(registering_fullname.value.trim().length < 1){
            errorFullame.textContent = "Atleast 1 character";
            isValid = false;
        }else{
            errorFullame.textContent = "";
        }

        let emailError = document.getElementById("error_email");
        if(register_email.value.trim() === ""){
            emailError.textContent = "*Required";
            isValid = false;
        }else{
            emailError.textContent = "";
        }

        let errorPassword = document.getElementById("error_register_password");
        if(register_pass.value.trim()< 6){
            errorPassword.textContent = "At least 6 character";
            isValid = false;
        }else{
            errorPassword.textContent = ""
        }

        return isValid
    }

if(registerShowPass){
    let regCheck = true;
registerShowPass.addEventListener("change", function(event){
    if(regCheck){
        register_pass.type="text";
        regCheck = false;
    }else{
        register_pass.type = "password";
        regCheck = true;
    }
});
}

register_form.addEventListener("submit", function(event){
    if(!validateRegister()){
        event.preventDefault()
    }
})

if(register_form){}
register_form.addEventListener("submit", function(event){
    event.preventDefault();
        if(validateRegister()){
            const register_data = {
                registerFullname : registering_fullname.value,
                registerEmail : register_email.value,
                registerPassword : register_pass.value,
            };

            let url = '/register';
            let options = {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body :JSON.stringify(register_data), 
            };

            fetch(url, options)
            .then( response=>{
                if(response.ok){
                    return response.json()
                }else {
                    return response.json().then(json => {
                        throw json;
                    });
                }
                
            })
            .then(json => {
                console.log(json);
                let {statusCode,success,redirect_url} = json;
                if(statusCode === 200){
                    setTimeout(function(){
                        location.href = redirect_url;
                        register_form.value = "";
                    }, 1000);

                }else if(statusCode === 409){
                    emailError.textContent = "Email already exists";
                }
                else if(statusCode === 500){
                    emailError.textContent = "internal server error";
                }
            })
            .catch(error => {
                console.error("Error during login request:");
                alert("An error occurred. Please try again later.");
            });
        }

})

}




