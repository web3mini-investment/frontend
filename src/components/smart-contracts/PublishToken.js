import * as ethers from 'ethers';
import contractData from './contracts/CollectiveInvestmentSchemeV2.json';
import * as CollectiveInvestmentSchemeV2 from './CollectiveInvestmentSchemeV2';
import Swal from 'sweetalert2';

export const publishToken = async () => {
  try {
    console.log('Pushed!');
    const formHtml = 
    `<table>
      <tr>
        <th class="content2" align="right">Fund Address</th>
        <td align="left"><input id="fund-address" class="swal2-input" placeholder="Fund address"></td>
      </tr>
    <table/>`;
    const { value: result } = await Swal.fire({
      title: 'Publish token',
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
            fundAddress: ethers.utils.getAddress(document.getElementById('fund-address').value)
          }
          result.fundAddress = args.fundAddress;
          console.log(`address ${args.fundAddress}`);
          await CollectiveInvestmentSchemeV2.publishToken(args);
          result.success = true;
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
        title: `Failed to make buy order ...`,
        icon: 'error',
        html: result.message,
        showCloseButton: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });    
    }
    else {
      await Swal.fire({
        title: `Token is published`,
        icon: 'success',
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