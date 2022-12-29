window.addEventListener('DOMContentLoaded', function () {
  const sliderMain = document.querySelector('.slider-main');
  const sliderItems = document.querySelectorAll('.slider-item');
  const dotItem = document.querySelectorAll('.dot-item');
  const tabItem = document.querySelectorAll('.tab-item');
  const tabWrapper = document.querySelectorAll('.tab-wrapper');
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

  function showAndRemoveToolTip() {
    const boxIcons = document.querySelectorAll('.box-icon');
    [...boxIcons].forEach((box) => {
      [...box.children].forEach((item) => {
        item.addEventListener('mouseenter', function (e) {
          const tooltip = toolTip(e);
          tooltip.classList.add('active');
        });
        item.addEventListener('mouseleave', function (e) {
          const tooltip = toolTip(e);
          tooltip.classList.remove('active');
        });
      });
    });
  }

  function toolTip(e) {
    const icons = ['heart', 'shuffle', 'eye'];
    let icon = '';
    const cln = e.target.className;
    icons.forEach((i) => {
      if (cln.includes(i)) icon = i;
    });
    const tooltip = getParentNodeByClass(e.target, 'catalog').querySelector(`.tooltip-item-${icon}`);
    return tooltip;
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

  sliderImage();
  showAndRemoveToolTip();
  changeTab();
});
