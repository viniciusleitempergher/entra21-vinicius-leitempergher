const jsonCards = "[{\"name\":\"Serra Angel\",\"image\":\"static/img/serraangel.png\",\"manaCost\":3,\"typeLine\":\"Creature - Angel\",\"expansionSymbol\":\"static/img/serraangelexpansionsymbol.png\",\"hability\":\"Flying, vigilance\",\"text\":\"The angel remembers her past lives like dreams. Her song held up meadows. Her blade darkness. Her wings carried her across the ages.\",\"power\":\"4/4\",\"collectorNumber\":\"033/269 U\"},{\"name\":\"Brainstorm\",\"image\":\"\",\"manaCost\":4,\"typeLine\":\"Instant\",\"expansionSymbol\":\"static/img/kokushoexpansionsymbol.png\",\"hability\":\"Flying<br>When Kokusho, the Evening Star dies, each opponent loses 5 life. You gain life equal to the life lost this way.\",\"text\":\"The fall of the evening star never heralds a gentle dawn.\",\"power\":\"5/5\",\"collectorNumber\":\"095/249 R\"}]"

/* 
Exercício 

Utilizando grid e flexbox reproduza os cards de magic com as informações do jsonCards.
Para isso converta o json para um vetor e adicione cada item como uma carta.
*/

const [carta1, carta2] = JSON.parse(jsonCards);

console.log(carta1, carta2);

window.addEventListener("load", () => {
    carregaDadosCarta1()
})

function carregaDadosCarta1() {
    document.querySelector(".card__head").prepend(carta1.name)
    document.querySelector(".card__head__mana-count").prepend(carta1.manaCost)

    for (let i = 0; i < 2; i++) {
        let img = document.createElement("img")
        img.src = "./static/img/manacost.png"
        document.querySelector(".card__head__mana").append(img)
    }

    let img = document.createElement("img")
    img.src = carta1.image
    document.querySelector(".card__img").append(img)

}


