const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s2.ripple.com' // Public rippled server
});

//add your special infos here
const myAddress = 'r......';  //your $xrp address
const mySecret = 's.......';  //your $xrp secret/private key
const myEth = '0x......';     //your $eth address

function makeMessageKey(ethAddy){
    //https://coil.com/p/wietse/Prepare-for-claiming-your-Spark-token-Flare-Networks-a-tool-for-XUMM-XRPToolkit/NkXJQUqpi

    let prepend = '02000000000000000000000000';

    ethAddy = ethAddy.slice(2);

    return prepend + ethAddy.toUpperCase();

}//end function

api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  
  console.log(`setting account info for ${myAddress}`);

  let messageKey = makeMessageKey(myEth);

  console.log(`Message Key :  ${messageKey}`);

  return api.prepareSettings(myAddress , {
      "messageKey" : messageKey});


}).then(prepared => {
  console.log("Prepared : " , prepared);
  
  return api.sign(prepared.txJSON , mySecret).signedTransaction;

  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(signed => {
  console.log("Signed : " , signed);

  return api.submit(signed);
  
}).then(final => {

  console.log(final , 'done and disconnected.');
  return api.disconnect();
}).catch(console.error);

//node prepare_spark_claim.js
