import loadFund from './loadFund';

export const functionWrapper = async (f, params) => {
  try {
    const result = f(params);
    console.log('Success invocation');
    return {
        success: true,
        result: result
    }
  }
  catch (err) {
    console.error(err.message);
    return {
        success: false,
        message: err.message
    }
  }
}

export const addDeposit = async ({fundAddress, amount}) => {
  const contract = await loadFund(fundAddress);
  await contract.addDeposit(amount);
}

export const makeBuyOrder = async ({fundAddress}) => {
  const contract = await loadFund(fundAddress);
  await contract.makeBuyOrder();
}

export const publishToken = async ({fundAddress}) => {
  const contract = await loadFund(fundAddress);
  await contract.publishToken();
}
