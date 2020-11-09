function createSlider(container) {
    console.log(container);
    let currentIndex = 0;
    let pagination = null;
    const sliderItems = container.querySelectorAll('.slider-item');
    const sliderItemsCount = sliderItems.length;
    const slideWidth = container.clientWidth;
    const sliderTrack = document.createElement('div');
    sliderTrack.classList.add('slider-track');
    const sliderTrackWidth = sliderItemsCount * slideWidth;
    sliderTrack.style.width = sliderTrackWidth + 'px';


    sliderItems.forEach(function (slideItem) {
        sliderTrack.append(slideItem);
    });
    container.append(sliderTrack);

    createArrows();
    createPagination();

    function goToSlide(index) {
        // const newCurrentIndex = index < 0
        //     ? sliderItemsCount - 1
        //     : index >= sliderItemsCount
        //         ? 0
        //         : index;
        const newCurrentIndex = index;
        if (index < 0) {

            return sliderItemsCount - 1;
        } else if (index >= sliderItemsCount) {
            // if (0) {
            //     return index;
            // }
            return sliderItemsCount - 1;
        }

        currentIndex = newCurrentIndex;
        sliderTrack.style.transform = 'translateX('+ (-slideWidth * newCurrentIndex) + 'px)';
    }

    function createArrows() {
        const leftArrow = document.createElement('div');
        const rightArrow = document.createElement('div');
        leftArrow.className = 'arrow slider-button-prev';
        rightArrow.className = 'arrow slider-button-next';

        container.append(leftArrow);
        container.append(rightArrow);

        leftArrow.addEventListener('click', function () {
            goToSlide(currentIndex - 1);
            if (currentIndex <= 0) {
                let clone = container.lastChild.cloneNode(true);
                goToSlide(clone);
                setTimeout(8 + 's',currentIndex = sliderItemsCount);
            }
        });

        rightArrow.addEventListener('click', function () {
            goToSlide(currentIndex + 1);
            if (currentIndex > sliderItemsCount) {
                let clone2 = container.firstChild.cloneNode(true);
                goToSlide(clone2);
                setTimeout(currentIndex = 0,10);
            }
        });
    }
    
    function createPagination() {
        const pagination = document.createElement('div');
        pagination.className = 'dots';

        for (let i = 0; i < sliderItemsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dots-item';

            if (i === currentIndex) {
                dot.classList.toggle('active', true);
            } else {
                dot.classList.toggle('active', false);
            }

            dot.setAttribute('data-index', i);
            pagination.append(dot);
        }

        pagination.addEventListener('click', function (event) {
            let dot = event.target.closest('.slider-dots-item');
            let newCurrentIndex = Number(dot.getAttribute('data-index'));

            // container.querySelectorAll('.slider-dots-item').classList.toggle('active', false);
            // if (value('data-index') === newCurrentIndex) {
            //     dot.classList.add('active');
            // }


            if (dot) {
                dot.classList.toggle('active', true);
                dot.nextElementSibling.classList.toggle('active', false);
                dot.previousElementSibling.classList.toggle('active', false);

                goToSlide(newCurrentIndex);
            }
        });



        container.append(pagination);
    }
}

createSlider(document.querySelector('.slider'));