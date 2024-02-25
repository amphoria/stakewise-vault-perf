import { StakeWiseSDK, Network } from '@stakewise/v3-sdk'
import { ethers } from 'ethers'


const sdk = new StakeWiseSDK({ network: Network.Mainnet })

// vaultsArray is an array of vault objects giving the name and address of the vault
let vaultsArray = []

const vaultName = document.getElementById('vault-name')
const vaultAddress = document.getElementById('vault-address')
const submitBtn = document.getElementById('submit-btn')
const deleteBtn = document.getElementById('delete-btn')
const vaultEl = document.getElementById('vault-el')
const updateBtn = document.getElementById('update-btn')

const total = document.getElementById('total')
const withdrawable = document.getElementById('withdrawable')
const exitQueueIndex = document.getElementById('exit-queue-index')
const positionTicket = document.getElementById('position-ticket')
const timestamp = document.getElementById('timestamp')

const genesisVaultAddress = '0xAC0F906E433d58FA868F936E8A43230473652885'

vaultName.addEventListener('change', vaultChanged)
vaultAddress.addEventListener('change', vaultChanged)
submitBtn.addEventListener('click', addVault)
deleteBtn.addEventListener('click', deleteVault)
updateBtn.addEventListener('click', getPositionData)

function vaultChanged() {
    submitBtn.disabled = false
}

function addVault(e) {
    e.preventDefault();
    const vaultNameAddr = {
        name: vaultName.value,
        address: vaultAddress.value
    }
    vaultsArray.push(vaultNameAddr)
    writeCookie(vaultsArray)
    let html = ""
    vaultsArray.forEach((vault) => {
        html += `<option value='${vault.name}: ${vault.address}'>${vault.name}: ${vault.address}</option>`
    })
    vaultEl.innerHTML = html
    submitBtn.disabled = true
}

function deleteVault(e) {
    e.preventDefault();
    const index = vaultsArray.findIndex((vault) => {
        return (vault.name === vaultName.value) && (vault.address === vaultAddress.value)
    })
    vaultsArray.splice(index, 1)
    writeCookie(vaultsArray)
    vaultName.value = vaultsArray[0].name
    vaultAddress.value = vaultsArray[0].address
    let html = ""
    vaultsArray.forEach((vault) => {
        html += `<option value='${vault.name}: ${vault.address}'>${vault.name}: ${vault.address}</option>`
    })
    vaultEl.innerHTML = html
    deleteBtn.disabled = true
}

function getCookie(caddr) {
    let address = caddr + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i <ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(address) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function writeCookie(array) {
    const arrayStr = JSON.stringify(array)
    document.cookie = `stakewiseVaults=${arrayStr}`
}

async function getPositionData() {
    const nameAddr = vaultEl.value.split(': ')
    vaultName.value = nameAddr[0]
    vaultAddress.value = nameAddr[1]
    if (vaultsArray.length > 1) {
        deleteBtn.disabled = false
    }

    const output = await sdk.vault.getExitQueuePositions({
        userAddress: "0x2365887bBdb7fF611F54b380573a5055170fAE7D",
        vaultAddress: nameAddr[1]
    })

    total.innerText = `Total: ${ethers.formatEther(output.total)}`
    withdrawable.innerText = `Withdrawable: ${output.withdrawable}`
}

function setupInputs() {
    const cookie = getCookie("stakewiseVaults")

    if (cookie != "") {
        const array = cookie.split('=')
        vaultsArray = JSON.parse(array[1])
    } else {
        vaultsArray[0] = {
            name: "Genesis",
            address: genesisVaultAddress
        }
        writeCookie(vaultsArray)
    }
    vaultName.value = vaultsArray[0].name
    vaultAddress.value = vaultsArray[0].address
    let html = ""
    vaultsArray.forEach((vault) => {
        html += `<option value='${vault.name}: ${vault.address}'>${vault.name}: ${vault.address}</option>`
    })
    console.log(html)
    vaultEl.innerHTML = html
}

setupInputs()



