import HTTP from "../http-common";

export default (data) => {
  return HTTP.get(`http://geocode-maps.yandex.ru/1.x/`, {
    params: {
      apikey: 'c0bc84b6-7dec-45b4-be8a-85945e742d4b',
      version: '1.x',
      results: '1',
      format: 'json',
      geocode: data.geocode
    },
    cache: false
  });
}
  
