// Trigger for create follower on campaign creation
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const target_collection = mongodb.db("prereferencing_db").collection("changedStatus");

    // Destructure out fields from the change stream event object
    const { fullDocument } = changeEvent;
    const { _id, status, updateDate } = fullDocument;

    // Build new object to follow the created campaign
    const changedStatus = {
        collection: "campaign",
        documentId: _id,
        changedList: [{
            newStatus: status,
            updateDate: updateDate
        },]
    };

    // Save the follower
    target_collection.insertOne(changedStatus);
};