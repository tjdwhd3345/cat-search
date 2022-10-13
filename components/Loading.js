function Loading({ $target, loading }) {
  const container = document.createElement('div');
  container.className = 'Loading';
  $target.appendChild(container);

  this.state = {
    loading,
  };
  this.setState = (nextState) => {
    this.state.loading = nextState;
    this.render();
  };

  this.render = () => {
    container.innerHTML = `
      <div class="loading">Loading ... \` ─ ┌ </div>
    `;
    container.style.display = this.state.loading ? 'block' : 'none';
    console.log('render Loading');
  };
}

export default Loading;
