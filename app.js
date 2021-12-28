const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");

let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0],
    phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;    

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phontetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example;
    audio = new Audio("https:" + result[0].phonetics[0].audio);

    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
        tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
        synonyms.insertAdjacentHTML("beforeend", tag);

      }
    }
  }
}
