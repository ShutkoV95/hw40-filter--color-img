const imgPath = './img/cars';
const slidesObj = [
    {img: 'car1.jfif', color: 'red'},
    {img: 'car2.jfif', color: 'orange'},
    {img: 'car3.jfif', color: 'black'},
    {img: 'car4.jfif', color: 'red'},
    {img: 'car5.jfif', color: 'blue'},
    {img: 'car6.jpg', color: 'red'},
];

let slidesFilterObj = slidesObj.filter(function(car) {
    return car;
});

let slidesCount = slidesObj.length;
const colors = uniqItemsArr(slidesObj);

let doc = document;
let btnPrev, btnNext, slides, dots;

let currentSlide = 1;

render();

function render() {
    const sliderEl = doc.querySelector('.slider');
    let sliderHtml = '';
    const slidesHtml = slidesFilterObj.map(function(slide) {
        return `
            <div class="slide">
                <img class="slide-img" src="${imgPath}/${slide.img}" alt="">
                <span class="slide-color" style="background: ${slide.color}"></span>
            </div>
        `;
    }).join('');
    const dotsHtml = slidesFilterObj.map(function() {
        return `<button class="dot"></button>`;
    }).join('');

    sliderHtml = `
        <div class="slides">${slidesHtml}</div>
        <div class="sliderBtns">
            <button class="btn btn-prev">prev</button>
            <button class="btn btn-next">next</button>
        </div>
        <div class="sliders-dots">${dotsHtml}</div>
    `;

    sliderEl.innerHTML = sliderHtml;

    btnPrev = doc.querySelector('.btn-prev');
    btnNext = doc.querySelector('.btn-next');
    slides = doc.querySelectorAll('.slide');
    dots = doc.querySelectorAll('.dot');

    // render elements
    slidesCount = slidesFilterObj.length;
    currentSlide = 1;

    showSlide(currentSlide);
    switchDot(currentSlide);
    
    dots.forEach(function(dot) {
        dot.onclick = function() {
            setActiveDot(this);
            currentSlide = getIndex(this) + 1;
            showSlide(currentSlide);
        }
    });
    
    slides.forEach(function(slide) {
        slide.onclick = function() {
            const img = this.innerHTML;
            console.log(img);
        }
    }) 
    
    btnPrev.onclick = function() {
        prevSlide();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }
    btnNext.onclick = function() {
        nextSlide();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }

    // create btns
    const btnsParentEl = doc.createElement('div');
    btnsParentEl.className = 'filter-btns';
    sliderEl.prepend(btnsParentEl);

    const btnAll = doc.createElement('button');
    btnAll.className='btn-filter';
    btnAll.innerText = 'all';
    btnAll.style.backgroundColor = 'silver';
    btnsParentEl.append(btnAll);

    btnAll.onclick = function() {
        slidesFilterObj = slidesObj.filter(function(car) {
            return car;
        });
        render();
    }

    colors.forEach(function(color) {
        const btn = doc.createElement('button');
        btn.className='btn-filter';
        btn.innerText = color;
        btn.style.backgroundColor = color;
        btnsParentEl.append(btn);

        btn.onclick = function() {
            const color = this.innerText;
            slidesFilterObj = slidesObj.filter(function(car) {
                return car.color == color;
            });
            render();
        }
    });
}

function getIndex(context) {
    let dotIndex = 0;
    dots.forEach(function(dot, index) {
        if (dot.classList.contains('dot-active')) {
            dotIndex = index;
        }
    });
    return dotIndex;
}

function switchDot(curSlide) {
    dots.forEach(function(item) {
        item.classList.remove('dot-active');
    });
    dots[curSlide - 1].classList.add('dot-active');
}

function setActiveDot(currentDot) {
    dots.forEach(function(item) {
        item.classList.remove('dot-active');
    });
    currentDot.classList.add('dot-active');
}

function showSlide(currSlide) {
    slides.forEach(function(slide) {
        slide.classList.remove('slide-active');
    });
    slides[currSlide - 1].classList.add('slide-active');
}

function prevSlide() {
    currentSlide --;
    if (currentSlide < 1) {
        currentSlide = slidesCount;
    }
}

function nextSlide() {
    currentSlide ++;
    if (currentSlide > slidesCount) {
        currentSlide = 1;
    }
}

function uniqItemsArr(arrObj) {
    const items = [];
    arrObj.forEach(function (car) {
        if (!items.includes(car.color)) {
            items.push(car.color);
        }
    });
    return items;
}
