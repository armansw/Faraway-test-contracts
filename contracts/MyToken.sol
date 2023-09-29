// SPDX-License-Identifier: ISC

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MyToken is ERC721, ERC721URIStorage, Ownable {

    string public base_URI;
    uint256 public tokenId;

    /**
    * @notice Emitted when new token is minted.
    * @param collection address of this contract.
    * @param recipient owner of minted token.
    * @param tokenId id of minted token.
    * @param tokenURI uri of minted token.
    */
    event TokenMinted(address collection, address recipient, uint256 tokenId, string tokenURI);


    constructor(string memory _name, string memory _symbol, string memory _baseUri) ERC721(_name, _symbol){
        base_URI = _baseUri;
        tokenId = 0;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(address _to, string memory _tokenURI) public
    {
        uint256 _tokenId = tokenId;
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        tokenId = tokenId + 1;

        emit TokenMinted(address(this), _to, _tokenId, _tokenURI);
    }

    function getTokenId() public view returns (uint256) {return tokenId;}

    // The following functions are overrides required by Solidity.
    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

}