function SearchButton({ $target, onRandomClick }) {
  const button = document.createElement('button');
  button.className = 'SearchButton';
  button.innerText = '랜덤검색';

  const handleClick = () => {
    onRandomClick();
  };

  button.addEventListener('click', handleClick);

  $target.appendChild(button);
  console.log('render SearchButton');
}

export default SearchButton;
