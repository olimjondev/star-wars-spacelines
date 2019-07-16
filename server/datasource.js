const {RESTDataSource} = require('apollo-datasource-rest');

class SwAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL='https://swapi.co/api/';
    }

    async getAllPlanets(){
        return new Promise((resolve, reject) => {
            this.getPlanets('planets', [], resolve, reject)
        });
    }

    async searchPlanets(query){
        return this.get(`planets?search=${query}`).then((response) => {
            return response.results;
        });
    };

    getPlanets(url, planets, resolve, reject){
        this.get(url)
          .then(response => {
            const retrivedPlanets = planets.concat(response.results)
            if (response.next !== null) {
              this.getPlanets(response.next, retrivedPlanets, resolve, reject)
            } else {
              resolve(retrivedPlanets)
            }
          })
          .catch(error => {
            console.log(error)
            reject('Something wrong. Please refresh the page and try again.')
          })
      };
}

module.exports = {SwAPI};