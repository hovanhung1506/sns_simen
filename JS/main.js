window.addEventListener('DOMContentLoaded', function () {
  const sliderMain = document.querySelector('.slider-main');
  const sliderItems = document.querySelectorAll('.slider-item');
  const dotItem = document.querySelectorAll('.dot-item');
  const tabItem = document.querySelectorAll('.tab-item');
  const tabWrapper = document.querySelectorAll('.tab-wrapper');
  const btnLoadMore = document.querySelector('.btn-loadmore');
  let i = 0;
  function sliderImage() {
    setInterval(() => {
      if (i == sliderItems.length - 1) {
        i = 0;
        sliderMain.scrollLeft = 0;
        dotItem[sliderItems.length - 1].classList.remove('active');
        dotItem[i].classList.add('active');
      } else {
        sliderMain.scrollLeft += sliderItems[i].offsetWidth;
        dotItem[i].classList.remove('active');
        dotItem[i + 1].classList.add('active');
        i++;
      }
    }, 3000);
  }

  function getParentNodeByClass(childrenNode, parentClass) {
    while (1) {
      if (childrenNode === document.body) return null;
      if (childrenNode.className.includes(parentClass)) return childrenNode;
      else childrenNode = childrenNode.parentNode;
    }
  }

  function changeTab() {
    [...tabItem].forEach((tab) => {
      tab.addEventListener('click', function (e) {
        [...tabItem].forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');

        const currentTab = tab.dataset.tab;
        [...tabWrapper].forEach((tabw) => {
          tabw.classList.remove('active');
          if (tabw.dataset.tab === currentTab) {
            tabw.classList.add('active');
            const tabContent = tabw.querySelectorAll('.tab-content');
            [...tabContent].forEach((item) => {
              item.style.transform = 'scale(0)';
            });

            setTimeout(() => {
              [...tabContent].forEach((item) => {
                item.style.transform = 'scale(1)';
              });
            }, 0);
          }
        });
      });
    });
  }

  function loadMore() {
    const template = (value) => {
      const random = Math.ceil(Math.random() * 8);
      return `
      <div class="tab-content" style="--value: ${value}">
        <div class="catalog">
            <div class="sale-on">
                <a href="#">
                    <img src="./image/product/chair_${random}.jpg" alt="" class="catalog-image">
                    ${random % 2 === 0 ? '' : '<span class="sale">SALE!</span>'}
                </a>
            </div>
            <form action="#" class="from-add-cart">
              <button type="submit">
                  <i class="fa-solid fa-cart-shopping"></i>&nbsp;
                  <span>ADD TO CART</span>
              </button>
              <div class="box-icon">
                  <span class="icon-heart">
                      <i class="fa-solid fa-heart"></i>
                      <span class="tooltip-text">Add to Wishlist</span>
                  </span>
                  <span class="icon-shuffle">
                      <i class="fa-solid fa-shuffle"></i>
                      <span class="tooltip-text">Compare</span>
                  </span>
                  <span class="icon-eye">
                      <i class="fa-solid fa-eye"></i>
                      <span class="tooltip-text">Quick View</span>
                  </span>
              </div>
          </form>
        </div>
        <div class="product-content">
            <p class="product-title">Modular Modern</p>
            <div class="price">
                ${
                  random % 2 === 0
                    ? ''
                    : `<span class="sale-price">$ &nbsp;${Math.floor(
                        Math.random() * (15 - 10) + 10
                      )}.00</span>`
                }
                <span class="current-price">$ &nbsp;${
                  random % 2 === 0
                    ? Math.floor(Math.random() * (20 - 10) + 10)
                    : Math.floor(Math.random() * (8 - 1) + 1)
                }.00</span>
            </div>
            <div class="start-rating">
                ${
                  random % 2 === 0
                    ? `<img src="./image/logo/star-rating.png" class="star-yellow" alt="">
                <img src="./image/logo/star-rating.png" class="star-yellow" alt="">
                <img src="./image/logo/star-rating.png" class="star-yellow" alt="">
                <img src="./image/logo/star-rating.png" class="star-yellow" alt="">
                <img src="./image/logo/star-gray.png" class="star-gray" alt="">`
                    : `<img src="./image/logo/star-gray.png" class="star-gray" alt="">
                <img src="./image/logo/star-gray.png" class="star-gray" alt="">
                <img src="./image/logo/star-gray.png" class="star-gray" alt="">
                <img src="./image/logo/star-gray.png" class="star-gray" alt="">
                <img src="./image/logo/star-gray.png" class="star-gray" alt="">`
                }
            </div>
        </div>
    </div>
      `;
    };
    btnLoadMore.addEventListener('click', () => {
      const btnText = document.querySelector('.btn-text');
      const btnSpinner = document.querySelector('.btn-spinner');
      const tabList = getParentNodeByClass(btnLoadMore, 'container').querySelectorAll('.tab-wrapper');
      let tabActive = null;
      [...tabList].forEach((tab) => {
        if (tab.className.includes('active')) {
          tabActive = tab;
        }
      });
      btnText.style.opacity = 0;
      btnSpinner.style.display = 'block';
      setTimeout(() => {
        btnSpinner.style.display = 'none';
        btnText.style.opacity = 1;
        for (let i = 1; i <= 5; i++) {
          tabActive.insertAdjacentHTML('beforeend', template(i));
        }
        const tabContents = tabActive.querySelectorAll('.tab-content');
        let startIndex = tabContents.length % 5 == 0 ? tabContents.length - 5 : tabContents.length % 5;
        for (let i = startIndex; i < tabContents.length; i++) {
          tabContents[i].style.transform = 'scale(0)';
        }
        setTimeout(() => {
          for (let i = startIndex; i < tabContents.length; i++) {
            tabContents[i].style.transform = 'scale(1)';
          }
        }, 0);
      }, 2000);
    });
  }

  sliderImage();
  changeTab();
  loadMore();
});
