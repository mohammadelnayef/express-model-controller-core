const {fetchData} = require("../models/example.model");
const dataService = require("../services/process-data.service");
const path = 'https://jsonplaceholder.typicode.com/users';

const getProcessedData = async (req, res) => {
    const apiData = await fetchData(path);
    const result = dataService.processData(apiData);
    res.json(result);
}

module.exports = {
    getProcessedData
}