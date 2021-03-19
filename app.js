import { VegaScatterplot } from "./libraries/vegascatterplot.js"

// maak neural network
const options = { task: 'regression', debug: true }
const nn = ml5.neuralNetwork(options)

//variables
let fatherSonData 
let plot
let epochs = 23

let trainButton = document.getElementById("train-model")
trainButton.onclick = function() {init()};

let saveButton = document.getElementById("save-model")
saveButton.onclick = function() {saveModel()};
saveButton.style.display = "none"

function loadData() {
    Papa.parse("./data/fatherson.csv", {
        download: true,
        header: true, // true maakt objecten, false maakt arrays
        dynamicTyping: true,
        complete: (results) => {
            console.log("Data: ",results.data)
            drawScatterPlot(results.data)
        }
    })
}
//
// teken de scatterplot voor de fake data
//
async function drawScatterPlot(data) {
    fatherSonData = data

    plot = new VegaScatterplot()
    await plot.initialise("Father", "Son", 600, 400, fatherSonData)

    createNeuralNetwork()
}

//
// maak en train het neural network
//
async function createNeuralNetwork() {
    console.log(fatherSonData)
    // maak neural network


    //shuffle data
    fatherSonData.sort(() => (Math.random() - 0.5))

    // voeg data toe aan neural network met addData
    for (let row of fatherSonData) {
        nn.addData({ Father: row.Father }, { Son: row.Son })
    }

    // train neural network
    nn.normalizeData()
    nn.train({ epochs: epochs }, () => finishedTraining())

        function finishedTraining(){
        console.log("Finished training!")
        saveButton.style.display = "block"
    }


}



async function saveModel(){
    console.log("model saved!")
    nn.save()
}

// start de applicatie
function init(){
    trainButton.style.display = "none"
    loadData()
}
