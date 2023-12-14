const path = require('path');

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('postcss-import'),
                require('postcss-nested'),
                require('postcss-extend'),
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                // Jest module mapper which will detect our absolute imports.
                '^assets(.*)$': '<rootDir>/src/assets$1',
                '^components(.*)$': '<rootDir>/src/components$1',
                '^routers(.*)$': '<rootDir>/src/routers$1',
                '^pages(.*)$': '<rootDir>/src/pages$1',
                '^redux(.*)$': '<rootDir>/src/redux$1',
                '^utils(.*)$': '<rootDir>/src/utils$1',
                '^types(.*)$': '<rootDir>/src/types$1',
                '^constants(.*)$': '<rootDir>/src/constants$1',
                // Another example for using a wildcard character
                '^~(.*)$': '<rootDir>/src$1'
            }
        }
    },
    
}