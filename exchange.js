import fetch from "node-fetch";
const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'

export async function getExchangeRates(){
	const res = await fetch(url);
  
  const rateObj = await res.json();
	let ex = '';
	for(const c of Object.values(rateObj)){
    ex+= `Cotação ${c.name}: 1 ${c.code} = ${c.bid} ${c.codein}\n`; 
  }
	
  return ex;
}
