const axios = require('axios');

const fetchData = async (url) => {
    const apiData = await axios.get(url);
    return apiData.data;
}

module.exports = {
    fetchData
}
