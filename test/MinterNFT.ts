import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Minter NFT contract", function () {
  async function deployFixture() {
    const baseTokenUri = "https://base-uri.com/path/";
    const tokenFileName = "Token.png";
    const tokenExtensionName = ".png";

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const minterNft = await hre.ethers.getContractFactory("TestMinterNFT");
    const passNft = await hre.ethers.getContractFactory("PassNFT");
    const passNftContract = await passNft.deploy(baseTokenUri, tokenFileName);
    const passNftAddress = await passNftContract.getAddress();
    const minterNftContract = await minterNft.deploy(
      baseTokenUri,
      tokenExtensionName,
      passNftAddress
    );

    return {
      minterNftContract,
      passNftContract,
      baseTokenUri,
      tokenExtensionName,
      passNftAddress,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { minterNftContract, owner } = await loadFixture(deployFixture);

      expect(await minterNftContract.owner()).to.equal(owner.address);
    });

    it("Should set the correct properties", async function () {
      const {
        minterNftContract,
        owner,
        baseTokenUri,
        tokenExtensionName,
        passNftAddress,
      } = await loadFixture(deployFixture);

      expect(await minterNftContract.mintPrice()).to.equal(
        hre.ethers.parseUnits("0", "ether")
      );
      expect(await minterNftContract.totalSupply()).to.equal(0);
      expect(await minterNftContract.withdrawWallet()).to.equal(owner);
      expect(await minterNftContract.isPublicMintEnabled()).to.equal(false);
      expect(await minterNftContract.passNftAddress()).to.equal(passNftAddress);
      expect(await minterNftContract.getBaseTokenUri()).to.equal(baseTokenUri);
      expect(await minterNftContract.getTokenExtensionName()).to.equal(
        tokenExtensionName
      );
    });

    it("Should fail if the baseTokenUri is an empty string", async function () {
      const { passNftAddress } = await loadFixture(deployFixture);
      const baseTokenUri = "";
      const tokenExtensionName = ".png";
      const minterNftContract = await hre.ethers.getContractFactory(
        "TestMinterNFT"
      );
      await expect(
        minterNftContract.deploy(
          baseTokenUri,
          tokenExtensionName,
          passNftAddress
        )
      ).to.be.revertedWith("baseTokenUri should not be empty");
    });

    it("Should fail if the tokenFileName is an empty string", async function () {
      const { passNftAddress } = await loadFixture(deployFixture);
      const baseTokenUri = "https://base-uri.com/path/";
      const tokenExtensionName = "";
      const minterNftContract = await hre.ethers.getContractFactory(
        "TestMinterNFT"
      );
      await expect(
        minterNftContract.deploy(
          baseTokenUri,
          tokenExtensionName,
          passNftAddress
        )
      ).to.be.revertedWith("tokenExtensionName should not be empty");
    });
  });

  describe("Interactions", function () {
    describe("withdrawWallet", function () {
      it("Should update the withdraw wallet address if called from owner account", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await minterNftContract.setWithdrawWallet(otherAccount);

        expect(await minterNftContract.withdrawWallet()).to.equal(otherAccount);
      });

      it("Should fail updating the withdraw wallet address if called from another account", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          minterNftContract
            .connect(otherAccount)
            .setWithdrawWallet(otherAccount)
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
    describe("isPublicMintEnabled", function () {
      it("Should update the public mint ability if called from owner account", async function () {
        const { minterNftContract } = await loadFixture(deployFixture);

        await minterNftContract.setIsPublicMintEnabled(true);

        expect(await minterNftContract.isPublicMintEnabled()).to.equal(true);
      });

      it("Should fail updating the public mint ability if called from another account", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          minterNftContract.connect(otherAccount).setIsPublicMintEnabled(true)
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });

    //TODO: Test setBaseTokenUri and setTokenExtensionName functions
  });

  describe("Transactions", function () {
    describe("Mint", function () {
      it("Should fail minting if isPublicMintEnabled is disabled", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          minterNftContract.connect(otherAccount).mint()
        ).to.be.revertedWith("Mint is not enabled");
      });

      it("Should fail minting if pass NFT is not minted", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await minterNftContract.setIsPublicMintEnabled(true);

        await expect(
          minterNftContract.connect(otherAccount).mint()
        ).to.be.revertedWith("Pass NFT is not minted");
      });

      it("Should mint if public mint enabled and pass NFT is minted", async function () {
        const { minterNftContract, passNftContract, otherAccount } =
          await loadFixture(deployFixture);

        await passNftContract.setIsPublicMintEnabled(true);
        const passNftMintPrice = await passNftContract.mintPrice();
        await passNftContract
          .connect(otherAccount)
          .mint(1, { value: passNftMintPrice });

        await minterNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await minterNftContract.mintPrice();
        await minterNftContract
          .connect(otherAccount)
          .mint({ value: mintPrice });

        expect(await minterNftContract.balanceOf(otherAccount)).to.equal(
          BigInt(1)
        );
        expect(await minterNftContract.totalSupply()).to.equal(1);
      });
    });
    describe("Withdraw", function () {
      it("Should withdraw funds if called from owner account", async function () {
        const { minterNftContract, passNftContract, otherAccount, owner } =
          await loadFixture(deployFixture);
        await passNftContract.setIsPublicMintEnabled(true);
        const passNftMintPrice = await passNftContract.mintPrice();
        await passNftContract
          .connect(otherAccount)
          .mint(1, { value: passNftMintPrice });

        await minterNftContract.setIsPublicMintEnabled(true);
        const mintPrice = await minterNftContract.mintPrice();
        await minterNftContract
          .connect(otherAccount)
          .mint({ value: mintPrice });
        const address = await minterNftContract.getAddress();
        const balance = await ethers.provider.getBalance(address);
        await expect(await minterNftContract.withdraw()).to.changeEtherBalances(
          [owner, minterNftContract],
          [balance, -balance]
        );
      });

      it("Should fail withdraw funds if called from another account", async function () {
        const { minterNftContract, otherAccount } = await loadFixture(
          deployFixture
        );

        await expect(
          minterNftContract.connect(otherAccount).withdraw()
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });
  });
});
