import { Notify } from 'notiflix/build/notiflix-notify-aio';

// DOM LINKS
const formElement = document.querySelector('.form');
const delayElement = document.querySelector('input[name="delay"]');
const stepElement = document.querySelector('input[name="step"]');
const amountElement = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let delayValue = Number(delayElement.value);

  for (let i = 1; i <= amountElement.value; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += Number(stepElement.value);
  }
}

formElement.addEventListener('submit', handleSubmit);
