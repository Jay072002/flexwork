const { infoLog, successLog, errorLog } = require("../helper/logHelper");
const ClientProject = require("../models/ClientProject");


const filterData = async (req, res) => {

    infoLog("filterData entry");

    try {

        // {searchTerm : 'xyz'} req.body
        // req.query - isClient - true

        const { searchTerm } = req.body;
        const user = req.user;

        let filteredData = [];

        if (user && user.isClient) {
            // if client - filter from the projects which he created
            filteredData = await ClientProject.find({
                title: { $regex: `^${searchTerm}`, $options: 'i' },
                userId: user.id // Assuming 'createdBy' is the field that stores the user ID
            });

        } else {
            filteredData = await ClientProject.find({
                title: { $regex: `^${searchTerm}`, $options: 'i' },
                isPublished: true
            });
        }

        successLog("filtered data fetched successfully!");
        infoLog("filterData exit");
        return res.status(201).json({ isDataFetched: true, data: filteredData });

    } catch (error) {
        console.log(error);
        infoLog("filterData exit");
        errorLog("could not filter the data!");
        return res.status(500).json({ dataFiltered: false, data: {} });
    }
}

module.exports = {
    filterData
}