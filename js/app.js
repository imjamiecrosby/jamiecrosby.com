
import { gsap } from "gsap";
import emailjs from '@emailjs/browser';
import Sticky from 'sticky-js';
import LazyLoad from "vanilla-lazyload";
import GLightbox from 'glightbox';


// Me Animation

gsap.registerPlugin(MotionPathPlugin,DrawSVGPlugin) 

var tl = gsap.timeline();
tl.from(".animate.circle", { duration: 0.75, drawSVG: 0, ease: "power3.out"}, 0.5);   
tl.from(".animate.m", { duration: 0.5, drawSVG: 0, ease: "power3.inout"}, 1.25);   
tl.from(".animate.e", { duration: 0.5, drawSVG: 0 }, 2);   


let paths = splitPaths(".me-arrow");
let duration = 1,
    distance = 0;
paths.forEach(segment => distance += segment.getTotalLength());
paths.forEach(segment => {
  tl.from(segment, {
    drawSVG: 0,
    ease: "power3.out",
    duration: duration * (segment.getTotalLength() / distance)
  });
});

function splitPaths(paths) {
  let toSplit = gsap.utils.toArray(paths),
      newPaths = [];
  if (toSplit.length > 1) {
    toSplit.forEach(path => newPaths.push(...splitPaths(path)));
  } else {
    let path = toSplit[0],
        rawPath = MotionPathPlugin.getRawPath(path),
        parent = path.parentNode,
        attributes = [].slice.call(path.attributes);
    newPaths = rawPath.map(segment => {
      let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          i = attributes.length;
      while (i--) {
        newPath.setAttributeNS(null, attributes[i].nodeName, attributes[i].nodeValue);
      }
      newPath.setAttributeNS(null, "d", "M" + segment[0] + "," + segment[1] + "C" + segment.slice(2).join(",") + (segment.closed ? "z" : ""));
      parent.insertBefore(newPath, path);
      return newPath;
    });
    parent.removeChild(path);
  }
  return newPaths;
}


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
        messageContainer.style.borderColor = 'red';
    } else if(isValid === true) {
        message.textContent ="Your message is being sent";
        message.style.color = 'Orange';
        messageContainer.style.borderColor = 'Orange';
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
        messageContainer.style.borderColor = 'green';
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
});
 