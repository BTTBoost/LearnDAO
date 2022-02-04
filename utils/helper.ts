import { ethers } from "ethers";
import erc20 from "./ABIs/ERC20Token.json";
const erc20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "funtion approve(address spender, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export const getTokenBalance = async (
  provider: any,
  tokenAddress: string,
  address: string,
  format = false
) => {
  const tokenContract = new ethers.Contract(tokenAddress, erc20.abi, provider);
  var balance = (await tokenContract.balanceOf(address)).toString();
  if (format) {
    const decimals = (await tokenContract.decimals()).toString();
    balance = ethers.utils.formatUnits(balance, decimals);
  }
  return balance;
};

export const checkTokeAllowance = async (
  provider: ethers.providers.Provider,
  tokenAddress: string,
  owner: string,
  spender: string,
  format = true
) => {
  const tokenContract = new ethers.Contract(tokenAddress, erc20.abi, provider);
  var allowance = (await tokenContract.allowance(owner, spender)).toString();
  if (format) {
    const decimals = (await tokenContract.decimals()).toString();
    allowance = ethers.utils.formatUnits(allowance, decimals);
  }
  return allowance;
};

export const tokenApprove = async (
  provider: any,
  tokenAddress: string,
  spender: string,
  amount: string
) => {
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, erc20.abi, signer);
  const decimals = (await tokenContract.decimals()).toString();
  const amountInWei = ethers.utils.parseUnits(amount, decimals);
  var txn = await tokenContract.approve(spender, amountInWei);
  await txn.wait();
};
