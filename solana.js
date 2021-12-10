const web3 = require("@solana/web3.js");

const transferSol = async (from, to, amnt) => {
  try{
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const transaction =  new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(from.publicKey.toString()),
        toPubkey: new web3.PublicKey(to.publicKey.toString()),
        lamports: amnt * web3.LAMPORTS_PER_SOL
      })
    );

    const signature = await web3.sendAndConfirmTransaction(
      connection, 
      transaction, 
      [from]
    );

    return signature;
  } catch(e){
    console.log(e);
  }
}

const getWalletBalance = async (pubk) => {
  try{
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const balance = await connection.getBalance(new web3.PublicKey(pubk));

    return balance / web3.LAMPORTS_PER_SOL;
  } catch(e){
    console.log(e);
  }
}

const airDropSol = async (wallet, amnt) => {
  try{
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSigniture = await connection.requestAirdrop(new web3.PublicKey(wallet.publicKey.toString()), amnt * web3.LAMPORTS_PER_SOL);
    await connection.confirmTransaction(fromAirDropSigniture);
  } catch(e){
    console.log(e);
  }
}

module.exports = {
  getWalletBalance,
  transferSol,
  airDropSol
};