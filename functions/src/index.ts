import * as functions from "firebase-functions";
import admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.clearExpiredRedirects = functions
    .region("europe-central2")
    .pubsub
    .schedule("every 1 hours")
    .onRun((_) => {
      functions.logger.info("Deleting expired documents...");

      findExpiredDocuments()?.then((expiredDocuments) => {
        functions.logger.info(
            "Found " + expiredDocuments.size + " expired documents..."
        );

        expiredDocuments.forEach((doc) => {
          functions.logger.debug(
              "Deleting document: " + doc.id
          );
          db.collection("redirects").doc(doc.id).delete();
          functions.logger.debug(
              "Deleted document: " + doc.id
          );
        });

        functions.logger.info("Deleted expired documents.");
      });

      return null;
    });

/**
 * Returns an array of all expired documents in the redirects collection.
 * @return { Promise<QuerySnapshot<DocumentData>> | null }
 *         A list of document references for all expired documents.
 */
function findExpiredDocuments() {
  try {
    return db
        .collection("redirects")
        .where(
            "expiresAt",
            "<=",
            admin.firestore.Timestamp.now()
        )
        .get();
  } catch (e) {
    functions.logger.error(e);

    return null;
  }
}
