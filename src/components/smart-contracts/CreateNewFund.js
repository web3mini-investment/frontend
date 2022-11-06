import { ContractFactory } from 'ethers';
import * as ethers from 'ethers';
import contractData from './contracts/CollectiveInvestmentScheme.json';

function solDateConversion(date) {
  if (date instanceof Date) {
    return Math.floor(date.getTime() / 1000);
  }
  if (typeof date === 'string' || date instanceof String) {
    const millsec = Date.parse(date);
    return Math.floor(millsec / 1000);
  }
  throw Error(`Invalid type. Date is expected, but ${typeof date} is detected.`);
}

const createNewFund = async ({underlyingAsset, offerClosingTime, orderExpiration, maturity}) => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    else {
      throw new Error('MetaMask is not installed...');
    }    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length == 0) {
      throw new Error('Fail to get account.');
    }
    {
      // prohibit mainnet
      const hexChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainId = parseInt(hexChainId);
      console.log(`chainId=${chainId}`)
      if (chainId != 5) {
        throw new Error('Only Goerli TestNet(chainId=5) is available.');
      }
    }
    console.log(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);
    const contractAddress = 'hogehoge';

    const WETH9 = '0x2fC7260cA3D68dA0E304a94Aec7E50B25d80903b';
    console.log(`WETH.address=${ethers.utils.getAddress(WETH9)}`);
    console.log(`underlying.address=${ethers.utils.getAddress(underlyingAsset)}`);
    console.log(`offerClosingTime: .js=${offerClosingTime}, .sol=${solDateConversion(offerClosingTime)}`);
    console.log(`orderExpiration: .js=${orderExpiration}, .sol=${solDateConversion(orderExpiration)}`);
    console.log(`maturity: .js=${maturity}, .sol=${solDateConversion(maturity)}`);
    const contract = await factory.deploy(
      ethers.utils.getAddress(WETH9),
      ethers.utils.getAddress(underlyingAsset),
      solDateConversion(offerClosingTime),
      solDateConversion(orderExpiration),
      solDateConversion(maturity)
    );

    return {contractAddress: contract.address};
}

export default createNewFund
