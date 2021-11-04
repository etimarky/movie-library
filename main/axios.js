/**
 * API class created for various functions to retrieve specific data
 */
import axios from 'axios';

class API {
  options;

  // getMovie function searches for a specific movie based on the imdb ID provided by user
  async getMovie(id) {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/get/basic',
      params: { country: 'us', tmdb_id: 'movie/' + id, output_language: 'en' },
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': '010b7fe451msh6684adc9de37c50p1ff1cfjsna849b712eece'
      }
    };
  
    return axios.request(this.options).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

  // searchBasic function searches within a service (netflix, hulu, etc.) and either movie/series and returns what belongs in the list
  async searchBasic(service, type) {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/basic',
      params: {
        country: 'us',
        service: service,
        type: type,
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


  // searchDetails allows user to input service (ex. netflix), type (movie/series), genre (based on #), and language (ex. en) for a list
  async searchDetails(service, type, genre, language) {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/basic',
      params: {
        country: 'us',
        service: service,
        type: type,
        genre: genre,
        page: '1',
        output_language: 'en',
        language: language
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

  // searchNetflix returns any movie/series within the netflix service
  async searchNetflix(page) {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/basic',
      params: {
        country: 'us',
        service: 'netflix',
        type: 'movie',
        page: page
      },
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': '010b7fe451msh6684adc9de37c50p1ff1cfjsna849b712eece'
      }
    }
    return axios.request(this.options).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

  // getGenreList returns a list of all of the genres and the corresponding genre number that had been previously created
  async getGenreList() {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/genres',
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': '010b7fe451msh6684adc9de37c50p1ff1cfjsna849b712eece'
      }
    };

    return axios.request(this.options).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

  // getCountryList returns a list of countries and the services that are provided in these countries
  async getCountryList() {
    this.options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/countries',
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': '010b7fe451msh6684adc9de37c50p1ff1cfjsna849b712eece'
      }
    };

    return axios.request(this.options).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

}




export { API };