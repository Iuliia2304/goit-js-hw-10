import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
     event.preventDefault();

     const formData = new FormData(form);
     const delay = Number(formData.get("delay"));
     
     const state = formData.get("state");
     
     createPromise(delay, state)
     .then((delay) => {
          iziToast.success({
               title: '✅ Fulfilled',
               message: `Fulfilled promise in ${delay}ms`,
               position: 'topRight',
          });
     })
     .catch((delay) => {
          iziToast.error({
               title: '❌ Rejected',
               message: `Rejected promise in ${delay}ms`,
               position: 'topRight',
          });
     });
});


function createPromise(delay, state) {
     return new Promise((resolve, reject) => {
          setTimeout(() => {
               
               if (state === 'fulfilled') {
                    resolve(delay);
               } else {
                    reject(delay);
               }
          }, delay);
     });
     
}
