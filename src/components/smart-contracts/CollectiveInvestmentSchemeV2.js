import { loadFund, loadSignerAndFund } from './loadFund';
import { paymentTokenAddress, loadPaymentTokenContract } from './externalContract';

export const addDeposit = async ({fundAddress, amount}) => {
  // mendou!!! but we need two operations... (is it true?)
  const paymentTokenContract = await loadPaymentTokenContract();
  const allowanceTx = await paymentTokenContract.increaseAllowance(fundAddress, amount);
  await allowanceTx.wait();
  const {signer, contract} = await loadSignerAndFund(fundAddress);
  await contract.deployed();
  const addTx = await contract.addDeposit(amount);
  await addTx.wait();
  const name = await contract.name();
  const deposit = await contract.depositWETH(await signer.getAddress());
  const result = {
    fundName: name,
    currentDeposit: deposit
  };
  console.log(`addDepositResult: ${JSON.stringify(result)}`);
  return result
}

export const makeBuyOrder = async ({fundAddress}) => {
  const contract = await loadFund(fundAddress);
  const tx = await contract.makeBuyOrder();
  await tx.wait();
}

export const publishToken = async ({fundAddress}) => {
  const contract = await loadFund(fundAddress);
  const tx = await contract.publishToken();
  await tx.wait();
}
