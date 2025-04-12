fetch("data.json").then((response) => response.json()).then((data) => {
    console.log(data)

    document.getElementById("trie_croissant").addEventListener("click", () => {
        let sorted_data = data
        sorted_data.sort((a, b) => {
            return a.timeframes.weekly.current - b.timeframes.weekly.current
        })
        document.querySelector(".section_two").innerHTML = ""
        main(sorted_data)
    })
    document.getElementById("trie_decroissant").addEventListener("click", () => {
        let sorted_data = data
        sorted_data.sort((a, b) => {
            return b.timeframes.weekly.current - a.timeframes.weekly.current
        })
        document.querySelector(".section_two").innerHTML = ""
        main(sorted_data)
    })
    document.getElementById("filtre").addEventListener("input", (event) => {
        let filtered_data = data.filter((elements) => (elements.timeframes.weekly.current <= event.target.value))
        document.querySelector(".section_two").innerHTML = ""
        main(filtered_data)
    })
    main(data)
})

function main(data) {
    let section = document.querySelector(".section_two")
    data.forEach((element) => {
        section.innerHTML += `<article><span></span><div><header><h2>${element.title}</h2><img src="images/icon-ellipsis.svg" alt="trois points"></header><div class="details"><strong>${element.timeframes.weekly.current}hrs</strong><span>Last Week - ${element.timeframes.weekly.previous}hrs</span></div></div></article>`
    })

    let articles = document.querySelectorAll("article")
    for (let i=0; i < data.length; i++) {
        articles[i].style.backgroundColor = `${data[i].color}`
        articles[i].style.backgroundImage = `url('${data[i].image}')`
    }

    let daily = document.getElementById("daily")
    let weekly = document.getElementById("weekly")
    let monthly = document.getElementById("monthly")

    daily.addEventListener("click", () => {
        let div = document.querySelectorAll(".details")
        for (let i=0; i < data.length; i++) {
            div[i].innerHTML = `<strong>${data[i].timeframes.daily.current}hrs</strong><span>Last Day - ${data[i].timeframes.daily.previous}hrs</span>`
        }
    })
    weekly.addEventListener("click", () => {
        let div = document.querySelectorAll(".details")
        for (let i=0; i < data.length; i++) {
            div[i].innerHTML = `<strong>${data[i].timeframes.weekly.current}hrs</strong><span>Last Week - ${data[i].timeframes.weekly.previous}hrs</span>`
        }
    })
    monthly.addEventListener("click", () => {
        let div = document.querySelectorAll(".details")
        for (let i=0; i < data.length; i++) {
            div[i].innerHTML = `<strong>${data[i].timeframes.monthly.current}hrs</strong><span>Last Month - ${data[i].timeframes.monthly.previous}hrs</span>`
        }
    })
}