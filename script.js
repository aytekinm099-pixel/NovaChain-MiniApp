const walletElement = document.getElementById("wallet-address");
const gramElement = document.getElementById("gram-balance");
const novaElement = document.getElementById("nova-balance");

async function loadWalletData(address) {
    try {
        const response = await fetch(
            `https://novachain-api.aytekinm099.workers.dev/wallet?address=${encodeURIComponent(address)}`
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "API Error");
        }

        walletElement.textContent = address;
        gramElement.textContent = `${data.gram} GRAM`;
        novaElement.textContent = `${data.nova} NOVA`;

    } catch (err) {
        console.error(err);

        gramElement.textContent = "Hata";
        novaElement.textContent = "Hata";
    }
}

async function init() {

    if (!window.tonConnectUI) {
        console.error("TON Connect başlatılamadı.");
        return;
    }

    const wallet = window.tonConnectUI.wallet;

    if (wallet && wallet.account) {
        loadWalletData(wallet.account.address);
    }

    window.tonConnectUI.onStatusChange((wallet) => {

        if (!wallet) {
            walletElement.textContent = "Wallet bağlı değil";
            gramElement.textContent = "0 GRAM";
            novaElement.textContent = "0 NOVA";
            return;
        }

        loadWalletData(wallet.account.address);

    });
}

init();
