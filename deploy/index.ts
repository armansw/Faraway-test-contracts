import green from 'chalk';
import underline from 'chalk';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { run } from "hardhat";
import { sleep } from "./utils";

/**
 * @usage yarn hardhat deploy --network goerli [mumbai]
 */

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  const [deployer] = await hre.ethers.getSigners();

  // --- ETH (testnet) deploy and verify script
  if (['mumbai', 'goerli', 'localhost'].includes(hre.network.name)) {
    console.log(`\n ${green(underline('goerli'))}`);
    // deploy contract
    const cont = await hre.ethers.getContractFactory("MyToken");
    const contract = await cont.deploy('TestProject', 'TestProject', 'https://base_uri');
    await contract.connect(deployer).deployed();
    console.log("MyToken: ", contract.address);


    const myFactory = await hre.ethers.getContractFactory("MyTokenFactory");
    const factory = await myFactory.deploy(); 
    await factory.connect(deployer.address).deployed();    
    console.log("MyTokenFactory:", factory.address);

    await sleep(60000 * 1);

    await run("verify:verify", {
        address: contract.address,
        constructorArguments: ['TestProject', 'TestProject', 'https://base_uri'],
    });

    await sleep(60000 * 1);

    await run("verify:verify", {
        address: factory.address,
        //constructorArguments: [contract.address, deployer.address],
    });
  }

  // --- ETH (mainnet)
  if (['eth'].includes(hre.network.name)) {
    console.log(`\n ${green(underline('ETH'))}`);

    // deploy contract
    const cont = await hre.ethers.getContractFactory("MyToken");
    const contract = await cont.deploy('TestProject', 'TestProject', 'https://base_uri');
    await contract.connect(deployer).deployed();
    console.log("MyToken: ", contract.address);


    const myFactory = await hre.ethers.getContractFactory("MyTokenFactory");
    const factory = await myFactory.deploy(); 
    await factory.connect(deployer.address).deployed();    
    console.log("MyTokenFactory:", factory.address);

  }
};
export default func;