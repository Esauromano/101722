const db = require("../../config/database");
const initCommentTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS comments(id VARCHAR(100) PRIMARY KEY NOT NULL, comment VARCHAR(255) , replies VARCHAR(255), commentnum INT NOT NULL UNIQUE AUTO_INCREMENT)';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("comments Table ready");
        });
}; 

initCommentTable();
const Query = {
    creatComment: (body) => {
        const {id, comment,replies} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO comments (id, comment, replies) VALUES ("${id}", "${comment}", "${replies}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readComment: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM comments`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneComment: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM comments WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateComment: (id, body) => {
        const {comment,replies} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE comments SET "comment = "${comment}", replies = "${replies}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteComment: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM comments WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;