const deposits:any[] = [
    {amount: 20},
    {amount: 42},
    {amount: 268.9},
    {amount: 29.35},
    {amount: 65.1},
    {amount: 300},
    {amount: 36},
    {amount: 46}
]

const withdraws:any[] = [
    {amount: 92.23}
]

export function getTotalDeposits():number{
    return deposits.reduce((a, b) => +a + +b.amount, 0)
}

export function getTotalWithdraws():number{    
    return withdraws.reduce((a, b) => +a + +b.amount, 0)
}

export function getAmountClean(){
    return <any>getTotalDeposits().toFixed(2) - <any>getTotalWithdraws().toFixed(2)
}