require('dotenv').config({ path: __dirname+'/.env' });
var axios = require('axios');

export class BitcoinTrade{

    data = {
        total_amount: 0,
        items: <any>[]
    }

    async getWalletBalances() {
        const config = {
            method: 'get',
            url: 'https://api.bitcointrade.com.br/v3/wallets/balance',
            headers: { 
                'Content-Type': 'application/json', 
                'x-api-key': process.env.API_KEY
            }
        } 
        
        return await axios(config).then(async (response:any) => {
            await Promise.all(
                response.data.data.map(async (coin:any) => {
                    if(coin.available_amount > 0){
                        coin.converted_value = await this.getConvertedValue(coin.currency_code, coin.available_amount)
                        this.data.total_amount += parseFloat(coin.converted_value)
                        this.data.items.push(coin)
                    }
                })                
            )
            this.data.items.sort((a:any, b:any) => {
                if(a.currency_code < b.currency_code) { return -1; }
                if(a.currency_code > b.currency_code) { return 1; }
                return 0;
            })
            return this.data
        }).catch((error:any) => { 
            console.log('error')
        });
    }

    async getConvertedValue(coinPair: string, amount: number){
        const config = {
            method: 'get',
            url: `https://api.bitcointrade.com.br/v3/market/summary?pair=BRL${coinPair}`,
            headers: { 
                'Content-Type': 'application/json', 
                'x-api-key': process.env.API_KEY
            }
        }    
        return await axios(config).then((response:any) => {
            return  (response.data.data[0].last_transaction_unit_price * amount).toFixed(2)
        }).catch((error:any) => { 
            console.log('error')
        });
    }

    coinLabel(name:string){
        switch (name) {
            case 'BTC':
                return 'BITCOIN'
            case 'ETH':
                return 'ETHEREUM'       
            case 'LTC':
                return 'LITECOIN'
            case 'BCH ':
                return 'BITCOIN CASH'       
            case 'XRP':
                return 'RIPPLE'
            case 'BRL':
                return 'REAIS'
            default:
                return name
        }
    }

}