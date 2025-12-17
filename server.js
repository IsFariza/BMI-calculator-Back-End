const express = require("express");
const app = express();

//to reach static files like CSS in folder "public"
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
//to read from the HTML file for bmi form
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

//to rpocess the data from user
app.post("/calculate-bmi", (req, res)=>{
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    const bmi = weight / (height*height);
    let result = "";
    let color;
    if(bmi<18.5){
        result = "Underweight";
        color = "red";
    } else if(bmi<24.9){
        result = "Normal weight";
        color = "#50C878";
    } else if(bmi<29.9){
        result = "Overweight";
        color = "orange";
    } else{
        result = "Obese";
        color = "red";
    }

    res.send(`
        <link href="styles.css" rel="stylesheet" >
        <div class="container-fluid" style="background-color: ${color};">
        <div class="child-container">
            <h2> Your BMI Results: </h2>
            <h3> BMI: ${bmi.toFixed(1)}</p>
            <h3> Category:<span style="color: ${color}"> ${result}</span></p>
        </div>
        </div>
        `);

});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})