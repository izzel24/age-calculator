let outyears = document.getElementById("years");
let outmonths = document.getElementById("months");
let outdays = document.getElementById("days");
let labels = document.querySelectorAll(".label");
let errorAlerts = document.querySelectorAll(".error-alert");
let successElements = document.querySelectorAll(".success");
form1.addEventListener("submit",(e) => {
    e.preventDefault();
    checker();
})
function getinput(){
    let days = form1.day.value;
    let months = form1.month.value;
    let years = form1.year.value;
        let birthdate = new Date(`${months}/${days}/${years}`);
        let currentdate = new Date();
        let datedifference = currentdate - birthdate;
        
        let day = Math.floor((datedifference % (1000*60*60*24*30.44))/(1000*60*60*24));
        let month = Math.floor((datedifference % (1000*60*60*24*30.44))/(1000*60*60*24*30.44));
        let year = Math.floor(datedifference /(1000*60*60*24*365.25));
    
        outdays.innerHTML= day;
        outmonths.innerHTML=month;
        outyears.innerHTML=  year;
}
function checker() {
    let days = parseInt(form1.day.value, 10);
    let months = parseInt(form1.month.value, 10);
    let years = parseInt(form1.year.value, 10);
    let leapyear;
    
    if (years % 4 === 0 && (years % 100 !== 0 || years % 400 === 0)) {
        leapyear = true;
    } else {
        leapyear = false;
    }

    let dayonmonth;

    if (months === 2) {
        if (leapyear === true) {
            dayonmonth = 29;
        } else {
            dayonmonth = 28;
        }
    } else if (months !== 2 && months % 2 === 0 && months !== 8) {
        dayonmonth = 30;
    } else if (months !== 2 && (months % 2 !== 0 || months === 8)) {
        dayonmonth = 31;
    }

    labels.forEach((label, index) => {
        if (isNaN(days) && isNaN(months) && isNaN(years)) {
            label.classList.add("labelerr");
            errorAlerts[index].innerText = "This field is required";
            successElements[index].classList.remove("success");
        }else if(isNaN(days) && !isNaN(months) && !isNaN(years)){
            label.classList.add("labelerr");
            errorAlerts[0].innerText = "This field is required";
            successElements[index].classList.remove("success");
        }else if(!isNaN(days) && isNaN(months) && !isNaN(years)){
            label.classList.add("labelerr");
            errorAlerts[1].innerText = "This field is required";
            successElements[index].classList.remove("success");
        }else if(!isNaN(days) && !isNaN(months) && isNaN(years)){
            label.classList.add("labelerr");
            errorAlerts[2].innerText = "This field is required";
            successElements[index].classList.remove("success");
        }else if (days > 31 || days <= 0) {
            label.classList.add("labelerr");
            errorAlerts[0].innerText = "Must be a valid date";
            successElements[index].classList.remove("success");
        } else if (days > dayonmonth) {
            label.classList.add("labelerr");
            errorAlerts[0].innerText = "Must be a valid date";
            successElements[index].classList.remove("success");
        } else if (months > 12) {
            label.classList.add("labelerr");
            errorAlerts[1].innerText = "Must be a valid date";
            successElements[index].classList.remove("success");
        } else if (years > new Date().getFullYear()) {
            label.classList.add("labelerr");
            errorAlerts[2].innerText = "Must be a valid date";
            successElements[index].classList.remove("success");
        } else if (!isNaN(days) && !isNaN(months)  && !isNaN(years)) {
            label.classList.remove("labelerr");
            errorAlerts[index].innerText = ""; 
            successElements[index].classList.add("success");
            getinput();
        }
    });
}