const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.uppercase = functions.firestore.document('todo/{messageCollectionId}').onCreate(async (snap, context) => {
    const newValue = snap.data();
    const name = newValue.name;
    const id = context.params.messageCollectionId;
    const uppercaseName = `${name}`.toUpperCase();
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('todo').doc(id)
        .update({ name: uppercaseName });
    return ({result: `Message with ID: ${id} updated from ${name} to ${uppercaseName}.`});
});