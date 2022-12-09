import { LightningElement, track } from 'lwc';

export default class WeatherPage extends LightningElement {

    @track usdRate;
    @track eurRate;

    connectedCallback(){
        this.listener();
    }

    listener(){
        let long;
        let lat;
        console.log('test');

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);

            const api = `https://v6.exchangerate-api.com/v6/latest/TRY`;
            console.log(api);
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data=> {
                console.log(data);
                this.usdRate = (1 / (data.conversion_rates.USD)).toFixed(2);
                console.log(this.usdRate);
                this.eurRate = (1 / (data.conversion_rates.EUR)).toFixed(2);
                console.log(this.eurRate);

            })
            });
        }    
    }
}
