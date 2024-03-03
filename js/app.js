
import LazyLoad from "vanilla-lazyload";
import fslightbox from "fslightbox";
import emailjs from '@emailjs/browser';
import Sticky from 'sticky-js';
import lottie from 'lottie-web';


if (window.location.pathname=='/') {




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
    const form = document.getElementById('contact_form');
    const messageContainer = document.querySelector('.message-container');
    const message = document.getElementById('message');
    let isValid = false
    function validateForm() {
        isValid = form.checkValidity();
        if(isValid === false) {
            message.textContent ="Please fil out all the fields";
            message.style.color = 'red';
        } else if(isValid === true) {
            message.textContent ="Your message is being sent";
        }
    }
    function processFormData(e) {
        e.preventDefault()
        validateForm();
        if(isValid === true) {
            emailjs.sendForm('service_luspkml', 'template_hgzch5j', this)
                .then(function(response){
                    message.textContent ="Thank you very much we will reply to you as soon as possible";
                    message.style.color = 'green';
                    console.log('SUCCES', response.status, response.text);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        }
    }
    form.addEventListener('submit', processFormData);



    // Sticky Titles

    var sticky = new Sticky('[data-sticky]');



    // Lottie

    lottie.loadAnimation({
        container: document.getElementById('lottie-container'), 
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'files/benchmarks.json',
        scaleMode: 'noScale',
        
    });

}




// Lazy Loader

var lazyLoadInstance = new LazyLoad({
    use_native: true
});



// Scroll to Top

function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

document.addEventListener("scroll", handleScroll);
var scrollToTopBtn = document.querySelector(".scroll-to-top");

function handleScroll() {
    var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var GOLDEN_RATIO = 0.5;

    if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
        fadeIn(scrollToTopBtn)

    } else {
        fadeOut(scrollToTopBtn)
    }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
}











 