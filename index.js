const container = document.querySelector(".mgi_projects_container")
const clientsContainer = document.querySelector(".mgi_clients_container")
const projects = document.querySelector(".mgi_projects_wrapper")
const clients = document.querySelector(".mgi_clients_wrapper")
const item = document.querySelectorAll(".mgi_projects_item")
const clientItem = document.querySelectorAll(".mgi_clients_item")
const btnLeft = document.getElementById("btn-left--carousel")
const btnRight = document.getElementById("btn-right--carousel")
const news = document.querySelector('.mgi_news_wrapper')
const newsItem = document.querySelectorAll(".mgi_news_item")

let radios = document.forms["form"].elements["screen_size"]
let body = document.getElementsByTagName("BODY")[0]

var media920 = window.matchMedia('(min-width: 920px)')
var media768 = window.matchMedia('(min-width: 768px)')
let iterate4items = 0;
let iterate3items = 0;
document.addEventListener('DOMContentLoaded', function () {
    for (radio in radios) {
        radios[radio].onclick = function () {
            body.removeAttribute("class")
            body.classList.add(`${this.value}-view`)
            if (this.value === "mobile") {
                slider(1)
            }
        }
    }
    window.addEventListener('resize', function () {
        observeBodyWidth()
    });
    function observeBodyWidth() {
        iterate3items = 0
        iterate4items = 0
        if (window.innerWidth >= 920 && body.offsetWidth >= 920) {
            slider(4);
        } else if (window.innerWidth > 768 && body.offsetWidth > 768) {
            slider(2);
            body.style.marginLeft = null
        } else {
            slider(1);
        }
    }
    new ResizeObserver(observeBodyWidth).observe(body)

    if (media920.matches) {
        slider(4);
    } else if (media768.matches) {
        slider(2);
    } else {
        slider(1);
    }
    carousel()
})



function carousel() {
    let displayItem;
    let clientDisplayItem;
    if (media920.matches && body.offsetWidth >= 920) {
        displayItem = 4
        clientDisplayItem = 3
    }
    else if (media768.matches && body.offsetWidth > 768) {
        displayItem = 2
        clientDisplayItem = 3
    }
    else {
        displayItem = 1
        clientDisplayItem = 1
    }
    const itemWidth = container.offsetWidth / displayItem
    const threeItemWidth = container.offsetWidth / clientDisplayItem
    iterate4items += itemWidth
    iterate3items += threeItemWidth
    let widthAllBox = itemWidth * item.length
    let widthAllItem = threeItemWidth * clientItem.length
    let spacing = widthAllBox - itemWidth * displayItem
    let clientSpacing = widthAllItem - threeItemWidth * clientDisplayItem
    if (iterate4items > spacing) {
        iterate4items = 0
    }
    if (iterate3items > clientSpacing) {
        iterate3items = 0
    }
    projects.style.transform = `translateX(${-iterate4items}px)`
    clients.style.transform = `translateX(${-iterate3items}px)`
    news.style.transform = `translateX(${-iterate3items}px)`
    setTimeout(carousel, 3000)
}
function slider(itemDisplay) {
    let iterate4itemsClone = iterate4items
    let threeItemDisplay
    if (itemDisplay > 1 && itemDisplay <= 4) {
        threeItemDisplay = 3
    } else {
        threeItemDisplay = 1
    }
    const itemWidth = container.offsetWidth / itemDisplay
    const threeItemWidth = container.offsetWidth / threeItemDisplay
    let widthAllBox = itemWidth * item.length
    let widthAllItem = threeItemWidth * clientItem.length

    projects.style.width = `${widthAllBox}px`
    clients.style.width = `${widthAllItem}px`
    news.style.width = `${widthAllItem}px`
    item.forEach(element => {
        element.style.marginRight = '20px'
        element.style.width = `${itemWidth - 20}px`
    })
    clientItem.forEach(element => {
        element.style.marginRight = '20px'
        element.style.width = `${threeItemWidth - 20}px`
    })
    newsItem.forEach(element => {
        element.style.marginRight = '20px'
        element.style.width = `${threeItemWidth - 20}px`
    })
    let spacing = widthAllBox - itemWidth * itemDisplay
    projects.style.transform = `translateX(0px)`;
    clients.style.transform = `translateX(0px)`;
    news.style.transform = `translateX(0px)`;
    btnLeft.addEventListener('click', function () {
        iterate4itemsClone -= itemWidth
        if (iterate4itemsClone < 0) {
            iterate4itemsClone = spacing
        }
        projects.style.transform = `translateX(${-iterate4itemsClone}px)`
        iterate4items = iterate4itemsClone
    })
    btnRight.addEventListener('click', function () {
        iterate4itemsClone += itemWidth
        if (iterate4itemsClone > spacing) {
            iterate4itemsClone = 0
        }
        projects.style.transform = `translateX(${-iterate4itemsClone}px)`
        iterate4items = iterate4itemsClone
    })
}

let slideIndex = 1
showSlide(slideIndex);
document.getElementById("btn-left").addEventListener('click', change)
document.getElementById("btn-right").addEventListener('click', change)
document.querySelectorAll(".dot").forEach(item => {
    item.addEventListener('click', currentDiv)
})

function change() {
    slideIndex = slideIndex + parseInt(this.value)
    showSlide(slideIndex)
}
function currentDiv() {
    showSlide(slideIndex = parseInt(this.value))
}
function showSlide(slideNumber) {
    let sliderWrapper = document.getElementsByClassName("mgi_slider_wrapper")
    var dots = document.getElementsByClassName("dot");
    if (slideNumber > sliderWrapper.length) {
        slideIndex = 1
    }
    else if (slideNumber < 1) {
        slideIndex = sliderWrapper.length
    }
    for (let i = 0; i < sliderWrapper.length; i++) {
        sliderWrapper[i].style.display = "none"
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" white", "");
    }
    sliderWrapper[slideIndex - 1].style.display = "flex"
    dots[slideIndex - 1].className += " white";
}

window.onscroll = function () {
    if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    ) {
        document.getElementById("navbar").classList.add("navbar--scrolled");
    } else {
        document
            .getElementById("navbar")
            .classList.remove("navbar--scrolled");
    }
};
document.getElementById("hamburger").addEventListener("click", expand);
function expand() {
    body.classList.toggle("expand");
    document.getElementById("navbar-menu").classList.add('sidebar-expand')
}
document.addEventListener('click', hideNavbar)
function hideNavbar(event) {
    event.stopPropagation();
    if (event.clientX > document.getElementById("navbar-menu").offsetWidth) {
        document.getElementById("navbar-menu").classList.remove('sidebar-expand')
        body.classList.remove("expand");
        body.style.marginLeft = null
    }
}

document.getElementById("slider").addEventListener("mouseover", btnAnimation)
document.getElementById("slider").addEventListener("mouseout", btnAnimation)

function btnAnimation(event) {
    let leftBtn = document.getElementById("btn-left")
    let rightBtn = document.getElementById("btn-right")

    leftBtn.classList.remove("btn--left")
    rightBtn.classList.remove("btn--right")
    if (event.type === "mouseover") {
        leftBtn.classList.add("btn--left")
        rightBtn.classList.add("btn--right")
    }
}

servicesWrapper = document.querySelector('.mgi_services_wrapper')
servicesFeatures = document.querySelectorAll('.mgi_services_feature')
const servicesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            for (let i = 0; i < servicesFeatures.length; i++) {
                servicesFeatures[i].classList.add('fade-up', `delay${i + 1}`)
            }
            return
        }
    })
})
const contactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelector('.mgi_help_caption').classList.add("fade-in-right")
            document.querySelector('.mgi_btn--black').classList.add('fade-in-left')
            return
        }
    })
})
servicesObserver.observe(servicesWrapper)
contactObserver.observe(document.querySelector('.mgi_help_container'))