const RippleAPI = require('ripple-lib').RippleAPI;

const myAddress = 'r......';    //your $xrp address
const mySecret = 's......';     //your $xrp private/secret key
const myEth = '0x......';       //your $eth address (that you have custody/private key for)


function makeMessageKey(ethAddy){
    //https://coil.com/p/wietse/Prepare-for-claiming-your-Spark-token-Flare-Networks-a-tool-for-XUMM-XRPToolkit/NkXJQUqpi

    let prepend = '02000000000000000000000000';

    ethAddy = ethAddy.slice(2);

    return prepend + ethAddy.toUpperCase();

}//end function


const mainnet = new RippleAPI({
    server: 'wss://s1.ripple.com'
  });
  
  (async function(api) {
    await api.connect();
  
    console.log(`setting account info for ${myAddress}`);

    let messageKey = makeMessageKey(myEth);
  
    console.log(`Message Key :  ${messageKey}`);

    let prepared = await api.prepareSettings(myAddress , {
        "messageKey" : messageKey});
  
    console.log('Prepared : ' , prepared);

    let signed = await api.sign(prepared.txJSON , mySecret).signedTransaction;

    console.log(`Signed : ${signed}`);

    let final = await api.submit(signed);

    console.log(`Final : ${final}`);
    
   await api.disconnect();
  })(mainnet);
