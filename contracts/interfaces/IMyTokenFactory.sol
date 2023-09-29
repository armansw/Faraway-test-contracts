// SPDX-License-Identifier: ISC

/// @title Interface for MyTokenFactory


pragma solidity ^0.8.9;


interface IMyTokenFactory {
    /**
    * @notice Emitted when a new collection is created from this factory.
    * @param collection address of the new NFT collection contract.
    * @param name The name of the collection contract created.
    * @param symbol The symbol of the collection contract created.
    * used to define the address of the collection.
    */
    event CollectionCreated(address collection, string name, string symbol);

    /**
    * @notice Emitted when new token is minted.
    * @param collection address of this contract.
    * @param recipient owner of minted token.
    * @param tokenId id of minted token.
    * @param tokenURI uri of minted token.
    */
    event TokenMinted(address collection, address recipient, uint256 tokenId, string tokenURI);
}