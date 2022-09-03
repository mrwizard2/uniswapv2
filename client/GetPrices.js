const ethers = require('ethers');

const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require('./AddressList');

const { erc20ABI, factoryABI, routerABI, pairABI } = require('./ABIList');

// Connect To A Standard Provider
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/oR2RI3ISaPeRDfEm4IB-f5ios943aPoy'
);

// Connect to Factory
const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);

// Connect to Router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

// Call the blockchain
const getPrices = async (amountInHuman) => {
  // Convert the amount in
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();

  // Get amount out
  const amountsOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  // Convert the amount out - decimals
  const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
  const decimals2 = await contractToken.decimals();

  // Convert the amount out - human readable
  const aountOutHuman = ethers.utils.formatUnits(
    amountsOut[1].toString(),
    decimals
  );

  console.log(aountOutHuman);
};

const amountInHuman = '1';
getPrices(amountInHuman);
