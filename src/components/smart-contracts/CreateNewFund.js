import * as ethers from 'ethers';
import contractData from './contracts/CollectiveInvestmentSchemeV2.json';
import { loadSigner } from './loadFund';
import { paymentTokenAddress } from './externalContract';
import Swal from 'sweetalert2';

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

export const createNewFund = async ({fundName, underlyingAsset, offerClosingTime, orderExpiration, maturity}) => {
    try {
      const signer = await loadSigner();
      console.log("Account:", await signer.getAddress());
      const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);
  
      const WETH9 = '0x5386ad660F2aA70481184423bc817C361851b2E4';
      console.log(`WETH.address=${ethers.utils.getAddress(WETH9)}`);
      console.log(`underlying.address=${ethers.utils.getAddress(underlyingAsset)}`);
      console.log(`offerClosingTime: .js=${offerClosingTime}, .sol=${solDateConversion(offerClosingTime)}`);
      console.log(`orderExpiration: .js=${orderExpiration}, .sol=${solDateConversion(orderExpiration)}`);
      console.log(`maturity: .js=${maturity}, .sol=${solDateConversion(maturity)}`);
      var thrownContract = undefined;
      try {
        thrownContract = await factory.deploy(
          ethers.utils.getAddress(WETH9),
          ethers.utils.getAddress(underlyingAsset),
          solDateConversion(offerClosingTime),
          solDateConversion(orderExpiration),
          solDateConversion(maturity),
          fundName,
          'DFN'
        );
      }
      catch (err) {
        console.error(err.message);
        throw new Error(`Deploying '${fundName}' is cancelled`);
      }
      
      const deployedContract = await thrownContract.deployed();
      console.log(`Contract address: ${deployedContract.address}`);
      return {
        success: true,
        contractAddress: deployedContract.address
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

export const createNewFundBeforeDeployed = async ({fundName, underlyingAsset, offerClosingTime, orderExpiration, maturity}) => {
  try {
    if (fundName === '') {
      throw new Error('Fund name is empty.');
    }
    const signer = await loadSigner();
    console.log("Account:", await signer.getAddress());
    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);

    const WETH9 = paymentTokenAddress();
    console.log(`WETH.address=${ethers.utils.getAddress(WETH9)}`);
    console.log(`underlying.address=${ethers.utils.getAddress(underlyingAsset)}`);
    console.log(`offerClosingTime: .js=${offerClosingTime}, .sol=${solDateConversion(offerClosingTime)}`);
    console.log(`orderExpiration: .js=${orderExpiration}, .sol=${solDateConversion(orderExpiration)}`);
    console.log(`maturity: .js=${maturity}, .sol=${solDateConversion(maturity)}`);
    var contract = undefined;
    try {
      contract = await factory.deploy(
        ethers.utils.getAddress(WETH9),
        ethers.utils.getAddress(underlyingAsset),
        solDateConversion(offerClosingTime),
        solDateConversion(orderExpiration),
        solDateConversion(maturity),
        fundName,
        'DFN'
      );
    }
    catch (err) {
      console.error(err.message);
      throw new Error(`Deploying '${fundName}' is cancelled`);
    }
    return {
      success: true,
      fundName: fundName,
      contract: contract
    };
  }
  catch (err) {
    console.error(err.message);
    return {
      success: false,
      fundName: fundName,
      message: err.message
    };
  }
}


export const createNewFundByForms = async () => {
  var defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 1);

  const formHtml = 
  `<table>
      <tr>
        <th class="content2" align="right">Fund Name</th>
        <td align="left"><input id="fund-name" class="swal2-input" placeholder="Your fund name"></td>
      </tr>
      <tr>
        <th class="content2" align="right">Investment Target</th>
        <td align="left"><input id="target-underlying" class="swal2-input" placeholder="Investment target adress"></td>
      </tr>
      <tr>
        <th class="content2" align="right">Offering Closing Time</th>
        <td align="left"><input id="offer-closing-time" type="date" class="swal2-input" value="${defaultDate.toISOString().slice(0,10)}"></td>
      </tr>
      <tr>
        <th class="content2" align="right">Order Expiration</th>
        <td align="left"><input id="order-expiration" type="date" class="swal2-input" value="${defaultDate.toISOString().slice(0,10)}"></td>
      </tr>
      <tr>
        <th class="content2" align="right">Fund Maturity</th>
        <td align="left"><input id="fund-maturity" type="date" class="swal2-input" value="${defaultDate.toISOString().slice(0,10)}"></td>
      </tr>
    <table/>`;

  const { value: result } = await Swal.fire({
    title: 'Create Fund',
    html: formHtml,
    width: 700,
    focusConfirm: false,
    showCancelButton: true,
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const args = {
        fundName: document.getElementById('fund-name').value,
        underlyingAsset: document.getElementById('target-underlying').value,
        offerClosingTime: document.getElementById('offer-closing-time').value,
        orderExpiration: document.getElementById('order-expiration').value,
        maturity: document.getElementById('fund-maturity').value
      }
      return createNewFundBeforeDeployed(args);
    }
  });

  if (!result.success) {
    console.log(result.fundName);
    await Swal.fire({
      title: `Fail to create '${result.fundName}'...`,
      icon: 'error',
      html: result.message,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
    return;
  }
  Swal.fire({
    title: 'Deploying',
    html: `Deploying your fund '${result.fundName}'...`,
    allowOutsideClick : false,
    showConfirmButton: false,
    allowEnterKey: false,
    allowEscapeKey: false
  })
  Swal.showLoading();
  
  var popupSetting = undefined;
  try {
    const deployedContract = await result.contract.deployed();
    const url = `https://goerli.etherscan.io/address/${deployedContract.address}`;
    popupSetting = {
      title: `'${result.fundName}' is created!`,
      icon: 'success',
      html: `<a href=${url} target="_blank">${deployedContract.address}<a/>`
    };
  }
  catch (err) {
    popupSetting = {
      title: `Fail to create '${result.fundName}'...`,
      icon: 'error',
      html: err.message
    };
  }
  Swal.fire({
    title: popupSetting.title,
    icon: popupSetting.icon,
    html: popupSetting.html,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: true,
  });
}
