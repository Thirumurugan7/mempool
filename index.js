const ethers = require("ethers");
const WebSocket = require("ws");

const ws = new WebSocket(
  "wss://mainnet.infura.io/ws/v3/95c5fe3fe1504b01a8a1c9a3c428a49f"
);

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/95c5fe3fe1504b01a8a1c9a3c428a49f"
);

console.log(provider);
console.log(ws);
async function getTransactionDetails(txHash) {
  const tx = await provider.getTransaction(txHash);
  console.log(tx);
  // Further processing based on `tx` details...
}

const monitoredAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // The address you're interested in

// function analyzeTransaction(tx) {
//   if (tx.to && tx.to.toLowerCase() === monitoredAddress.toLowerCase()) {
//     console.log(`Transaction to monitored address found: ${tx.hash}`);
//     // Perform additional analysis or logging
//   }
// }
ws.on("open", function open() {
  console.log("Connected");

  // Subscribe to new pending transactions
  ws.send(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_subscribe",
      params: ["newPendingTransactions"],
    })
  );
});

// ws.on("message", function incoming(data) {
//   const response = JSON.parse(data.toString());
//   console.log("Received Data:", response);

//   // If you specifically want to work with transaction hash
//   if (response.params && response.params.result) {
//     const txHash = response.params.result;
//     console.log("Transaction Hash:", txHash);

//     // You can further use this txHash to get transaction details via web3 or ethers.js
//   }
// });

ws.on("message", function incoming(data) {
  const response = JSON.parse(data.toString());
  if (response.params && response.params.result) {
    const txHash = response.params.result;
    getTransactionDetails(txHash).catch(console.error); // Make sure to handle errors appropriately
  }
});

ws.on("error", function error(err) {
  console.error("WebSocket encountered error:", err.message);
});
// Connect to an Ethereum node, using Alchemy or Infura as a provider
// const provider = new ethers.providers.WebSocketProvider(
//   ' wss://mainnet.infura.io/ws/v3/95c5fe3fe1504b01a8a1c9a3c428a49f -x {"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'
// );

// console.log(provider);

// wscat -c wss://mainnet.infura.io/ws/v3/95c5fe3fe1504b01a8a1c9a3c428a49f -x '{"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'

// Define the Uniswap contract addresses you're interested in
const uniswapContractAddresses = [
  "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  "0x1F98431c8aD98523631AE4a59f267346ea31F984",
]; // Add more as needed

// provider.on("pending", (txHash) => {
//   provider
//     .getTransaction(txHash)
//     .then((transaction) => {
//       if (
//         transaction &&
//         transaction.to &&
//         uniswapContractAddresses.includes(transaction.to.toLowerCase())
//       ) {
//         // Log the transaction
//         console.log(
//           `Uniswap Pending Transaction: ${transaction.hash} | From: ${
//             transaction.from
//           } | To: ${transaction.to} | Value: ${ethers.utils.formatEther(
//             transaction.value
//           )} ETH`
//         );
//       }
//     })
//     .catch((err) => {
//       console.error(`Error fetching transaction details: ${err.message}`);
//     });
// });
