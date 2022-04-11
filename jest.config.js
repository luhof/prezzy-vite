// jest.config.js
module.exports = {
    moduleFileExtensions: [
      'js',
      'ts',
      'json',
      'vue'
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.vue$': 'vue-jest'
    },

    moduleNameMapper: {
          '\\.(css|less|scss)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
    }
      
  }