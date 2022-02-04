// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "hardhat/console.sol";

interface ERC20Interface {
    function mint(address to, uint256 amount) external;
}

/// @custom:security-contact viral.sangani2011@gmail.com
contract LearnDAOGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction
{
    address _daiToken = address(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    address _governanceToken;

    constructor(ERC20Votes _token, string memory _name)
        Governor(_name)
        GovernorSettings(
            0, /* 0 block by default for testing */
            103680, /* 3 days */
            0
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
    {
        _governanceToken = address(_token);
    }

    function addMember(uint256 _amount) public {
        require(
            IERC20(_daiToken).allowance(msg.sender, address(this)) >= _amount,
            "DAI allowance not set"
        );
        IERC20(_daiToken).transferFrom(msg.sender, address(this), _amount);
        ERC20Interface(_governanceToken).mint(address(msg.sender), _amount);
    }

    function receiveEthForTransactions() public payable {
        require(msg.value >= 1 ether, "Minimum 1 ether required");
        console.log("Received ==> ", msg.value);
    }

    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function getVotes(address account, uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotes)
        returns (uint256)
    {
        return super.getVotes(account, blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}
