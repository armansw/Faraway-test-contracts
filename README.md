# Faraway-test-contracts

This contract source is based on hardhat project.

It is needed to set mnemonic at .env file to deploy and test.

## Available Commands


```shell

# package install
$ yarn

# clean
$ yarn clean

# compile
$ yarn compile

# test
$ yarn test

# deploy on goerli

$ yarn deploy:goerli
```

### Notice

Token mint is processed at Factory contract because of availability to track tokenMint events at backend side.
If Token is minted at each NFT contract directly, then backend will have to track more and more nft contracts as collections are created.
Thus, CreateCollection will create new collection, and user can mint token at factory contract for owned collection.

Then backend will only observe Factory contract for createCollection and TokenMinted events.

