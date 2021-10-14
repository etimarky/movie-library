import axios from 'axios';

class API {
    options;
    
    async requestData(service, type, genre){
        this.options ={
            method: 'GET',
              url: 'https://streaming-availability.p.rapidapi.com/search/basic',
              params: {
                country: 'us',
                service: service,
                type: type,
                genre: genre,
                page: '1',
                output_language: 'en',
                language: 'en'
              },
              headers: {
                'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
                'x-rapidapi-key': '010b7fe451msh6684adc9de37c50p1ff1cfjsna849b712eece'
              }
        }
        return axios.request(this.options).then(function (response) {
            return response.data.results;
        }).catch(function (error) {
            console.error(error);
        });
    }
}

export { API };