// Selector..
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let container = document.getElementById("container");
let input_word = document.getElementById("input_word");
let ans_container_1 = document.getElementById("ans_container_1");
let ans_container_2 = document.getElementById("ans_container_2");
let search_button = document.getElementById("search_button");

// let sound = document.getElementById("sound");
// let sound = new Audio("https://api.dictionaryapi.dev/media/pronunciations/en/aspect-us.mp3");
let voice_button = document.getElementById("sound");

// function Search_clicked() {
search_button.addEventListener("click", () =>{
    // console.log(input_word.value);
  if(input_word.value != ""){
    fetch(`${url}${input_word.value}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data[0].word);
      let undefined_eg = data[0].meanings[0].definitions[0].example;
      let example;
      if (undefined_eg == undefined) {
        example = "";
      } else {
        example = undefined_eg;
      }
      ans_container_2.innerHTML = ` 
      <div id="defination">
      <h5>${data[0].meanings[0].definitions[0].definition}</h5>
  </div>
  <div id="example">
      <h6>Eg. ${example}</h6>
  </div>`;

      // let Url = `https:${data[0].phonetics[0].audio}`;
      ans_container_1.innerHTML = `
            <div id="sound" class="d-flex flex-row-reverse pr-3">
            <button id="voice_button" onclick="speak_word()"> <i id="icon" class="material-icons">volume_up</i></button>
          </div>
          <div id="word" class="m-2 pl-2">
            <h2>${data[0].word}</h2>
            <h5>${data[0].meanings[0].partOfSpeech}</h5>
            
          </div>
            `;
      voice_button.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      ans_container_1.innerHTML = `
            <div id="sound" class="d-flex flex-row-reverse pr-3">
            <button id="voice_button" onclick="speak_word()"> <i id="icon" class="material-icons">volume_up</i></button>
          </div>
          <div id="word" class="m-2 pl-2">
            <h2>No word Found</h2>
            <h5></h5>
            
          </div>
            `;

      ans_container_2.innerHTML = ` 
            <div id="defination">
            <h5></h5>
        </div>
        <div id="example">
            <h6></h6>
        </div>`;
    });
  }else{
    alert("Please enter word");
  }
})

function speak_word() {
  let bat = `"${voice_button.src}"`;
  // let sound = new Audio(bat);
  // console.log(bat);
  // console.log(sound);
  voice_button.play();
}
