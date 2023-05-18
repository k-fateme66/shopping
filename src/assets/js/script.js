
//Js Fix header
export function fixHeader() {
    document.addEventListener("scroll", function () {
        let scrollpos = window.scrollY
        const scrollChange = 1
        const header = document.querySelector('header.fixed');
        if (scrollpos >= scrollChange) { header.classList.add('header-fixed') }
        else { header.classList.remove('header-fixed') }
    });
}

