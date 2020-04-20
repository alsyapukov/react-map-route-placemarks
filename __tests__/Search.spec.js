import React from 'react';
import { create } from 'react-test-renderer';
import Search from '../src/containers/Search'

import mockAxios from "../__mocks__/axios";
import geocoderSearch, { apiSettings } from "../__mocks__/geocoderSearch";


describe('Test Search component', () => {

  it('renders Search component', () => {
    const component = create(<Search />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("Check geocoderSearch function", async () => {

    // Макет нашей функции
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve([
        {
          address: "Россия, Москва, Красная площадь",
          coords: [55.753595, 37.621031]
        }
      ])
    );

    // Вызываем нашу функцию с поисковой строкой
    const searchFunc = await geocoderSearch('Красная площадь');

    // Ожидаемое значение
    const expectSearch = [
      {
        address: "Россия, Москва, Красная площадь",
        coords: [55.753595, 37.621031]
      }
    ];

    // сравниваем значение из функции и ожидаемое значение
    expect(expect.arrayContaining(searchFunc)).toEqual(expect.arrayContaining(expectSearch));

    // Проверили что она вызывается 1 раз
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    
    // Проверяем вызвана ли функция с конкретными аргументами
    expect(mockAxios.get).toHaveBeenCalledWith(
      apiSettings.url,
      {
        params: {
          ...apiSettings.params,
          geocode: 'Красная площадь'
        }
      }
    );
  });
});