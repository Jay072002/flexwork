const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const FreelancerWishlist = require("../models/FreelancerWishlist")



const createWishlistProject = async (req, res) => {
    try {

        const project = req.body;

        console.log(project);

        if (Object.keys(project).length == 0) {
            infoLog("createWishlistProject exit");
            res.status(400).json({ isWishlistAdded: false, data: {} });
            return errorLog("parameter missing");
        }

        const isWishlisted = await FreelancerWishlist.findOne({ projectId: project?.projectId })

        if (isWishlisted) {
            infoLog("updateProfile exit");
            res.status(400).json({ isWishlistAdded: false, data: {} });
            return errorLog("parameter missing");
        }


        const newWishlist = new FreelancerWishlist({
            projectId: project?.projectId,
            freelancerId: project?.freelancerId
        })

        const data = await newWishlist.save();

        successLog("Successfully added wishlist!");
        infoLog("createWishlistProject exit");
        return res.status(201).json({ isWishlist: true, data });

    } catch (error) {
        console.log(error);
        infoLog("createWishlistProject exit");
        errorLog("Error While adding project to wishlist!");
        return res.status(500).json({ isWishlistAdded: false, data: {} });
    }
}

const getWishlistProject = async (req, res) => {
    infoLog("getWishlistProject entry")

    const { freelancerId } = req.query

    try {
        // Fetch all documents from the FreelancerWishlist collection
        const wishlistProjects = await FreelancerWishlist.find({ freelancerId })
            .populate('projectId') // Populate the 'projectId' field with data from the 'ClientProject' collection.
            .populate('freelancerId') // Populate the 'freelancerId' field with data from the 'User' collection.
            .exec();

        infoLog("getWishlistProject exit")
        successLog("Successfully fetched wishlist projects")
        // If there are wishlist projects, send them in the response
        res.status(200).json({ isWishlistFetched: true, data: wishlistProjects });
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during the fetch
        infoLog("getWishlistProject exit")
        errorLog("Error while fetching wishlist projects")
        console.error('Error fetching wishlist projects:', error);
        res.status(500).json({ message: 'Error fetching wishlist projects' });
    }
}


const deleteWishlistProject = async (req, res) => {
    try {

        const { projectId } = req.params

        console.log(projectId, "prid");
        const deletedDocument = await FreelancerWishlist.findOneAndDelete({
            projectId: projectId,
        });

        if (deletedDocument) {
            console.log("Document deleted:", deletedDocument);
            // Respond with a success message or status code
            return res.status(201).json({ isWishlistDeleted: true, data: null });
        } else {
            // If no document was found with the given projectId
            console.log("Document not found");
            // Respond with an appropriate status code or error message
            res.status(404).json({ message: "Document not found" });
        }
        successLog("Successfully deleted wishlist!");
        infoLog("deleteWishlistProject exit");

    } catch (error) {
        console.log(error);
        infoLog("deleteWishlistProject exit");
        errorLog("Error While deleting wishlist!");
        return res.status(500).json({ isWishlistDelete: false, data: {} });
    }
}



module.exports = {
    createWishlistProject,
    getWishlistProject,
    deleteWishlistProject
}