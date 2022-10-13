const API_ENDPOINT =
  'https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev/api';

const request = async ({ action, payload }) => {
  // let url = `${API_ENDPOINT}/cats/random50`;
  // if (action === 'search') url = `${API_ENDPOINT}/cats/search?q=${payload}`;
  // else if (action === 'id') url = `${API_ENDPOINT}/cats/${payload}`;
  let url = `data/random50.json`;
  if (action === 'search' && payload === '터키시') url = `data/search.json`;
  else if (action === 'search' && payload !== '터키시')
    url = `data/noData.json`;
  else if (action === 'id') url = `data/id_turkish.json`;
  try {
    const response = await fetch(url);
    return response;
  } catch (e) {
    throw new Error('api error', e);
  }
};

const getCatsRandom50 = async () => {
  const response = await request({});
  return await await response.json();
};

const getCatsByKeyword = async (keyword) => {
  const response = await request({ action: 'search', payload: keyword });
  return response.json();
};

const getCatsById = async (id) => {
  const response = await request({ action: 'id', payload: id });
  return response.json();
};

export const api = {
  getCatsRandom50,
  getCatsByKeyword,
  getCatsById,
};
