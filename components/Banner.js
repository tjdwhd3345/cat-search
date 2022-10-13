function Banner({ $target }) {
  const wrapper = document.createElement('article');
  wrapper.className = 'Banner';
  const container = document.createElement('div');
  container.className = 'container';
  wrapper.appendChild(container);
  $target.appendChild(wrapper);
  const prevButton = document.createElement('button');
  prevButton.className = 'prev';
  prevButton.innerText = '<'; // `<button class="prev">&lt;</button>`;
  const nextButton = document.createElement('button');
  nextButton.className = 'next';
  nextButton.innerText = '>'; //`<button class="next">&gt;</button>`;

  this.state = {
    bannerData: [],
  };
  this.setState = (nextData) => {
    this.state.bannerData = nextData;
    this.render(0);
  };

  const handleClick = (e) => {
    const type = e.target.className;
    const firstImg = container
      .querySelector('.item:first-child')
      .querySelector('img');
    const { index } = firstImg.dataset;
    let offset = 0;
    if (type === 'next') {
      offset = parseInt(index, 10) + 5;
      offset = offset >= this.state.bannerData.length ? 0 : offset;
      container.classList.add('rightToLeft');
      container.classList.remove('leftToRight');
    } else if (type === 'prev') {
      offset = parseInt(index, 10) - 5;
      offset = offset < 0 ? this.state.bannerData.length - 5 : offset;
      container.classList.add('leftToRight');
      container.classList.remove('rightToLeft');
    }
    this.render(offset);
  };

  prevButton.addEventListener('click', handleClick);
  nextButton.addEventListener('click', handleClick);

  this.render = (start) => {
    container.innerHTML = this.state.bannerData
      .slice(start, start + 5)
      .map((cat, index) => {
        return `
          <div class="item">
            <img src="${cat.url}" alt="${cat.name}" data-index="${Number(
          start + index
        )}">
          </div>
        `;
      })
      .join('');
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    console.log('render Banner');
  };
  this.render(0);
}

export default Banner;
