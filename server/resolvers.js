const Query = {
    planets: (root, args, {dataSources}) => {
        return dataSources.swapi.getAllPlanets();

    },
    searchPlanet: (root, args, {dataSources}) => {
        return dataSources.swapi.searchPlanets(args.query);
    }
};

module.exports = {Query};