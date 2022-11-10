import * as ethers from 'ethers';
import contractData from './contracts/CollectiveInvestmentSchemeV2.json';
import * as CollectiveInvestmentSchemeV2 from './CollectiveInvestmentSchemeV2';
import Swal from 'sweetalert2';

export const addDeposit = async () => {
  try {
    console.log('Pushed!');
    const formHtml = 
    `<table>
      <tr>
        <th class="content2" align="right">Fund Address</th>
        <td align="left"><input id="fund-address" class="swal2-input" placeholder="Fund address"></td>
      </tr>
      <tr>
        <th class="content2" align="right">Value</th>
        <td align="left"><input id="value" class="swal2-input" type="number" value="0"></td>
      </tr>
    <table/>`;
    const { value: result } = await Swal.fire({
      title: 'Add deposit',
      html: formHtml,
      width: 700,
      focusConfirm: false,
      showCancelButton: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        var result = {
          success: false
        };
        try {
          const args = {
            fundAddress: ethers.utils.getAddress(document.getElementById('fund-address').value),
            amount: Math.round(document.getElementById('value').value)
          }
          if (!Number.isInteger(args.amount) || args.amount <= 0) {
            throw new Error('Invalid deposit value because it should be a positive integer.');
          }
          result.fundAddress = args.fundAddress;
          console.log(`address ${args.fundAddress}`);
          const addResult = await CollectiveInvestmentSchemeV2.addDeposit(args);
          result.success = true;
          result.fundName = addResult.fundName;
          result.currentDeposit = addResult.currentDeposit;
          console.log('ok' + JSON.stringify(result));
          return result;
        }
        catch (err) {
          result.success = false;
          result.message = err.message;
          console.log('fail' + JSON.stringify(result));
          return result;
        }
      }
    });
    if (!result.success) {
      await Swal.fire({
        title: `Failed to add deposit ...`,
        icon: 'error',
        html: result.message,
        showCloseButton: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });    
    }
    else {
      await Swal.fire({
        title: `Deposit added`,
        icon: 'success',
        html: `Your current deposit on ${result.fundName} is ${result.currentDeposit}`,
        showCloseButton: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });
    }
  }
  catch (err) {
    console.error(err.message);
    return {
      success: false,
      message: err.message
    };
  }
  Swal.close();
}

export const createNewFundBeforeDeployed = async ({fundName, underlyingAsset, offerClosingTime, orderExpiration, maturity}) => {
  try {
    if (fundName === '') {
      throw new Error('Fund name is empty.');
    }
    const signer = await loadSigner();
    console.log("Account:", await signer.getAddress());
    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);

    const WETH9 = '0x5386ad660F2aA70481184423bc817C361851b2E4';
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