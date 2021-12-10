const fs = require("fs");
const web3 = require("@solana/web3.js");

const account = web3.Keypair.generate();

fs.writeFileSync("./keypair.json", JSON.stringify(account));