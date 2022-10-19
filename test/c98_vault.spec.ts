import hre, { ethers, web3 } from "hardhat";
import { expect } from "chai";
import {
  Coin98Vault,
  Coin98VaultFactory,
  Coin98Vault__factory,
  Coin98VaultFactory__factory,
} from "../typechain-types";
import { Bytes } from "ethers";

describe("Coin98_Fault_test", function () {
  let Coin98Vault: Coin98Vault__factory;
  let coin98VaultAddress: String;
  let Coin98VaultFactory: Coin98VaultFactory__factory;
  let coin98VaultFactoryAddress: String;
  this.beforeAll(async function () {
    Coin98Vault = await hre.ethers.getContractFactory("Coin98Vault");
    Coin98VaultFactory = await hre.ethers.getContractFactory(
      "Coin98VaultFactory"
    );

    const coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed().then((result) => {
      coin98VaultAddress = result.address;
    });

    const coin98VaultFactory = await Coin98VaultFactory.deploy(
      coin98Vault?.address,
      {}
    );
    await coin98VaultFactory.deployed().then((result) => {
      coin98VaultFactoryAddress = result.address;
    });
  });

  it("Deployment Vault :", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    console.log("coin98VaultAddress", coin98VaultAddress);
  });

  it("Init Vault : ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed().then(async (c98Vault) => {
      await init(c98Vault);
    });
  });

  it("Create new Vault : ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    const coin98VaultFactory: Coin98VaultFactory =
      await Coin98VaultFactory.deploy(coin98Vault?.address, {});
    await coin98VaultFactory.deployed().then(async (c98VaultFactory) => {
      const saltHex = await web3.utils.numberToHex(77);
      const saltBytes = await ethers.utils.hexZeroPad(saltHex, 32);
      await createVault(c98VaultFactory, coin98Vault.address, saltBytes);
    });
  });

  it("Get all vault: ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    const coin98VaultFactory: Coin98VaultFactory =
      await Coin98VaultFactory.deploy(coin98Vault?.address, {});
    await coin98VaultFactory.deployed().then(async (c98VaultFactory) => {
      await vaults(c98VaultFactory);
    });
  });

  it("Get vault address: ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    const coin98VaultFactory: Coin98VaultFactory =
      await Coin98VaultFactory.deploy(coin98Vault?.address, {});
    await coin98VaultFactory.deployed().then(async (c98VaultFactory) => {
      const saltHex = await web3.utils.numberToHex(44);
      const saltBytes = await ethers.utils.hexZeroPad(saltHex, 32);
      await getVaultAddress(c98VaultFactory, saltBytes);
    });
  });

  it("Set gas limit : ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    const coin98VaultFactory: Coin98VaultFactory =
      await Coin98VaultFactory.deploy(coin98Vault?.address, {});
    await coin98VaultFactory.deployed().then(async (c98VaultFactory) => {
      await setGasLimit(c98VaultFactory, 11111);
    });
  });

  it("get gas limit: ", async function () {
    const coin98Vault: Coin98Vault = await Coin98Vault.deploy();
    await coin98Vault.deployed();
    const coin98VaultFactory: Coin98VaultFactory =
      await Coin98VaultFactory.deploy(coin98Vault?.address, {});
    await coin98VaultFactory.deployed().then(async (c98VaultFactory) => {
      await getGasLimit(c98VaultFactory);
    });
  });
});

async function init(coin98Vault: Coin98Vault) {
  await coin98Vault.init().then((tx) => {
    expect("Init Vault Successfully !!!");
  });
}

async function createVault(
  coin98VaultFactory: Coin98VaultFactory,
  owner_: string,
  salt_: any
) {
  await coin98VaultFactory.createVault(owner_, salt_);
}

async function vaults(coin98VaultFactory: Coin98VaultFactory) {
  let arrAddress = await coin98VaultFactory.vaults();
  console.log("All Vault", arrAddress);
}

async function getVaultAddress(
  coin98VaultFactory: Coin98VaultFactory,
  salt_: string
) {
  const address = await coin98VaultFactory.getVaultAddress(salt_);
  console.log("vaultAddress", address);
}

async function setGasLimit(
  coin98VaultFactory: Coin98VaultFactory,
  limit_: number
) {
    await coin98VaultFactory.setGasLimit(limit_);
    expect("Set gas limit successfully!!!");
  };


async function getGasLimit(coin98VaultFactory: Coin98VaultFactory) {
  await coin98VaultFactory.gasLimit().then((gas) => {
    console.log("gas limit", gas.toString());
    expect("Set gas limit successfully!!!");
  });


}
