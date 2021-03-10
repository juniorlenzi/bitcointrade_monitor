import { getAmountClean, getTotalDeposits, getTotalWithdraws } from './balance'
import { BitcoinTrade } from './bitcointrade'

class App {
    static start(): void {
        const bitcointrade = new BitcoinTrade()
        const date = new Date

        bitcointrade.getWalletBalances().then((data:any) => {
            console.log('######################################################################')
            console.log('Total Depositado R$', getTotalDeposits())
            console.log('Total Sacado R$', getTotalWithdraws())        
            console.log('Total Fixo R$', getAmountClean()) 
            console.log('Total Atual R$', parseFloat(data.total_amount).toFixed(2)) 
            console.log('Situação Atual R$', (parseFloat(data.total_amount) - getAmountClean()).toFixed(2)) 
            console.log('\n')
            console.log(`Hora da consulta: ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`)       
            data.items.map((coin:any) => {
                console.log(bitcointrade.coinLabel(coin.currency_code))
                console.log('Quantidade', coin.available_amount)
                console.log('Valor R$', parseFloat(coin.converted_value))
                console.log('Percentual', ((parseFloat(coin.converted_value) * 100) / data.total_amount).toFixed(2) + '%')
            })
            console.log('######################################################################')            
        })        
    }
}
App.start();
setInterval(() => {
    App.start();
}, 11000)

