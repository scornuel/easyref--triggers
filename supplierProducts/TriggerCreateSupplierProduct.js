// Trigger for create follower on supplierProduct creation
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const target_collection = mongodb.db("prereferencing_db").collection("changedStatus");

    // Destructure out fields from the change stream event object
    const { fullDocument } = changeEvent;
    const { _id, status, updateDate, modifiedBy } = fullDocument;

    // Build new object to follow the created supplierProduct
    const changedStatus = {
        collection: "supplierProduct",
        documentId: _id,
        changedList: [{
            newStatus: status,
            updateDate: updateDate,
            modifiedBy: modifiedBy
        },]
    };

    // Save the follower
    target_collection.insertOne(changedStatus);
};