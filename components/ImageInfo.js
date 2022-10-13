function ImageInfo({ $target, onClose, image }) {
  const container = document.createElement('div');
  container.className = 'ImageInfo';
  $target.appendChild(container);

  this.state = {
    image: image,
  };
  this.setState = (nextData) => {
    this.state.image = { ...this.state.image, ...nextData };
    this.render();
  };

  container.addEventListener('click', (e) => {
    const { target } = e;
    if (
      target.className === 'ImageInfo active' ||
      target.className === 'close'
    ) {
      onClose();
    }
  });
  document.addEventListener('keyup', (e) => {
    e.stopPropagation();
    if (e.keyCode === 27) {
      onClose();
    }
  });

  this.render = () => {
    const { name, url, temperament, origin, visible } = this.state.image;
    if (visible) {
      container.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>
      `;
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
    console.log('render ImageInfo', { image: this.state.image, visible });
  };
  this.render();
}

export default ImageInfo;
