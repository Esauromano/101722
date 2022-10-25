const db = require("../../config/database");
const initCommentsTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS commentss(id VARCHAR(100) PRIMARY KEY NOT NULL, commentText VARCHAR(255) NOT NULL,childCommments VARCHAR(255) ,isRootNode VARCHAR(255) NULL,parentNodeId VARCHAR(255) NULL)';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("commentss Table ready");
        });
}; 

initCommentsTable();
const Query = {
    creatComments: (body) => {
        console.log("body", body)
        const {id, commentText,childCommments,isRootNode,parentNodeId} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO commentss (id, commentText, childCommments, isRootNode, parentNodeId) VALUES ("${id}", "${commentText}", "${childCommments}", "${isRootNode}", "${parentNodeId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readComments: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM commentss`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneComments: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM commentss WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateComments: (id, body) => {
        const {commentText,childCommments,isRootNode,parentNodeId} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE commentss SET "commentText = "${commentText}", childCommments = "${childCommments}", isRootNode = "${isRootNode}", parentNodeId = "${parentNodeId}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteComments: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM commentss WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;