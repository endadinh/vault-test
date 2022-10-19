import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-web3";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
