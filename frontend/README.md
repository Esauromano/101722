# to run API 
enter api folder and run `npm run dev`
it only needs a fresh mysql instalation with root account and password as password

Open [http://localhost:8081/api/comments](http://localhost:8081/api/comments) to view it in your browser.
In the frontend directory, you can run:
GET /api/my-module/ to read all
GET /api/my-module/read/:id to read one
POST /api/my-module/create to create
PATCH /api/my-module/update/:id to update
DELETE /api/my-module/delete/:id to delete

CREATE VIA POST {
    "id" : "e40edb86-7538-4c85-b086-d1efa9addbca",
    "commentText" : "ok2",
    "childCommments" : "",
    "isRootNode" : "false",
    "parentNodeId" : "cf216eda-f0fc-41e1-97c3-ff045fbd958b"
}

#Run in frontend folder 
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
