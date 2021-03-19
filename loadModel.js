// maak neural network
const options = { task: 'regression', debug: true }
const nn = ml5.neuralNetwork(options)

const modelInfo = {
    model: './model/model.json',
    metadata: './model/model_meta.json',
    weights: './model/model.weights.bin',
  };

nn.load(modelInfo, modelLoaded);


function modelLoaded(){
    console.log("Model loaded succesfully!")

    let predictButton = document.getElementById("predict")
    predictButton.onclick = function() {predictHeight()};
}

// let predictButton = document.getElementById("predict")
// predictButton.onclick = function() {predictHeight()};



async function predictHeight(){

    let predictions = []

    let fatherHeight = { Father: parseFloat(document.getElementById("father-input").value) }
    console.log(fatherHeight)

    let prediction = await nn.predict(fatherHeight)

    // console.log(prediction)
    prediction.push({
        Father: fatherHeight.Father,
        Son: prediction[0].Son
    })

    console.log(prediction)

    let h2 = document.createElement("h2")
    h2.innerHTML = "With a father lenght of "+ prediction[1].Father + " inches, your son is "+ Math.round(prediction[1].Son)+ " inches in length."
    document.body.appendChild(h2)

    if(prediction[1].Father > 99){
        h2.innerHTML = "This father is very long, he should consider applying to the guinness book of records! (Son: "+ Math.round(prediction[1].Son) +" inches)"
    }

    if(prediction[1].Father < 25){
        h2.innerHTML = "This father is an extremely tiny boi. (Son: "+ Math.round(prediction[1].Son) +" inches)"
    }
}