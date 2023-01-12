//variables 
const ham = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav-links"),
    button = document.querySelector(".find-btn"),
    inputvalue = document.querySelector(".inputvalue"),
    day = document.querySelector(".day"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    temp = document.querySelector(".temp"),
    umb = document.querySelector(".umb"),
    wind = document.querySelector(".wind"),
    compass = document.querySelector(".compass"),
    box = document.querySelector(".weather-box"),
    errbox = document.querySelector('.error-box-deactive'),
    modal = document.getElementById('simpleModal'),
    modalBtn = document.querySelectorAll('.modal-btn'),
    closeBtn = document.getElementsByClassName('close-button')[0],
    email = document.querySelector('input[name=email]'),
    btn = document.querySelector('.subscribe-btn'),
    container = document.querySelector('.email-container');

var modals = document.querySelectorAll('.modal'),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today = new Date(),
    d = today.getDate(),
    dd = days[today.getDay()],
    m = months[today.getMonth()];

//hamburger

ham.addEventListener("click", function () {
    nav.classList.toggle("fe");
})

//weather box 

if (errbox) {
    button.addEventListener("click", function () {
        data(inputvalue.value)
    });

    data("mumbai");
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);
}

function errors() {
    box.classList.add('weather-box-deactive');
    box.classList.remove('weather-box-active');
    errbox.classList.remove('error-box-deactive');
    errbox.classList.add('error-box-active');
    errbox.innerText = "Sorry! No such results found";
}

function data(key) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + key + "&appid=ac702584ab61fe13212d2cc25adb4ed9")
        .then((res) => res.json())
        .then((data) => {
            box.classList.add('weather-box-active');
            box.classList.remove('weather-box-deactive');
            errbox.classList.remove('error-box-active');
            errbox.classList.add('error-box-deactive');
            const namevalue = data.name,
                tempvalue = data["main"]["temp"],
                rainvalue = data["main"]["humidity"],
                windvalue = data["wind"]["speed"],
                compasss = data["wind"]["deg"],
                dates = d + " " + m,
                dayss = dd,
                descvalue = data["weather"][0]["main"],
                figure = document.querySelector(".img");
            figure.children[0].src = "assets/Images/icons/" + descvalue + ".svg";
            figure.children[0].alt = descvalue;
            city.innerHTML = namevalue;
            day.innerHTML = dayss;
            date.innerHTML = dates;
            temp.innerHTML = Math.floor(tempvalue - 273) + "°" + "C";
            umb.innerHTML = rainvalue + "%";
            wind.innerHTML = windvalue * 1 + "km/h";
            compass.innerHTML = compasss;
        })
        .catch(function (err){ errors(err)});

}



//modal

modalBtn.forEach(function (e) {
    e.addEventListener('click', openModal);
})

function openModal() {
    modal.style.display = "block";
    document.children[0].classList.add("removeScroll");
}

function closeModal() {
    modal.style.display = "none";
    document.children[0].classList.remove("removeScroll");
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = "none";
        document.children[0].classList.remove("removeScroll");
    }
}

//email validation 

const validateEmail = function (email)  {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

if (email) {
    const emails = document.getElementById('email');
    const text = document.createElement('span');
    container.append(text);

    btn.addEventListener('click', function () {
        if (validateEmail(email.value)) {
            clearInput();
            location.reload();
        } else {
            text.innerText = "Invalid email";
            text.className = "emailerror";
            emails.classList.add('emailborder');
            emails.addEventListener('focus', function () {
                emails.classList.add('emailremove');
                text.innerText = "";
            })
        }
    })
}

const clearInput = function () {
    alert("Subscribe Success");
    document.getElementById('signup').reset();
}