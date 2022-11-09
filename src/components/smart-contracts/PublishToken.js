import { ContractFactory } from 'ethers';
import * as ethers from 'ethers';
import contractData from './contracts/CollectiveInvestmentSchemeV2.json';

const publishToken = async ({fundAddress}) => {
    try {
      if (typeof window.ethereum === 'undefined') {
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

      const contract = new ethers.Contract(fundAddress, contractData.abi, signer);
      contract.publishToken();
      
      return {
        success: true,
        contractAddress: contract.address
      };
    }
    catch (err) {
      console.error(err.message);
      return {
        success: false,
        message: err.message
      };
  }
}

export default publishToken
