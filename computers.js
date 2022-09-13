//Gets elements from HTML for later usage.
const computersSpecs = document.getElementById("computer-specs") 
const computersElement = document.getElementById("computers");
const image = document.getElementById("image")
const laptopName = document.getElementById("laptop-name")
const laptopDescription = document.getElementById("laptop-description")
const laptopPrice = document.getElementById("laptop-price")
const buyBtn = document.getElementById("buy-button")
const buyDiv = document.getElementById("laptop-buy-row")
const features = document.getElementById("features")
const firework = document.getElementById("firework")
const slider = document.getElementById("slider")

//Array to store computer values in.
let computers = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers") //Fetch laptop API
.then(function(response){
    return response.json() //Transformed to JSON
})
.then(data => computers = data) //Assign computers to data (populate)
.then(function(){
    addComputersToSelect()
})

// -------------------------------------------------- Laptop select

//
const addComputersToSelect = () => { //Loops through each computer fetched.
    for (let i = 0; i < computers.length; i++) {
        addComputerToSelect(computers[i])
    }  
}

const addComputerToSelect = (computer) => { //Ran on each computer element 
    const computerElement = document.createElement("option"); //Make HTML option tag
    computerElement.value = computer.id; //Sets value to ID
    computerElement.appendChild(document.createTextNode(computer.title)); //Sets computer title to option title
    computersElement.appendChild(computerElement); //Adds option tag to HTML
}
//---------------------------------------------------------------

// -------------------------------------------------------- Laptop specs
const handleComputerChange = e =>{
    while (computersSpecs.hasChildNodes()) { //Checks if HTML element (Features) already have child nodes added.
        computersSpecs.removeChild(computersSpecs.firstChild); //Removes to avoid duplicates
    }
    const selectedComputers = computers[e.target.selectedIndex-1]; //Gets selected computer.
    for(let i = 0; i< selectedComputers.specs.length; i++){ //Appends selected computers specs one at a time.
        const computerSpecsElement = document.createElement("p");
        computerSpecsElement.appendChild(document.createTextNode(selectedComputers.specs[i]));
        computersSpecs.appendChild(computerSpecsElement)
    }
    firework.style.visibility = "hidden"
    slider.style.visibility="hidden"
    laptopName.innerText = selectedComputers.title //Sets title for selected computer.
    laptopDescription.innerText = selectedComputers.description //Sets description for selected computer.
    laptopPrice.innerText = selectedComputers.price + " NOK" //Sets price for selected computer.
    image.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputers.image //Sets image for selected computer.
    buyDiv.style.display = "inline" //Display buy div when laptop is chosen
    features.style.display = "block" //Display features when laptop is chosen
}

computersElement.addEventListener("change", handleComputerChange); //Run handleComputerChange when change is seen in computersElement (select-tag)

//------------------------------------------------------------------ Buy laptops

function buyLaptop(){ //Called when buy laptop button is clicked
    const laptopId  = computersElement.value; //Gets laptop ID to use for array index
    const price = computers[laptopId-1].price //Price of computer
    if(customer.balance >= price){ //If enough money in balance to buy computer
        alert("You are now the owner of a new laptop!")
        customer.balance-=price //Remove spent money in balance.
        updateValues()
        firework.style.visibility = "visible"
        slider.style.visibility="visible"
    }
    else{ //If not enough money in balance
        alert("You do not have enough money in your balance to buy this laptop.")
    }
}

// ------------------------------------------------------------------------------- Hide elements at default
function hideOnDefault(){ //Hides features and computer display when no computers are chosen
    buyDiv.style.display = "none"
    features.style.display = "none"
    firework.style.visibility = "hidden"
    document.getElementById("slider").style.visibility="hidden"
    
}
hideOnDefault()
