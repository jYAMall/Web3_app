// https://eth-rinkeby.alchemyapi.io/v2/FNGIokzrcO6Um_4LTd4FTozJfImQf6ui

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/FNGIokzrcO6Um_4LTd4FTozJfImQf6ui',
      accounts: [ '82e9619eef5431fe0fc7c98793ca900de615a7b9f2eefb1d87771e4085f9b417' ]
    }
  }
}