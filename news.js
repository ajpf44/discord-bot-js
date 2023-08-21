import fetch from "node-fetch";
import { JSDOM } from 'jsdom';

async function getDOM(url){
  const res = await fetch(url)
  
  const htmlBody =  await res.text()
  return new JSDOM(htmlBody)
}

async function getNewsFromG1(){
  const g1URL = 'https://g1.globo.com/'
  const dom = await getDOM(g1URL)
  
  const titles=  [...dom.window.document.getElementsByTagName('h2')];
  let newsText = '';
  
  for(let i = 0;i <3; ++i)
    newsText += `${titles[i].innerHTML}\n`;
  
  console.log(newsText)
  return newsText;
}

async function getNewsFromTN(){
  const tnURL = `https://thenewscc.com.br/`
  const dom = await getDOM(tnURL)

  const elPostTitle = [...dom.window.document.getElementsByClassName('elementor-post__title')]
  const p = []
  const regEx = /<(.+?)>/g;

  const links = elPostTitle.map((el, i)=> {
    if(i >= 3)
      p.push(el.nextElementSibling.firstElementChild.innerHTML)
    else
      p.push(el.nextElementSibling.nextElementSibling.innerHTML)

    return el.firstElementChild
  })

  for(let i =0; i<3; ++i){
    p[i] = p[i].replaceAll(regEx, '')
  }

  let newsText = ''
  for(let i = 0; i <4 ;++i){
    newsText += `**Título:** ${links[i].innerHTML.trim()}\n`+
      `${p[i]}...\n\n`+
      `*Link:* <${links[i].href}>\n`+      
      `-------------------------------------------\n`
  }

  return newsText
}

export {
  getNewsFromG1,
  getNewsFromTN
}