function bankCreate(balance, loan, pay){
    this.balance = balance
    this.loan = loan
    this.pay=pay
}
const customer = new bankCreate(0,0,0) //New bank-user.
updateValues()

//Updates HTML values with conditions.
function updateValues(){
    const customerDisplay = document.getElementById("bank-display")
    customerDisplay.innerText = "Balance: " + customer.balance + " Kr"
    const payDisplay = document.getElementById("pay-display")
    payDisplay.innerText = "Pay: " + customer.pay + " Kr"
    if(customer.loan >= 0){
        const loanDisplay = document.getElementById("outstanding-loan-display")
        loanDisplay.innerText = "Loan left: " + customer.loan + " Kr"
        loanDisplay.style.visibility = "visible"
        const loanPayBtnDisplay = document.getElementById("btn-repay-loan")
        loanPayBtnDisplay.style.visibility = "visible"
    }
    if(customer.loan == 0){
        const loanPayBtnDisplay = document.getElementById("btn-repay-loan")
        loanPayBtnDisplay.style.visibility = "hidden"
        const loanDisplay = document.getElementById("outstanding-loan-display")
        loanDisplay.style.visibility = "hidden"
    }
}

//Called when get a loan button is clicked.
function getLoan(){
    if(customer.loan > 0){ // Checks if a loan already exists
        alert("Cant get a loan before the last one is paid down!")
        return;
    }
    let loanWanted = prompt("How much do you want to loan?") 
    if(isNaN(loanWanted) || loanWanted<0){ //Checks if a number type over bigger than 0 is entered
        alert("Enter a valid number")
        return;
    }
    if(loanWanted!=null){ //If loan wanted is not empty
        if(loanWanted*2 > customer.balance){ //If loan wanted is twice as big as customers balance
            alert("Cant get a loan this high!")
            return;
        }
        customer.loan = loanWanted; //Adds loan to customer
        customer.balance += parseInt(loanWanted); //Adds loan to customers balance
        updateValues() 
    }
}

//Called when work button is clicked
function workBtn(){
    customer.pay+=100 //Adds 100 to customer pay
    updateValues()
}

//Called when bank button is clicked
function payToBank(){ 
    if (customer.loan > 0){ //If customer have existing loan
        let percentValue = customer.pay*(10/100) //10 percent of pay salary.
        customer.loan -= percentValue //Pay down loan with the percent value
        if(customer.loan< 0){ //If loan now is less than 0
            customer.loan = 0 
        }
        customer.balance += (customer.pay - percentValue) //Add rest to balance
        customer.pay = 0 //Set pay salary to 0
        updateValues()
    }
    else{ //If customer does not have existing loan
        customer.balance += customer.pay //Add all pay salary to balance
        customer.pay = 0
        updateValues()
    }      
}

//Called when repay loan is clicked
function repayLoan(){
    if(customer.loan >= customer.pay){ //If loan is bigger or same as the pay salary
        customer.loan-=customer.pay //Deduct all pay from loan
        customer.pay=0 //Set pay to 0
        updateValues()
    }
    else{ //If loan is smaller than the pay salary
        let sum = customer.pay-customer.loan //Rest of pay
        customer.loan = 0 //Loan is 0
        customer.pay = 0 //Salary is 0
        customer.balance += sum //Rest of the pay goes to the bank balance
        updateValues()
    }
}
