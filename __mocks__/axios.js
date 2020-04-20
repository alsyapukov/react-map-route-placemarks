// Объявляем фиктивный axios
export default {
  get: jest.fn(() => Promise.resolve({ })),
  create: jest.fn(() => Promise.resolve({ }))
};