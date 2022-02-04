import { Signer } from "ethers";
import { ethers } from "hardhat";
import erc20Abi from "./erc20api.json";
var daiToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const main = async () => {
  let accounts: Signer[];
  accounts = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("LearnToken");
  const learnDaoFactory = await ethers.getContractFactory("LearnDAOGovernor");

  const tokenContract = await tokenFactory.deploy();
  await tokenContract.deployed();
  console.log("tokenContract", tokenContract.address);
  console.log("[LOG] Token contract deployed");

  await tokenContract.delegate(accounts[0].getAddress());

  const learnDaoContract = await learnDaoFactory.deploy(
    tokenContract.address,
    "LearnDAOGovernor"
  );
  await learnDaoContract.deployed();
  console.log("learnDaoContract address", learnDaoContract.address);

  var txn = await learnDaoContract.receiveEthForTransactions({
    value: ethers.utils.parseEther("2"),
  });

  await txn.wait();

  var txn = await tokenContract.setMinterRole(learnDaoContract.address);
  await txn.wait();

  var minterRole = await tokenContract.checkMinterRole(
    learnDaoContract.address
  );

  if (minterRole == true) {
    console.log("[LOG] LearnDAO is now a MINTER");
  }

  var txn = await tokenContract.setPauserRole(learnDaoContract.address);
  await txn.wait();

  var pauserRole = await tokenContract.checkPauserRole(
    learnDaoContract.address
  );

  if (pauserRole == true) {
    console.log("[LOG] LearnDAO is now a PAUSER");
  }

  var signer: Signer = ethers.provider.getSigner();

  var daiContract = new ethers.Contract(daiToken, erc20Abi, signer);

  var balance = await daiContract.balanceOf(accounts[0].getAddress());
  console.log("balance", balance);
  var balance2 = await daiContract.balanceOf(accounts[1].getAddress());
  console.log("balance2", balance2);
  console.log('ethers.utils.parseEther("20")', ethers.utils.parseEther("20"));
  // approve dai token
  var txn = await daiContract.approve(
    learnDaoContract.address,
    ethers.utils.parseEther("20")
  );
  await txn.wait();

  // check allowance
  var allowance = await daiContract.allowance(
    accounts[0].getAddress(),
    learnDaoContract.address
  );
  console.log("allowance ; ", allowance);

  txn = await tokenContract.mint(
    accounts[1].getAddress(),
    ethers.utils.parseEther("10")
  );
  txn.wait();
  var tokenbal = await tokenContract.balanceOf(accounts[1].getAddress());
  console.log("tokenbal", tokenbal);
  console.log("accounts[1].getAddress()", accounts[1].getAddress());

  var balance3 = await tokenContract.balanceOf(accounts[0].getAddress());
  console.log("balance3", balance3);

  var checkMinterRole = await tokenContract.checkMinterRole(
    learnDaoContract.address
  );
  console.log("checkMinterRole", checkMinterRole);

  txn = await learnDaoContract.addMember(ethers.utils.parseEther("10"));
  await txn.wait();

  var balance4 = await tokenContract.balanceOf(accounts[0].getAddress());
  console.log("balance4", balance4);

  // const transferCalldata = tokenContract.interface.encodeFunctionData(
  //   "transfer",
  //   ["0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199", "10"]
  // );
  // console.log("transferCalldata", transferCalldata);

  // learnDaoContract.on("ProposalCreated", (id) => {
  //   console.log("id", id);
  // });

  // var txn = await learnDaoContract.propose(
  //   [tokenContract.address],
  //   [0],
  //   [transferCalldata],
  //   "Proposal #1: Give grant to team"
  // );
  // var rc = await txn.wait();
  // const event = rc.events.find(
  //   (event: any) => event.event === "ProposalCreated"
  // );
  // const [
  //   proposalId,
  //   proposer,
  //   targets,
  //   values,
  //   signatures,
  //   calldatas,
  //   startBlock,
  //   endBlock,
  //   description,
  // ] = event.args;
  // console.log("proposalId", proposalId);
  // console.log("proposer", proposer);
  // console.log("targets", targets);
  // console.log("description", description);

  // var name = await learnDaoContract.name();
  // console.log("name : ", name);

  // var version = await learnDaoContract.version();
  // console.log("version : ", version);

  // var countingMode = await learnDaoContract.COUNTING_MODE();
  // console.log("countingMode : ", countingMode);

  // var votingDelay = await learnDaoContract.votingDelay();
  // console.log("votingDelay : ", votingDelay);

  // var votingPeriod = await learnDaoContract.votingPeriod();
  // console.log("votingPeriod : ", votingPeriod);

  // var state = await learnDaoContract.state(proposalId);
  // console.log("state : ", state);

  // var proposalSnapshot = await learnDaoContract.proposalSnapshot(proposalId);
  // console.log("proposalSnapshot : ", proposalSnapshot);

  // var proposalDeadline = await learnDaoContract.proposalDeadline(proposalId);
  // console.log("proposalDeadline : ", proposalDeadline);

  // var blockNum = await ethers.provider.getBlockNumber();
  // var quorum = await learnDaoContract.quorum(blockNum - 1);
  // console.log("quorum : ", quorum);

  // var getVotes = await learnDaoContract.getVotes(
  //   accounts[0].getAddress(),
  //   blockNum - 1
  // );
  // console.log("accounts[1].getAddress(),", accounts[1].getAddress());
  // console.log("getVotes[0] : ", getVotes);

  // var getVotes2 = await learnDaoContract.getVotes(
  //   accounts[1].getAddress(),
  //   blockNum - 1
  // );
  // console.log("getVotes[1] : ", getVotes2);

  // var txn = await learnDaoContract.castVote(proposalId, 1);
  // var rc = await txn.wait();
  // const voteEvent = rc.events.find((event: any) => event.event === "VoteCast");
  // console.log("voteEvent : ", voteEvent.args);

  // var hasVoted = await learnDaoContract.hasVoted(
  //   proposalId,
  //   accounts[0].getAddress()
  // );
  // console.log("hasVoted : ", hasVoted);

  // var proposalVotes = await learnDaoContract.proposalVotes(proposalId);
  // console.log("proposalVotes : ", proposalVotes);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`err`, err);
    process.exit(1);
  }
};

runMain();
