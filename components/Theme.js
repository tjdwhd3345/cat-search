function Theme({ $target }) {
  $target.className = 'ThemeContainer';
  $target.innerHTML = `
      <label for="themeToggle">Light</label>
      <div class="toggle">
        <input type="checkbox" id="themeToggle">
        <label for="themeToggle" class="switch">
          <span class="ball"></span>
        </label>
      </div>
      <label for="themeToggle">Dark</label>
    `;

  this.state = {
    theme: 'light',
  };
  this.setState = (nextData) => {
    this.state.theme = nextData;
    this.render();
  };

  this.handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      this.setState('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      this.setState('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  };

  this.render = () => {
    if (this.state.theme === 'light') themeToggle.checked = false;
    else themeToggle.checked = true;
    themeToggle.removeEventListener('change', this.handleChange);
    themeToggle.addEventListener('change', this.handleChange);
    console.log('render Theme');
  };
  this.render();
}

export default Theme;
