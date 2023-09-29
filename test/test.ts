import { expect, util } from "chai";
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Address } from "hardhat-deploy/types";

describe("TestProject", function () {
  let owner!: SignerWithAddress;
  let holder!: SignerWithAddress;
  let externalUser!: SignerWithAddress;
  let contract!: any;
  let factory!: any;

  before(async function () {
    [owner, holder, externalUser] = await ethers.getSigners();
  });

  it("Contract deployment", async function () {
    // deploy contracts
    console.log("------>>>>> deploy contracts <<<<<------");
    const cont = await ethers.getContractFactory("MyToken");
    contract = await cont.deploy("Sample", "Sample", "https://baseuri" );
    await contract.connect(owner.address).deployed();

    const tokenFactory = await ethers.getContractFactory("MyTokenFactory");
    factory = await tokenFactory.deploy();
    await factory.connect(owner.address).deployed();

    console.log("----------- contracts deployed -----------");
    console.log("MyToken:", contract.address);
    console.log("MyTokenFactory:", factory.address);
  });

  it("mint token from MyToken", async function () {
    await expect(contract.mint(holder.address, "tokenuri")).to.be.emit(contract, "TokenMinted");
    console.log("----------tokenId 1 was minted");

  });

  it("Create collection", async function () {
    console.log("------>>>>> create collection <<<<<------");
    await expect(
      factory
        .connect(holder)
        .createCollection(
          "version1",
          "version1",
          "https://baseuri"
        )
    ).to.be.emit(factory, "CollectionCreated");
    let newAddress = await factory.connect(owner).getLastCollection();
    console.log(" collection address : ", newAddress);
    let addrList = await factory.connect(owner).getAddresses();
    console.log(" collection address list : ", addrList);

    console.log("------>>>>> mint token from collection <<<<<------");
    await expect(factory.connect(owner).mintToken(newAddress, holder.address, "tokenuri")).to.be.emit(factory, "TokenMinted");
    console.log("----------tokenId 1 was minted");
  });

});
