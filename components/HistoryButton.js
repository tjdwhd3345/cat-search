function HistoryButton({ $target, history, onHistoryClick }) {
  const container = document.createElement('div');
  container.className = 'HistoryButton';
  $target.appendChild(container);

  this.state = {
    history,
  };
  this.setState = (nextData) => {
    this.state.history = nextData;
    this.render();
  };

  container.addEventListener('click', (e) => {
    const { target } = e;
    if (target.nodeName === 'BUTTON') {
      const { keyword } = target.dataset;
      onHistoryClick(keyword);
    }
  });

  this.render = () => {
    container.innerHTML =
      `최근 검색어: ` +
      this.state.history
        .map((word) => {
          return `
        <button data-keyword=${word}>${word}</button>
      `;
        })
        .join('');
    console.log('render HistoryButton');
  };
  this.render();
}

export default HistoryButton;
