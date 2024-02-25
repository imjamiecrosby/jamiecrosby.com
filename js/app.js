
import emailjs from '@emailjs/browser';
import Sticky from 'sticky-js';
import LazyLoad from "vanilla-lazyload";
import GLightbox from 'glightbox';



// Modal Popup

const overlay = document.querySelector('.md-overlay');
const trigger = document.querySelector('.md-trigger');
const modal = document.querySelector('.md-modal');
const close = document.querySelector('.md-close');


trigger.addEventListener('click', function(ev) {
    modal.classList.add('md-show');
    overlay.addEventListener('click',removeModal);
});

close.addEventListener( 'click', function(ev)  {
    ev.stopPropagation();
    removeModal();
});

function removeModal() {
    modal.classList.remove('md-show')
}



// Form

(function() {
    emailjs.init("Yuql5RNtZIYVmFhGz");
})();

//  Getting elements
const form = document.getElementById('contact_form');
const userName = document.getElementById('user_name').value;
const userEmail = document.getElementById('user_email').value;
const userMessage = document.getElementById('user_message').value;
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false

const templateParams = {
    name: userName,
    email: userEmail,
    message: userMessage,
}

function validateForm() {
    // Using Contraint API
    isValid = form.checkValidity();
    // Style main message for an error
    if(isValid === false) {
        message.textContent ="Please fil out all the fields";
        message.style.color = 'red';
    } else if(isValid === true) {
        message.textContent ="Your message is being sent";
    }
}

 function processFormData(e) {
    e.preventDefault()
    
    // Validating form 
    validateForm();

    // Sending the formdata
    if(isValid === true) {
    emailjs.send('service_luspkml', 'contact_form', templateParams)
    .then(function(response){
        message.textContent ="Thank you very much we will reply to you as soon as possible";
        message.style.color = 'green';
        console.log('SUCCES', response.status, response.text);
    }, function(error){
        console.log("FAILED", error);
    })
    }
 }
 
 //  Add eventlisteners
form.addEventListener('submit', processFormData);



// Sticky Titles

var sticky = new Sticky('[data-sticky]');



// Lazy Loader

var lazyLoadInstance = new LazyLoad({
    use_native: true
});



// Lightbox

const lightbox = GLightbox({
    touchNavigation: true,
    width: 1400,
    height: 900,
});
 