function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function closeSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


const navList = document.querySelector('.navList');
const yPoint = 170;
const navText = document.querySelectorAll('.navList li a');
const greenLogo = document.querySelector('#logo-green');
const whiteLogo = document.querySelector('#logo-white');


window.addEventListener('scroll', () => {
  if (window.scrollY > yPoint) {
    navList.style.backgroundColor = 'white';
    navList.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.4)';
    navText.forEach(navText => {
        navText.style.color = '#344e41';
        navText.style.borderColor = '#344e41';
      });
      greenLogo.style.opacity = '1';
      whiteLogo.style.opacity = '0';


  } else {
    navList.style.backgroundColor = '';
    navList.style.boxShadow = '';
    navText.forEach(navText => {
        navText.style.color = '';
        navText.style.borderColor = '';
      });
      greenLogo.style.opacity = '';
      whiteLogo.style.opacity = '1';
  }
});
