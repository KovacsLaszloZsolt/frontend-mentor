class IpLocasion {
    constructor () {
        this.ipSearched = false;
        this.worldMap = L.map('map', {
            minZoom: 2,
            zoomControl: false
        });
        this.addressValid = false;
        this.address = [];
        this.positionMarker = L.marker([0, 0], {
            icon: L.icon({
                iconUrl: './images/icon-location.svg',
                iconSize: [46, 56]
            })
        });
    };

    initApp() {
        const form = document.querySelector('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const address = e.target[0].value;

            e.target[0].value = '';

            this.addressValid = this.validateAddress(address);

            if (document.querySelector('.error-msg')) {
                form.removeChild(document.querySelector('.error-msg'));
            }

            if (this.addressValid) {
                this.setLocasion(this.address);
            } else {
                this.setErrorMsg('Ip address or domain is invalid');
            }

        });

        this.setDefaultMap();
    };

    setErrorMsg(errMsg) {
        const form = document.querySelector('form');

        const detailsCtn = document.querySelector('.details-ctn');
        detailsCtn.dataset.visible = false;

        const errorMsg = document.createElement('p');
        errorMsg.innerText = errMsg;
        errorMsg.classList.add('error-msg');
        form.appendChild(errorMsg);
        this.ipSearched = false;
        this.setSearchedMap([10, 10], 2);

    };

    validateAddress(address) {

        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address)) {
            this.address = ['ipAddress', address]
            return true;
        };

        if (/^(?!.*?_.*?)(?!(?:[\d\w]+?\.)?\-[\w\d\.\-]*?)(?![\w\d]+?\-\.(?:[\d\w\.\-]+?))(?=[\w\d])(?=[\w\d\.\-]*?\.+[\w\d\.\-]*?)(?![\w\d\.\-]{254})(?!(?:\.?[\w\d\-\.]*?[\w\d\-]{64,}\.)+?)[\w\d\.\-]+?(?<![\w\d\-\.]*?\.[\d]+?)(?<=[\w\d\-]{2,})(?<![\w\d\-]{25})$/.test(address)) {
            this.address = ['domain', address];
            return true;
        }

        return (false);
    };

    setDefaultMap() {
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor'
        }).addTo(this.worldMap);

        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.worldMap);

        this.setSearchedMap([10, 10], 2);
    };

    setSearchedMap(cordinates, zoom) {
        this.worldMap.setView(cordinates, zoom);

        if (this.addressValid) {
            this.positionMarker.setLatLng(cordinates).addTo(this.worldMap);
        } else {
            this.positionMarker.removeFrom(this.worldMap);
        };
    };

    setLocasion(address) {
        const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_cCdrDBC5JLJKUT7KBvW6b5K17JCZX&${address[0]}=${address[1]}`;

        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(response);
            })
            .then(ipDetails => {

                const details = `<div class="detail-ctn">
                        <h2>IP Address</h2>
                        <p class="detail-data">${ipDetails.ip}</p>
                    </div>
                    <div class="detail-ctn">
                        <h2>Location</h2>
                        <p class="detail-data">${ipDetails.location.city}, ${ipDetails.location.region}<span class="postal-code">${ipDetails.location.postalCode}</span></p>
                    </div>
                    <div class="detail-ctn">
                        <h2>Timezone</h2>
                        <p class="detail-data">UTC${ipDetails.location.timezone}</p>
                    </div>
                    <div class="detail-ctn">
                        <h2>ISP</h2>
                        <p class="detail-data">${ipDetails.isp}</p>
                    </div>`;
                const detailsCtn = document.querySelector('.details-ctn');
                detailsCtn.innerHTML = details;
                detailsCtn.dataset.visible = true;

                this.ipSearched = true;

                this.setSearchedMap([ipDetails.location.lat, ipDetails.location.lng], 15);
            })
            .catch(response => {
                this.setErrorMsg('Something went wrong. Try again!')
            });
    };
};

const locasion = new IpLocasion();

locasion.initApp();