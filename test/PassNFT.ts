import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Pass NFT contract", function () {
  async function deployFixture() {
    const baseTokenUri = "https://base-uri.com/path/";
    const tokenFileName = "Token.png";

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const passNft = await hre.ethers.getContractFactory("TestPassNFT");
    const passNftContract = await passNft.deploy(baseTokenUri, tokenFileName);

    return {
      passNftContract,
      baseTokenUri,
      tokenFileName,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { passNftContract, owner } = await loadFixture(deployFixture);

      expect(await passNftContract.owner()).to.equal(owner.address);
    });

    it("Should set the correct properties", async function () {
      const { passNftContract, owner, baseTokenUri, tokenFileName } =
        await loadFixture(deployFixture);

      expect(await passNftContract.mintPrice()).to.equal(
        hre.ethers.parseUnits("0.01", "ether")
      );
      expect(await passNftContract.totalSupply()).to.equal(0);
      expect(await passNftContract.maxSupply()).to.equal(10000);
      expect(await passNftContract.maxPerWallet()).to.equal(1);
      expect(await passNftContract.withdrawWallet()).to.equal(owner);
      expect(await passNftContract.getBaseTokenUri()).to.equal(baseTokenUri);
      expect(await passNftContract.getTokenMetadataFilename()).to.equal(
        tokenFileName
      );
    });

    it("Should fail if the baseTokenUri is an empty string", async function () {
      const baseTokenUri = "";
      const tokenFileName = "Token.png";
      const passNftContract = await hre.ethers.getContractFactory("PassNFT");
      await expect(
        passNftContract.deploy(baseTokenUri, tokenFileName)
      ).to.be.revertedWith("baseTokenUri should not be empty");
    });

    it("Should fail if the tokenFileName is an empty string", async function () {
      const baseTokenUri = "https://base-uri.com/path/";
      const tokenFileName = "";
      const passNftContract = await hre.ethers.getContractFactory("PassNFT");
      await expect(
        passNftContract.deploy(baseTokenUri, tokenFileName)
      ).to.be.revertedWith("tokenMetadataFilename should not be empty");
    });
  });

  describe("Interactions", function () {
    describe("withdrawWallet", function () {
      it("Should update the withdraw wallet address if called from owner account", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await passNftContract.setWithdrawWallet(otherAccount);

        expect(await passNftContract.withdrawWallet()).to.equal(otherAccount);
      });

      it("Should fail updating the withdraw wallet address if called from another account", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          passNftContract.connect(otherAccount).setWithdrawWallet(otherAccount)
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
    describe("isPublicMintEnabled", function () {
      it("Should update the public mint ability if called from owner account", async function () {
        const { passNftContract } = await loadFixture(deployFixture);

        await passNftContract.setIsPublicMintEnabled(true);

        expect(await passNftContract.isPublicMintEnabled()).to.equal(true);
      });

      it("Should fail updating the public mint ability if called from another account", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          passNftContract.connect(otherAccount).setIsPublicMintEnabled(true)
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });

    //TODO: Test setBaseTokenUri and setTokenMetadataFilename functions
  });

  describe("Transactions", function () {
    describe("Mint", function () {
      it("Should fail minting if isPublicMintEnabled is disabled", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          passNftContract.connect(otherAccount).mint(1)
        ).to.be.revertedWith("Mint is not enabled");
      });

      it("Should fail minting if provided a not correct amount", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await passNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await passNftContract.mintPrice();
        const res = passNftContract
          .connect(otherAccount)
          .mint(2, { value: mintPrice });

        await expect(res).to.be.revertedWith("Wrong mint value");
      });

      it("Should mint if provided a correct amount", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await passNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await passNftContract.mintPrice();
        await passNftContract
          .connect(otherAccount)
          .mint(1, { value: mintPrice });

        expect(await passNftContract.balanceOf(otherAccount)).to.equal(
          BigInt(1)
        );
        expect(await passNftContract.totalSupply()).to.equal(1);
        expect(
          await passNftContract.walletMints(otherAccount.address)
        ).to.equal(1);
      });

      it("Should fail minting if exceed max per wallet", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await passNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await passNftContract.mintPrice();
        await passNftContract
          .connect(otherAccount)
          .mint(1, { value: mintPrice });

        const res = passNftContract
          .connect(otherAccount)
          .mint(1, { value: mintPrice });

        await expect(res).to.be.revertedWith("Exceed max per wallet");
      });
    });
    describe("Withdraw", function () {
      it("Should withdraw funds if called from owner account", async function () {
        const { passNftContract, otherAccount, owner } = await loadFixture(
          deployFixture
        );
        await passNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await passNftContract.mintPrice();
        await passNftContract
          .connect(otherAccount)
          .mint(1, { value: mintPrice });
        const address = await passNftContract.getAddress();
        const balance = await ethers.provider.getBalance(address);
        await expect(await passNftContract.withdraw()).to.changeEtherBalances(
          [owner, passNftContract],
          [balance, -balance]
        );
      });

      it("Should fail withdraw funds if called from another account", async function () {
        const { passNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          passNftContract.connect(otherAccount).withdraw()
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
  });
});
