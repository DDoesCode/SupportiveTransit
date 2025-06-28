// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ServiceRequest {
    struct Service {
        uint id;
        string description;
        uint bidAmount;
        address payable lawyer;
        address payable professional;
        bool completed;
    }

    mapping(uint => Service) public services;
    uint public serviceCounter;

    function createServiceRequest(string memory _description) public {
        serviceCounter++;
        services[serviceCounter] = Service(serviceCounter, _description, 0, payable(0), payable(msg.sender), false);
    }

    function placeBid(uint _serviceId, uint _bidAmount) public {
        Service storage service = services[_serviceId];
        require(!service.completed, "Service already completed");
        service.bidAmount = _bidAmount;
        service.lawyer = payable(msg.sender);
    }

    function completeService(uint _serviceId) public {
        Service storage service = services[_serviceId];
        require(msg.sender == service.professional, "Only the requester can complete the service");
        service.completed = true;
        service.lawyer.transfer(service.bidAmount); // Pay the lawyer
    }
}
