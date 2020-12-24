// Trigger for delete follower on campaign deleting
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const target_collection = mongodb.db("prereferencing_db").collection("changedStatus");

    // Retrieve id of deleted campaign
    const _id = changeEvent.documentKey._id;
    console.log("Delete follower of campaign " + _id);

    // Delete the follower
    target_collection.deleteOne({
        collection: "campaign",
        documentId: _id
    });
};