function SearchInput({ $target, onSearch, initialValue }) {
  this.input = document.createElement('input');
  this.input.className = 'SearchInput';
  this.input.placeholder = '고양이를 검색해보세요.|';
  // input.autofocus = true;

  this.state = {
    value: initialValue,
  };
  this.setState = (nexData) => {
    this.state.value = nexData;
    this.render();
  };

  this.input.addEventListener('focus', (e) => {
    e.target.value = '';
  });
  this.input.addEventListener('keyup', (e) => {
    onSearch(e);
  });

  $target.appendChild(this.input);

  this.render = () => {
    this.input.value = this.state.value;
    console.log('render SearchInput');
  };
  this.render();
}

export default SearchInput;
