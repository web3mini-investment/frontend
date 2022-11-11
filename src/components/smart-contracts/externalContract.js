import * as ethers from 'ethers';
import contractData from './contracts/DummyDFundToken.json';
import { loadSigner } from './loadFund';

export const paymentTokenAddress = () => {
    return '0x1d2A7DeDCeadfF1dfc0543e7FaA558D32E958c66';
}

export const loadPaymentTokenContract = async () => {
    const signer = await loadSigner();
    const contract = new ethers.Contract(paymentTokenAddress(), contractData.abi, signer);
    return contract;
}