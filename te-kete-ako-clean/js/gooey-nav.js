document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.classList.add('gooey-nav');
        const navItems = nav.querySelectorAll('a');
        navItems.forEach(item => {
            item.classList.add('gooey-nav-item');
        });
    }
});
