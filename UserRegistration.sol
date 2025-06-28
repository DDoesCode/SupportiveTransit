// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow1 {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;

    bool public isCompleted;

    constructor(address _lawyer, address payable _payee, uint _amount) {
        lawyer = _lawyer;
        payee = _payee;
        amount = _amount;
        payer = msg.sender;
    }

    function deposit() public payable {
        require(msg.value == amount, "Incorrect amount");
    }

    function release() public {
        require(msg.sender == payer, "Only payer can release");
        require(isCompleted, "Service not completed yet");
        payee.transfer(amount);
    }

    function markCompleted() public {
        require(msg.sender == lawyer, "Only lawyer can mark as completed");
        isCompleted = true;
    }
}
