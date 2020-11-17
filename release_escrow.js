//release / cancel escrow that is passed cancel time 

const RippleAPI = require('ripple-lib').RippleAPI;

const myAddress = 'r.......'; //your $xrp address
const mySecret = 's......'; //your $xrp private/secret key
const escrowSequence = xxx; //you need to know the sequence# of the escrowCreate transaction

const api = new RippleAPI({
  server: 'wss://s2.ripple.com' // Public rippled server
});

api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  
  console.log(`Cancel escrow for ${myAddress}`);
  
  return api.prepareEscrowCancellation(myAddress , {"owner" : myAddress, "escrowSequence" : escrowSequence});
  
}).then(prepared => {
  console.log(prepared);
  
  return api.sign(prepared.txJSON , mySecret).signedTransaction;

}).then(signed => {
  console.log(signed);

  return api.submit(signed);
  
}).then(final => {

  console.log(final , 'done and disconnected.');
  /* end custom code ------------------------------------ */

  return api.disconnect();
}).catch(console.error);
