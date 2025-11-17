const remoteManifestUrl = 'https://epsont.github.io/Link_Youla/manifest.json ';
// Получаем текущую версию из локального manifest.json
const currentVersion = chrome.runtime.getManifest().version;

// Проверка обновления через удалённый manifest.json
async function checkForUpdate() {
    try {
        const response = await fetch(remoteManifestUrl);

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }
        
        let remoteManifest;
        try {
            remoteManifest = await response.json();
        } catch (e) {
            throw new Error('Не удалось распарсить JSON');
        }

        if (!remoteManifest || !remoteManifest.version) {
            throw new Error('Неверный формат данных: нет поля "version" в manifest.json');
        }

        const remoteVersion = remoteManifest.version;
        if (isNewerVersion(remoteVersion, currentVersion)) {
            console.log(`Доступна новая версия: ${remoteVersion}`);
            chrome.notifications.create('update-available', {
                type: 'basic',
                iconUrl: 'icons/128.png',
                title: 'Доступно обновление!',
                message: `Вышла новая версия: ${remoteVersion}\nКликни на меня для скачивания новой версии!`,
                priority: 2
            });
            const manifestData = chrome.runtime.getManifest();
            const updateUrl = manifestData.update_url
            chrome.notifications.onClicked.addListener((id) => {
                if (id === 'update-available') {
                    chrome.tabs.create({ url: updateUrl });
                }
            });
        } else {
            console.log('Обновлений нет.');
        }

    } catch (error) {
        console.error('Ошибка при проверке обновления:', error);
    }
}

// Функция сравнения версий
function isNewerVersion(a, b) {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        if (partsA[i] > partsB[i]) return true;
        if (partsA[i] < partsB[i]) return false;
    }

    return false;
}

// Слушатель сообщений
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "check_update") {
        checkForUpdate();
    }
});