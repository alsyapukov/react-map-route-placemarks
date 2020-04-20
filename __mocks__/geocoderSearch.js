import axios from "./axios";

// Наши настройки api
export const apiSettings = {
  url: 'http://geocode-maps.yandex.ru/1.x/',
  params: {
    apikey: 'c0bc84b6-7dec-45b4-be8a-85945e742d4b',
    version: '1.x',
    results: '1',
    format: 'json'
  }
}

// Делаем запрос в геокодер Яндекса, на тесте можно ставить и тестовый ключ.
// 25000 запросов в день можно слать бесплатно
export default async term => {
  const response = await axios.get(apiSettings.url, {
    params: {
      ...apiSettings.params,
      geocode: term
    }
  });

  return response;
};