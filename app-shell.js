const screens = Array.from(document.querySelectorAll('.screen'));

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isTarget = screen.dataset.screen === screenName;
    screen.classList.toggle('is-active', isTarget);
    screen.setAttribute('aria-hidden', String(!isTarget));
  });

  const activeHeading = document.querySelector('.screen.is-active h1, .screen.is-active h2');
  if (activeHeading) {
    activeHeading.setAttribute('tabindex', '-1');
    activeHeading.focus();
    activeHeading.addEventListener(
      'blur',
      () => {
        activeHeading.removeAttribute('tabindex');
      },
      { once: true }
    );
  }
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const destination = target.dataset.goTo;
  if (!destination) {
    return;
  }

  showScreen(destination);
});

showScreen('landing');
