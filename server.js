const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, 'public');

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());



//Route for index page
app.get('/', (req,res)=>{
    res.sendFile(path.join(initial_path, 'index.html'));
})


//Route for composer page
app.get('/composer', (req, res) =>{
    res.sendFile(path.join(initial_path, 'composer.html'));
})


//Route for fileupload images
app.post('/upload', (req, res) =>{
    let file = req.files.image;
    let date = new Date();

    //image name
    let imagename = date.getDate() + date.getTime() + file.name;

    //image upload path
    let path = 'public/uploads/' + imagename;

    //create upload
    file.mv(path, (err, result)=>{
        if(err){
            throw err;
        } else {res.json(`uploads/${imagename}`)}   //image upload
    })
})



//DASHBOARD SECTION
app.get("/admin", (req, res) =>{
    res.sendFile(path.join(initial_path, "dashboard.html"));
})


//Route for blog.html
app.get("/:blog", (req, res)=>{
    res.sendFile(path.join(initial_path, "blog.html"));
})



app.get("/:blog/composer", (req, res)=>{
    res.sendFile(path.join(initial_path, 'composer.html'));
})


app.use((req, res) => {
    res.json("404");
})







//Nodemon Route
//If deployed change the 5000 for "process.env.PORT || 3000"
app.listen("5000", ()=>{
    console.log('yep....')
})
