// Trigger for update follower on campaign updating
exports = function(changeEvent) {

    // Recover updatedStatus collection
    const mongodb = context.services.get("mongodb-easyref");
    const targetCollection = mongodb.db("prereferencing_db").collection("changedStatus");


    // Destructure out fields from the change stream event object
    const { fullDocument } = changeEvent;
    const { _id, status, updateDate } = fullDocument;
    let lastStatus;

    // Retrieve the last status modified for this document
    targetCollection.findOne({
        collection: "campaign",
        documentId: _id
    }).then(result => {
        changedList = result.changedList;
        changedList.sort(function(a, b){ return b.updateDate - a.updateDate });
        lastStatus = changedList[0].newStatus;

        // Save only if status was modified
        if(lastStatus !== status) {
            console.log("campaign " + _id + " changed status from " + lastStatus + " to " + status);
            // Add new notification to changedList
            targetCollection.updateOne(
                {
                    collection: "campaign",
                    documentId: _id
                },
                {
                    $push: { changedList: { newStatus: status, updateDate: updateDate}}
                }
            );
        } else {
            console.log("Satus of campaign " + _id + " was not changed.");
        }
    });
};