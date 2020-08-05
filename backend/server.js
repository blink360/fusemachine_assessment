const app = require("./app");

let port = 8000;

const server = app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})