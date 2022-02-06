// Add your smart contract address here
export const CONTRACT_ADDRESS = "0x998abeb3E57409262aE5b751f60747921B33613E";
export const DAI_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const LDAO_ADRESS = "0xf5059a5D33d5853360D16C683c16e67980206f36";

export const categories = [
  "Web3",
  "Frontend",
  "Backend",
  "NFT",
  "DeFi",
  "DAOs",
  "DevOps",
  "Blockchain",
  "EVM",
  "Ether.js",
  "Javascript",
  "Solidity",
  "Rust",
  "Go",
  "Non tech",
  "Solana",
  "Layer 2",
];

export const contentCategory = [
  "Tutorial",
  "Article",
  "Video",
  "Opensource Project",
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export function abbreviateNumber(number) {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}
