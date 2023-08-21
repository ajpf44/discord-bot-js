export default function choose(str){
  let arr = null;
  if(str.includes(',')){
    arr = str.split(",")
  }else if(str.includes(' ')){
    arr = str.split(" ")
  }else return str
  
  const rand = Math.floor(Math.random()*arr.length)
  
  return arr[rand].trim()
}