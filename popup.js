document.addEventListener('DOMContentLoaded', () => {
    const tokenDisplay = document.getElementById('token-display');
    const copyButton = document.getElementById('copy-button');
    const deleteButton = document.getElementById('delete-button');
    const statusMessage = document.getElementById('status-message');

    // Fungsi untuk memperbarui UI berdasarkan ada atau tidaknya token
    const updateUI = (token) => {
        if (token) {
            tokenDisplay.value = token;
            statusMessage.textContent = 'Token berhasil ditemukan.';
            copyButton.disabled = false;
            deleteButton.disabled = false;
        } else {
            tokenDisplay.value = 'Token tidak tersedia.';
            statusMessage.textContent = 'Silakan login di web MyPertamina.';
            copyButton.disabled = true;
            deleteButton.disabled = true;
        }
    };

    // Ambil token saat popup dibuka
    browser.storage.local.get("bearerToken").then((result) => {
        updateUI(result.bearerToken);
    });

    // Listener untuk memantau perubahan pada storage
    browser.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.bearerToken) {
            updateUI(changes.bearerToken.newValue);
        }
    });

    // Fungsi tombol salin
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(tokenDisplay.value).then(() => {
            statusMessage.textContent = 'Berhasil disalin ke clipboard!';
            setTimeout(() => {
                if(tokenDisplay.value !== 'Token tidak tersedia.') {
                   statusMessage.textContent = 'Token berhasil ditemukan.';
                }
            }, 2000);
        });
    });

    // Fungsi tombol hapus
    deleteButton.addEventListener('click', () => {
        browser.storage.local.remove("bearerToken").then(() => {
            tokenDisplay.value = 'Token tidak tersedia.';
            statusMessage.textContent = 'Token berhasil dihapus.';
            copyButton.disabled = true;
            deleteButton.disabled = true;
        });
    });
});