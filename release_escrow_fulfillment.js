const RippleAPI = require('ripple-lib').RippleAPI;

const myAddress = 'r.......';
const mySecret = 's.......';

const escrowSequence = 1; //you need to know the sequence# the escrow was created
const condition = "";   //this will be part of the escrow created transaction - just copy it
const fulfillment = ""; //this will be special fulfillment code - sure hope you know what it is ;)

const api = new RippleAPI({
  server: 'wss://s2.ripple.com' // Public rippled server
});

api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  
  return api.prepareEscrowExecution(myAddress , {
      "owner" : myAddress,
      "escrowSequence" : escrowSequence,
      "condition" : condition,
      "fulfillment" : fulfillment});

}).then(prepared => {
  console.log(prepared);

  return api.sign(prepared.txJSON , mySecret).signedTransaction;
  
}).then(signed => {

  console.log(signed);

  return api.submit(signed);
  
}).then(final => {

  console.log(final , 'done and disconnected.');
  /* end custom code -------------------------------------- */

  return api.disconnect();
}).catch(console.error);
