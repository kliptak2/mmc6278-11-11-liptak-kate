const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([{ title, author, lines }]) => {
  let makeTitle = makeTag("h2")(title);
  let makeAuthor = pipe(makeTag("em"), makeTag("h3"))(`by ${author}`);
  let allStanzasArr = [];
  let indivStanzaArr = [];
  lines.forEach((line, index) => {
      if(!line){
        allStanzasArr.push(indivStanzaArr);
        indivStanzaArr = [];
    } else if (index === lines.length -1){ //this is the last line of the poem
      indivStanzaArr.push(line);           //add final line to final indivStanzaArr
      allStanzasArr.push(indivStanzaArr);  //add final indivStanzaArr to list of allStanzasArr
    } else {                               //if we have a valid line and it isn't the last line of the poem, add it to the current indivStanzaArr and move on
      indivStanzaArr.push(line);
    }
  });
console.log(allStanzasArr)
  let stanzaStr = ""
  allStanzasArr.forEach((indivStanzaArr) => {                //loop through all allStanzasArr in the poem. forEach goes over elements instead of for loop which goes over indexes
    stanzaStr += makeTag("p")(indivStanzaArr.join("<br/>")); //each indivStanzaArr is an **array** of strings
  });

  return `${makeTitle}${makeAuthor}${stanzaStr}`;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
}
