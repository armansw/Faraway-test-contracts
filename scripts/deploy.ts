import yellow from 'chalk';
import underline from 'chalk';
import { ethers } from "hardhat";

/**
 * @usage yarn hardhat node
 * @usage yarn hardhat run --network localhost scripts/deploy.ts
 */
 async function main() {
  const [deployer] = await ethers.getSigners();

  // --- BSC
  console.log(`\n ${yellow(underline('ETH'))}`);
    // deploy contract
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
