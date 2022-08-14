// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol";

import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

import "hardhat/console.sol";

/**
 * @title Simple777Recipient
 * @dev Very simple ERC777 Recipient
 */
contract Simple777Recipient is IERC777Recipient {

    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");

    IERC777 private _token;

    event DoneStuff(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    constructor (address token) {
        _token = IERC777(token);

        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));

        console.log("Recipient constructor -- token contract address: %s , Recipient contract address: %s", token, address(this));
        // console.log("TOKENS_RECIPIENT_INTERFACE_HASH: %s", TOKENS_RECIPIENT_INTERFACE_HASH);
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external {
        require(msg.sender == address(_token), "Simple777Recipient: Invalid token");

        // do stuff
        console.log("DoneStuff event");
        // console.log("$s $s $s $o $s $s", operator, from, to, amount, userData, operatorData);
        emit DoneStuff(operator, from, to, amount, userData, operatorData);
    }
}
