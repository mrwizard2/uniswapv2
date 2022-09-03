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
  'https://bsc-dataseed.binance.org/'
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
};

const amountInHuman = '500';
getPrices(amountInHuman);
