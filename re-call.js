import fetch from "node-fetch"
export function reCall(){
    let url = `https://tungsten-branch-appendix.glitch.me/recall`
    
    const rand = Math.floor(Math.random()*2)
    const randomTime =  (Math.floor(Math.random()*2) +rand+1) * 60 //in minutes
    
    setTimeout( async ()=>{
        if(rand == 1){
          url = 'https://tungsten-branch-appendix.glitch.me/'
        }
        const res = await fetch(url)
        console.log(
            `status: ${res.status}`
            )
        reCall()
    }, randomTime * 1000 )
}