import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onSumbit);

function onSumbit(event) {
  event.preventDefault();
  let delayVal = Number(refs.delay.value);
  const stepVal = Number(refs.step.value);
  const amountVal = Number(refs.amount.value);
  
  for (let position = 1; position <= amountVal; position += 1){
    delayVal += position === 1 ? 0 : stepVal;
    createPromise({ position, delayVal })
     
      .then(onSucces)
      .catch(onError);
   }
}

function createPromise({ position, delayVal }) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayVal });
      } else {
        reject({ position, delayVal })
      }
    }, delayVal)
  )};

function onSucces({ position, delayVal }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delayVal}ms`);
}

function onError({ position, delayVal }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delayVal}ms`);
}
