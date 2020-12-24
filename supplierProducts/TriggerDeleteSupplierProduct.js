// Trigger for delete follower on supplierProduct deleting
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const target_collection = mongodb.db("prereferencing_db").collection("changedStatus");

    // Retrieve id of deleted supplierProduct
    const _id = changeEvent.documentKey._id;
    console.log("Delete follower of supplierProduct " + _id);

    // Delete the follower
    target_collection.deleteOne({
        collection: "supplierProduct",
        documentId: _id
    });
};