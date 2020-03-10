//for contact us FORM
let submit_form = document.querySelector("#submit_form");
let nameInput = submit_form.elements.namedItem("nameInput");
let emailInput = submit_form.elements.namedItem("emailInput");
let subjectInput = submit_form.elements.namedItem("subjectInput");
let msgInput = submit_form.elements.namedItem("msgInput");
let nameWarning = document.querySelector(".nameWarning");
let inputStatus;


//Validation function
(function validate() {
    nameInput.addEventListener("blur", () => {
        if (nameInput.value == null || nameInput.value === "" || nameInput.value.length <= 3 || ! /^[a-zA-Z]+$/.test(nameInput.value)) {
            nameWarning.innerHTML = "insert real name";
            console.log("wrong name");
            inputStatus = false;
        }
        else{
            nameWarning.innerHTML = "";
            inputStatus = true;
        }
    });

    emailInput.addEventListener("blur", () => {
        if (emailInput.value == null || emailInput.value === "" || ! /^[a-zA-z0-9]+@[a-z]+.[a-z]{2,4}$/.test(emailInput.value)) {
            document.querySelector(".emailWarning").innerHTML = "invalid email";
            console.log("email is not valid");
            inputStatus = false;
        }else{
            document.querySelector(".emailWarning").innerHTML = "";
            inputStatus = true;
        }
    });
}());

submit_form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (inputStatus) {
        document.querySelector(".submitWarning").innerHTML = "";
        fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: msgInput.value
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (!data.status) {
                    console.log("from if(!data.status)");
                    console.log("data error name : " + data.error.name);
                    console.log("data error email : " + data.error.email);
                    return;
                } else {
                    alert("we will reply soon");
                    window.location.replace("contact.html");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        document.querySelector(".submitWarning").innerHTML = "fill the form first";
    }
});





