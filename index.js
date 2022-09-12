function bankCreate(balance, loan, pay){
    this.balance = balance
    this.loan = loan
    this.pay=pay
}
const customer = new bankCreate(0,0,0)
updateValues()

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

function getLoan(){
    if(customer.loan > 0){
        alert("Cant get a loan before the last one is paid down!")
        return;
    }
    let loanWanted = prompt("How much do you want to loan?")
    if(loanWanted!=null){
        if(loanWanted*2 > customer.balance){
            alert("Cant get a loan this high!")
            return;
        }
        customer.loan = loanWanted;
        customer.balance += parseInt(loanWanted);
        updateValues()
    }
}

function workBtn(){
    customer.pay+=100
    updateValues()
}

function payToBank(){ 
    if (customer.loan > 0){
        let percentValue = customer.pay*(10/100)
        console.log(percentValue);
        customer.loan -= percentValue
        if(customer.loan< 0){
            customer.loan = 0
        }
        customer.balance += (customer.pay - percentValue) 
        customer.pay = 0
        updateValues()
    }
    else{
        customer.balance += customer.pay
        customer.pay = 0
        updateValues()
    }      
}

function repayLoan(){
    if(customer.loan >= customer.pay){
        customer.loan-=customer.pay
        customer.pay=0
        updateValues()
    }
    else{
        let sum = customer.pay-customer.loan
        customer.loan = 0
        customer.pay = 0
        customer.balance += sum
        updateValues()
    }
}
