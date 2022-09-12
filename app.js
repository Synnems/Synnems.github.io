const computersSpecs = document.getElementById("computer-specs") 
let computersElement = document.getElementById("computers");
let image = document.getElementById("image")
let laptopName = document.getElementById("laptop-name")
let laptopDescription = document.getElementById("laptop-description")
let laptopPrice = document.getElementById("laptop-price")
let buyBtn = document.getElementById("buy-button")
let buyDiv = document.getElementById("laptop-buy-row")
let features = document.getElementById("features")
let computers = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(function(response){
    return response.json()
})
.then(data => computers = data)
.then(function(json){
    addComputersToSelect(json)
})

// -------------------------------------------------- Laptop select

const addComputersToSelect = () => { 
    for (let i = 0; i < computers.length; i++) {
        addComputerToSelect(computers[i])
    }  
}

const addComputerToSelect = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

//---------------------------------------------------------------

// -------------------------------------------------------- Laptop specs
const handleComputerChange = e =>{
    while (computersSpecs.hasChildNodes()) {
    computersSpecs.removeChild(computersSpecs.firstChild);
    }
    const selectedComputers = computers[e.target.selectedIndex-1];
    for(let i = 0; i< selectedComputers.specs.length; i++){
        const computerSpecsElement = document.createElement("p");
        computerSpecsElement.appendChild(document.createTextNode(selectedComputers.specs[i]));
        computersSpecs.appendChild(computerSpecsElement)
    }
    laptopName.innerText = selectedComputers.title
    laptopDescription.innerText = selectedComputers.description
    laptopPrice.innerText = selectedComputers.price + " NOK"
    image.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputers.image
    buyDiv.style.display = "inline"
    features.style.display = "block"
}

computersElement.addEventListener("change", handleComputerChange);

//------------------------------------------------------------------ Buy laptops

function handleBuyLaptop(){
    const laptopId  = computersElement.value;
    const price = computers[laptopId-1].price
    if(customer.balance >= price){
        alert("You are now the owner of a new laptop!")
        customer.balance-=price
        updateValues()
    }
    else{
        alert("You do not have enough money in your balance to buy this laptop.")
    }
}
buyBtn.addEventListener("click", handleBuyLaptop);

// ------------------------------------------------------------------------------- Hide elements at default
function hideOnDefault(){
    buyDiv.style.display = "none"
    features.style.display = "none"
}

hideOnDefault()



