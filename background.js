// Script ini memantau semua request jaringan
browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      // Cari header "Authorization"
      for (let header of details.requestHeaders) {
        if (header.name.toLowerCase() === 'authorization') {
          // Jika ditemukan dan berisi "Bearer", simpan tokennya
          if (header.value && header.value.toLowerCase().startsWith('bearer ')) {
            const token = header.value.substring(7); // Ambil token saja tanpa "Bearer "
            browser.storage.local.set({ bearerToken: token });
          }
          break;
        }
      }
    },
    // Filter: hanya pantau request ke API Pertamina
    { urls: ["*://api-map.my-pertamina.id/*"] },
    ["requestHeaders"]
  );