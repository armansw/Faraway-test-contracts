// SPDX-License-Identifier: ISC

/// @title The MyToken Factory


pragma solidity ^0.8.9;


import "@openzeppelin/contracts/access/Ownable.sol";

import "./MyToken.sol";
import { IMyTokenFactory } from "./interfaces/IMyTokenFactory.sol";

import "hardhat/console.sol";


/**
 * @title A factory to create NFT collections.
 * @notice Call this factory to create an NFT collection contract managed by a single owner.
 * @dev This creates and initializes an ERC-1165 minimal proxy pointing to the NFT collection contract template.
 */ 
contract MyTokenFactory is IMyTokenFactory, Ownable {

    address[] public tokenAddresses;  
  
    /**
     * @notice Create a new collection contract.
     * @dev The nonce is required and must be unique for the msg.sender + implementation version,
     * otherwise this call will revert.
     * @param name The name for the new collection being created.
     * @param symbol The symbol for the new collection being created.
     * @param baseuri The baseuri for the new collection being created.
     */
    function createCollection(
        string calldata name,
        string calldata symbol,
        string calldata baseuri
      ) public returns (address) {
        require(bytes(name).length != 0, "MyTokenFactory: name is required");
        require(bytes(symbol).length != 0, "MyTokenFactory: symbol is required");

        MyToken myToken = new MyToken(name, symbol, baseuri);
        tokenAddresses.push(address(myToken));
        
        emit CollectionCreated(address(myToken), name, symbol);
        return address(myToken);
    }

    function mintToken(address collection, address to, string memory tokenURI) public {
        MyToken myToken = MyToken(collection);
        uint256 tokenId = myToken.getTokenId();
        myToken.mint(to, tokenURI);

        emit TokenMinted(collection, to, tokenId, tokenURI);
    }

    function getLastCollection() public view returns(address) {
        return tokenAddresses[tokenAddresses.length-1];
    }

    function getAddresses() public view returns(address[] memory) {
        return tokenAddresses;
    }

}