import * as ethers from 'ethers';
import contractData from './contracts/DummyDFundToken.json';
import { loadSigner } from './loadFund';

export const paymentTokenAddress = () => {
    return '0x5386ad660F2aA70481184423bc817C361851b2E4';
}

export const loadPaymentTokenContract = async () => {
    const signer = await loadSigner();
    const contract = new ethers.Contract(paymentTokenAddress(), contractData.abi, signer);
    return contract;
}