import { api } from './api.js';
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from './utils/localStorage.js';
import SearchInput from './components/SearchInput.js';
import SearchButton from './components/SearchButton.js';
import SearchResult from './components/SearchResult.js';
import ImageInfo from './components/ImageInfo.js';
import Loading from './components/Loading.js';
import HistoryButton from './components/HistoryButton.js';
import Theme from './components/Theme.js';
import Banner from './components/Banner.js';

function App({ $target }) {
  console.log('App', { $target });

  const $theme = document.createElement('div');
  const $header = document.createElement('header');
  const $history = document.createElement('div');
  const $content = document.createElement('section');
  $target.appendChild($theme);
  $target.appendChild($header);
  $target.appendChild($history);
  $target.appendChild($content);

  this.state = {
    data: [],
    keyword: '',
    image: {
      name: '',
      url: '',
      origin: '',
      temperament: '',
      visible: false,
    },
    loading: false,
    history: getLocalStorageItem('history'),
    bannerData: [],
  };
  this.setState = (action, payload) => {
    console.log('App #setState', { state: this.state, action, payload });
    switch (action) {
      case 'data':
        this.state.data = payload;
        this.searchResult.setState('data', this.state.data);
        break;
      case 'append':
        // this.state.data = [...this.state.data, ...payload];
        this.searchResult.setState('append', payload);
        break;
      case 'keyword':
        this.state.keyword = payload;
        this.searchInput.setState(this.state.keyword);
        break;
      case 'image':
        this.state.image = { ...this.state.image, ...payload };
        this.imageInfo.setState(this.state.image);
        break;
      case 'loading':
        this.state.loading = payload;
        this.loading.setState(this.state.loading);
        break;
      case 'history':
        this.state.history = payload;
        this.historyButton.setState(this.state.history);
        break;
      case 'bannerData':
        this.state.bannerData = payload;
        this.banner.setState(this.state.bannerData);
        break;
      default:
        break;
    }
  };

  this.getItemFromStorage = () => {
    return getLocalStorageItem('history') || [];
  };
  this.setItemToStorage = (keyword) => {
    let history = this.getItemFromStorage();
    history = history.filter((v) => v !== keyword);
    history.unshift(keyword);
    if (history.length > 5) history.pop();
    setLocalStorageItem('history', history);
  };

  const onRandomClick = async () => {
    try {
      this.setState('loading', true);
      this.setState('keyword', '');
      const { data } = await api.getCatsRandom50();
      this.setState('data', data);
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState('loading', false);
    }
  };
  const onSearch = async (e) => {
    if (e.keyCode === 13 && e.target.value) {
      try {
        this.setState('loading', true);
        const keyword = e.target.value;
        this.setState('keyword', keyword);
        this.setItemToStorage(this.state.keyword);
        this.setState('history', this.getItemFromStorage());

        const { data } = await api.getCatsByKeyword(keyword);
        this.setState('data', data);
      } catch (e) {
        console.warn(e);
      } finally {
        this.setState('loading', false);
      }
    }
  };
  const onDetailClick = async (index) => {
    const { id } = this.state.data[index];
    const { data } = await api.getCatsById(id);
    this.setState('image', {
      name: data.name,
      url: data.url,
      origin: data.origin,
      temperament: data.temperament,
      visible: true,
    });
  };
  const onClose = () => {
    this.setState('image', { visible: false });
  };
  const onHistoryClick = async (keyword) => {
    try {
      this.setState('loading', true);
      this.setState('keyword', keyword);
      this.setItemToStorage(keyword);
      this.setState('history', this.getItemFromStorage());

      const { data } = await api.getCatsByKeyword(keyword);
      this.setState('data', data);
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState('loading', false);
    }
  };
  const onIntersectingLastImage = async () => {
    console.log('onIntersectingLastImage');
    // TODO 최근 검색내역을 더 로드해야 함.
    try {
      const recent = this.getItemFromStorage()[0] || '';
      this.setState('loading', true);
      this.setState('keyword', recent);

      if (recent === '') {
        const { data } = await api.getCatsRandom50();
        this.setState('append', data);
      } else {
        const { data } = await api.getCatsByKeyword(recent);
        this.setState('append', data);
      }
      // this.searchResult.infiniteLoading();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState('loading', false);
    }
  };

  this.theme = new Theme({ $target: $theme });
  this.searchInput = new SearchInput({
    $target: $header,
    onSearch,
    initialValue: this.getItemFromStorage()[0],
  });
  this.searchButton = new SearchButton({ $target: $header, onRandomClick });
  this.banner = new Banner({ $target: $content });
  this.searchResult = new SearchResult({
    $target: $content,
    initialData: this.state.data,
    onDetailClick,
    onIntersectingLastImage,
  });
  this.imageInfo = new ImageInfo({
    $target,
    onClose,
    image: this.state.image,
  });
  this.loading = new Loading({ $target, loading: this.state.loading });
  this.historyButton = new HistoryButton({
    $target: $history,
    history: this.getItemFromStorage(),
    onHistoryClick,
  });

  this.init = async () => {
    const recently = this.getItemFromStorage()[0];
    if (recently) {
      onHistoryClick(recently);
    } else {
      console.warn('recently keyword is empty');
      this.searchInput.input.focus();
    }

    const { data } = await api.getCatsRandom50();
    this.setState('bannerData', data);
  };

  this.init();
  console.log('render App', { state: this.state });
}

export default App;
