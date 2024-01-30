import { StakeWiseSDK, Network } from '@stakewise/v3-sdk'
import { ethers } from 'ethers'

const sdk = new StakeWiseSDK({ network: Network.Mainnet })

const inputEl = document.getElementById('input-el')
const updateBtn = document.getElementById('update-btn')

// const stakedAssets = document.getElementById('staked-assets')
// const mintedAssets = document.getElementById('minted-assets')
// const mintedShares = document.getElementById('minted-shares')
const consensusRewardsEarned = document.getElementById('consensus-rewards-earned')
const consensusRewardsMissed = document.getElementById('consensus-rewards-missed')
const executonMevEarned = document.getElementById('execution-mev-earned')
const executonMevMissed = document.getElementById('execution-mev-missed')

const vaultAddress = '0xAC0F906E433d58FA868F936E8A43230473652885'
const userAddress = '0x2365887bBdb7fF611F54b380573a5055170fAE7D'

// const baseData = await sdk.osToken.getBaseData()

// const stakeBalance = await sdk.vault.getStakeBalance({
//     userAddress: userAddress,
//     vaultAddress: vaultAddress,
// })

// const position = await sdk.osToken.getPosition({
//     stakedAssets: stakeBalance.assets,
//     userAddress: userAddress,
//     vaultAddress: vaultAddress,
//     thresholdPercent: baseData.thresholdPercent,
// })

updateBtn.addEventListener('click', getScore)

async function getScore() {
    const scoring = await sdk.vault.getScoring({
        vaultAddress: inputEl.value,
    })

    consensusRewardsEarned.innerText = `Consensus Rewards Earned: ${ethers.formatEther(scoring.consensusRewardsEarned)}`
    consensusRewardsMissed.innerText = `Consensus Rewards Missed: ${ethers.formatEther(scoring.consensusRewardsMissed)}`
    executonMevEarned.innerText = `Execution MEV Earned: ${ethers.formatEther(scoring.executionMevEarned)}`
    executonMevMissed.innerText = `Execution MEV Missed: ${ethers.formatEther(scoring.executionMevMissed)}`
}


// stakedAssets.innerText = `Staked Assets: ${ethers.formatEther(stakeBalance.assets)}`
// mintedShares.innerText = `Minted Shares: ${ethers.formatEther(position.minted.shares)}`
// mintedAssets.innerText = `Minted Assets: ${ethers.formatEther(position.minted.assets)}`



