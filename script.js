document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const states = [
        'Texas', 'Utah', 'New York', 'California', 'Kansas', 'Florida', 'Maryland', 'Arizona', 'Oregon', 'Washington', 'Idaho', 'South Dakota', 'Oklahoma', 'Illinois', 'Alaska', 'Colorado', 'Connecticut', 'Kentucky', 'Louisiana',  'Pennsylvania', 'Maine', 'Nebraska', 'Missouri', 'Arkansas', 'Alabama', 'Georgia', 'New Mexico', 'North Carolina', 'Virginia', 'Mississippi', 'Delaware', 'Rhode Island', 'Vermont', 'Michigan', 'Ohio', 'Massachusetts', 'Minnesota', 'Hawaii', 'Indiana', 'Iowa',  'Montana', 'Wyoming', 'Nevada', 'New Hampshire', 'New Jersey', 'Wisconsin', 'North Dakota', 'South Carolina', 'Tennessee', 'West Virginia'];
    const changingState = document.getElementById('changing-state');
    let currentIndex = 0;

    function changeState() {
        changingState.textContent = states[currentIndex];
        currentIndex = (currentIndex + 1) % states.length;
    }

    // Initial call
    changeState();

    // Change state every 4 seconds (matching the CSS animation duration)
    setInterval(changeState, 2000);
});