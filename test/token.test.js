const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mint Token", function () {
  it("Should mint token successfully", async function () {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    const tx = await token.mint(
      "https://ipfs.io/ipfs/QmNmEZa32vgd5CsKnA66auzyokTQWpqB4oTUfBp6LNnMUs"
    );

    // wait until the transaction is mined
    await tx.wait();

    expect(await token.tokenURI(0)).to.equal(
      "https://ipfs.io/ipfs/QmNmEZa32vgd5CsKnA66auzyokTQWpqB4oTUfBp6LNnMUs"
    );
  });
});
