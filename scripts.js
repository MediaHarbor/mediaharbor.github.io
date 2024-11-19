var myFullpage = new fullpage('#fullpage', {
    scrollOverflow: true,
    navigation: true,
    slidesNavigation: true,
    controlArrows: true,
    parallax: true
});
class DownloadManager {
    constructor() {
        this.elements = {
            windows: {
                btn: document.getElementById("winDownloadBtn"),
                setup: document.getElementById("winDownloadSetup"),
                portableZip: document.getElementById("winDownloadPortableZip"),
                portableExe: document.getElementById("winDownloadPortableExe")
            },
            mac: {
                btn: document.getElementById("macDownloadBtn"),
                x64: document.getElementById("macDownloadX64"),
                arm64: document.getElementById("macDownloadArm64")
            },
            linux: {
                btn: document.getElementById("linuxDownloadBtn"),
                portableZip: document.getElementById("linuxDownloadPortable"),
                deb: document.getElementById("linuxDownloadDeb"),
                snap: document.getElementById("linuxDownloadSnap"),
                appimage: document.getElementById("linuxDownloadAppImage")
            }
        };
        this.dropdowns = {}
        this.initializeDownloads();
    }

    async initializeDownloads() {
        try {
            this.setLoading(true);
            const data = await this.fetchLatestRelease();
            this.updateDownloadLinks(data);
            this.initializeDropdowns();
            this.setupClickOutsideListener();
        } catch (error) {
            console.error("Error initializing downloads:", error);
            this.handleError();
        } finally {
            this.setLoading(false);
        }
    }

    async fetchLatestRelease() {
        const response = await fetch("https://api.github.com/repos/MediaHarbor/mediaharbor/releases/latest");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    }

    updateDownloadLinks(data) {
        data.assets.forEach(asset => {
            const { name, browser_download_url } = asset;

            // Windows downloads
            if (name.includes("Setup") && name.endsWith(".exe")) {
                this.elements.windows.setup.href = browser_download_url;
                this.elements.windows.setup.setAttribute("data-version", data.tag_name);
            } else if (name.includes("Windows.Portable") && name.endsWith(".zip")) {
                this.elements.windows.portableZip.href = browser_download_url;
                this.elements.windows.portableZip.setAttribute("data-version", data.tag_name);
            } else if (name.includes("MediaHarbor") && name.endsWith(".exe")) {
                this.elements.windows.portableExe.href = browser_download_url;
                this.elements.windows.portableExe.setAttribute("data-version", data.tag_name);
            }

            // macOS downloads
            if (name.includes("x64") && name.endsWith(".dmg")) {
                this.elements.mac.x64.href = browser_download_url;
                this.elements.mac.x64.setAttribute("data-version", data.tag_name);
            } else if (name.includes("arm64") && name.endsWith(".dmg")) {
                this.elements.mac.arm64.href = browser_download_url;
                this.elements.mac.arm64.setAttribute("data-version", data.tag_name);
            }

            // Linux downloads
            if (name.endsWith(".AppImage")) {
                this.elements.linux.appimage.href = browser_download_url;
                this.elements.linux.appimage.setAttribute("data-version", data.tag_name);
            } else if (name.endsWith(".deb")) {
                this.elements.linux.deb.href = browser_download_url;
                this.elements.linux.deb.setAttribute("data-version", data.tag_name);
            } else if (name.endsWith(".snap")) {
                this.elements.linux.snap.href = browser_download_url;
                this.elements.linux.snap.setAttribute("data-version", data.tag_name);
            } else if (name.includes("Linux.Portable") && name.endsWith(".zip")) {
                this.elements.linux.portableZip.href = browser_download_url;
                this.elements.linux.portableZip.setAttribute("data-version", data.tag_name);
            }
        });
    }

    initializeDropdowns() {
        this.dropdowns = {
            windows: new bootstrap.Dropdown(this.elements.windows.btn),
            mac: new bootstrap.Dropdown(this.elements.mac.btn),
            linux: new bootstrap.Dropdown(this.elements.linux.btn)
        };

        // Add click event listeners to toggle dropdowns
        Object.entries(this.dropdowns).forEach(([platform, dropdown]) => {
            this.elements[platform].btn.addEventListener("click", (e) => {
                e.preventDefault();
                dropdown.toggle();
            });
        });
    }

    setupClickOutsideListener() {
        document.addEventListener('click', (event) => {
            const isClickInside = Object.values(this.elements).some(platform => {
                return Object.values(platform).some(element => element.contains(event.target));
            });

            if (!isClickInside) {
                Object.values(this.dropdowns).forEach(dropdown => dropdown.hide());
            }
        });
    }

    setLoading(isLoading) {
        const buttons = [
            this.elements.windows.btn,
            this.elements.mac.btn,
            this.elements.linux.btn
        ];
        buttons.forEach(btn => {
            btn.classList.toggle("loading", isLoading);
            btn.disabled = isLoading;
        });
    }

    handleError() {
        const buttons = [
            this.elements.windows.btn,
            this.elements.mac.btn,
            this.elements.linux.btn
        ];
        buttons.forEach(btn => {
            btn.classList.add("btn-danger");
            btn.textContent = "Error loading downloads";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new DownloadManager();
});