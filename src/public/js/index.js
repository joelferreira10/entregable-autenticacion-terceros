console.log("hola mundo");
console.log("hola mundo");

const btnLogout=document.getElementById('logout')
btnLogout.addEventListener('click',()=>{
    fetch('users/logout', {
          method: 'POST',
          credentials: 'same-origin' 
        })
        .then(() => {
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
})
