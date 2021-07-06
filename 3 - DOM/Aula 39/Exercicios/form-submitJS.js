function MostrarModal(html, callback) {
    let divPopup = document.createElement("div")
    let form = document.createElement("form")
    let input = document.createElement("input")
    let span = document.createElement("span")
    let ok = document.createElement("button")
    let cancel = document.createElement("button")

    ok.innerHTML = "OK!"
    cancel.innerHTML = "Cancel!"

    document.body.append(divPopup)
    form.innerHTML = html

    form.addEventListener("submit", (e) => {
        document.body.removeChild(divPopup)
        e.preventDefault()
    })
    form.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            cancel.click()
        }
    })

    ok.addEventListener("click", () => {
        callback(document.querySelector(".modalpopup__form__input").value)
    })
    cancel.addEventListener("click", () => {
        callback(null)
    })

    divPopup.classList.add("modalpopup")
    form.classList.add("modalpopup__form")
    input.classList.add("modalpopup__form__input")
    span.classList.add("modalpopup__form__span")
    ok.classList.add("modalpopup__form__button")
    cancel.classList.add("modalpopup__form__button")

    document.querySelector(".modalpopup").append(form)
    document.querySelector(".modalpopup__form").append(input)
    document.querySelector(".modalpopup__form").append(span)
    document.querySelector(".modalpopup__form__span").append(ok)
    document.querySelector(".modalpopup__form__span").append(cancel)

    document.querySelector(".modalpopup__form__input").focus()
}

export default MostrarModal;