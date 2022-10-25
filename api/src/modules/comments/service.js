const commentsQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const commentsService = {
    creatComments: async (body) => {
        console.log(body)
        //const id = uuidv4();
        //body.id = id; 
        return commentsQueries.creatComments(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readComments: async () => {
        return commentsQueries.readComments()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneComments: async (id) => {
        return commentsQueries.readOneComments(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateComments: async (id, body) => {
        return commentsQueries.updateComments(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteComments: async (id) => {
        return commentsQueries.deleteComments(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = commentsService;