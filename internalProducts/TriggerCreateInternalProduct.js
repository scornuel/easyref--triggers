// Trigger for create follower on internalProduct creation
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const target_collection = mongodb.db("prereferencing_db").collection("changedStatus");

    // Destructure out fields from the change stream event object
    const { fullDocument } = changeEvent;
    const { _id, hubeeStatus, updateDate, modifiedBy } = fullDocument;

    // Build new object to follow the created internalProduct
    const changedStatus = {
        collection: "internalProduct",
        documentId: _id,
        changedList: [{
            newStatus: hubeeStatus,
            updateDate: updateDate,
            modifiedBy: modifiedBy
        },]
    };

    // Save the follower
    target_collection.insertOne(changedStatus);
};