!function(){var e={form:document.querySelector(".form"),button:document.querySelector('button[type="submit"]'),delay:document.querySelector('input[name="delay"]'),step:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]')};function t(e,t){return new Promise((function(n,o){var u=Math.random()>.3;timerId=setTimeout((function(){u?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}e.form.addEventListener("submit",(function(n){var o=0,u=0;n.preventDefault();var r=Number(e.amount.value),a=(Number(e.step.value),Number(e.delay.value));for(;o<r;o+=1)t(u+=1,a).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}));u=0,o=0}))}();
//# sourceMappingURL=03-promises.f358f9a1.js.map
