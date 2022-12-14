function SearchResult({
  $target,
  initialData,
  onDetailClick,
  onIntersectingLastImage,
}) {
  const container = document.createElement('ul');
  container.className = 'SearchResult';
  $target.appendChild(container);

  this.state = {
    data: initialData,
  };
  this.setState = (action, nextData) => {
    console.log('SearchResult #setState', {
      action,
      data: this.state.data,
      nextData,
    });
    switch (action) {
      case 'data':
        this.state.data = nextData;
        this.render();
        break;
      case 'append':
        // this.state.data = nextData;
        this.appendRender(nextData);
        break;
      default:
        break;
    }
  };

  container.addEventListener('click', (e) => {
    const { target } = e;
    const { index } = target.closest('.item').dataset;
    onDetailClick(index);
  });

  this.lazyLoading = function () {
    var lazyloadImages;
    if ('IntersectionObserver' in window) {
      // IntersectionObserver를 지원하는 경우
      lazyloadImages = document.querySelectorAll('.lazy');
      var imageObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      // IntersectionObserver를 지원하지 않는 경우
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll('.lazy');

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
            window.removeEventListener('orientationChange', lazyload);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
      window.addEventListener('orientationChange', lazyload);
    }
  };

  this.intersectionTimerId = null;
  this.infiniteLoading = () => {
    if ('IntersectionObserver' in window) {
      // IntersectionObserver를 지원하는 경우
      const lastImage = container.querySelector('.item:last-child');
      // 옵저버 인스턴스 생성
      const imageObserver = new IntersectionObserver((entries, observer) => {
        // 요소에 대한 intersecting 확인
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            imageObserver.unobserve(image);
            onIntersectingLastImage();
          }
        });
      });

      // 옵저버에 요소 등록
      lastImage && imageObserver.observe(lastImage);
    }
  };

  this.appendRender = (appendData) => {
    console.log('appendRender SearchResult', { appendData });
    const lastIndex = container.childElementCount;
    container.innerHTML += appendData
      .map((cat, index) => {
        return `
            <li class="item" data-index="${index + lastIndex}">
              <img class="lazy" data-src='${cat.url}' alt='${cat.name}'>
              <div>${cat.name}</div>
            </li>
          `;
      })
      .join('');
    this.lazyLoading();
    if (!this.intersectionTimerId) {
      this.intersectionTimerId = setTimeout(() => {
        this.infiniteLoading();
        this.intersectionTimerId = null;
      }, 2000);
    }
  };

  this.render = () => {
    if (this.state.data.length > 0) {
      container.innerHTML = this.state.data
        .map((cat, index) => {
          return `
            <li class="item" data-index="${index}">
              <img class="lazy" data-src='${cat.url}' alt='${cat.name}'>
              <div>${cat.name}</div>
            </li>
          `;
        })
        .join('');
    } else {
      container.innerHTML = `
        <div>No Cats...|\`</div>
      `;
    }
    this.lazyLoading();
    this.infiniteLoading();
    console.log('render SearhResult', { data: this.state.data });
  };
  console.log('init SearhResult', { data: this.state.data });
}
export default SearchResult;
