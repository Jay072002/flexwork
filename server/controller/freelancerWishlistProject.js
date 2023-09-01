const { infoLog, errorLog } = require("../helper/logHelper");
const FreelancerWishlist = require("../models/FreelancerWishlist")



const createWishlistProject = async () => {
    try {



    } catch (error) {
        console.log(error);
        infoLog("createWishlistProject exit");
        errorLog("Error While adding project to wishlist!");
        return res.status(500).json({ isWishlistAdded: false, data: {} });
    }
}

const getWishlistProject = async () => {
    try {

    } catch (error) {

    }
}



module.exports = {
    createWishlistProject,
    getWishlistProject
}