function reverseSentence(str){
  const words = str.split(" ")
  let newSentence = "";
  
  for(let letter of words){
    letter = letter.split("").reverse().join("")
    newSentence = newSentence + " " + letter
  }
  return newSentence
}
const result = reverseSentence("we like coding");
console.log(result)