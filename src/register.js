// regist SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/dist/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

    reg.update();

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}