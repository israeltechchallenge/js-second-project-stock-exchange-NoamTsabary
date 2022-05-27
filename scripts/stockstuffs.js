//creations+declarations
const wrapper = document.createElement('div');
const topBar = document.createElement('div');
const searchArea = document.createElement('input');
const button = document.createElement('button');
const body = document.querySelector('body');

//assign classes + attributes + text
wrapper.classList.add("wrapper")
button.classList.add('btn', 'btn-dark');
button.setAttribute('type', 'button');
button.innerText = 'Search!'
searchArea.classList.add('form-control');
topBar.classList.add('top-bar')

//appending
body.appendChild(wrapper);
wrapper.appendChild(topBar);
topBar.appendChild(searchArea);
topBar.appendChild(button);

//side functions
searchArea.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

//main functions
const getTenResults = async () =>  {
    let listCheck = document.querySelectorAll(".company-line");
    if (listCheck) {for (const eachLine of listCheck) eachLine.remove()};
    const searchValue = searchArea.value;
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&amp;limit=10&amp;exchange=NASDAQ`;
    loader = document.createElement('div');
    loader.classList.add("spinner-border");
    wrapper.appendChild(loader);
    let response = await fetch(url);
    let companies = await response.json();
    loader.remove()
    const maxDisplayed = Math.min(companies.length, 10)
    for (let i = 0; i < maxDisplayed ; i++) {
        const companyLine = document.createElement("div");
        companyLine.classList.add("company-line");
        companyLine.innerHTML = `<a target="_blank" href="/company.html?symbol=${companies[i].symbol}">${companies[i].name} (${companies[i].symbol})</a>`;
        wrapper.appendChild(companyLine);
    }
}

//listeners
button.addEventListener('click', getTenResults)
