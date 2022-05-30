(() => {
//creations+declarations
const wrapper = document.createElement('div');
const topBar = document.createElement('div');
const searchArea = document.createElement('input');
const button = document.createElement('button');
const body = document.querySelector('body');
let bodyId = document.body.id


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


//main functions
const performSearch = async () =>  {
    let listCheck = document.querySelectorAll(".company-line");
    if (listCheck) {for (const eachLine of listCheck) eachLine.remove()};
    const searchValue = searchArea.value;
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&amp;limit=10&amp;exchange=NASDAQ`;
    loader = document.createElement('div');
    loader.classList.add("spinner-grow");
    wrapper.appendChild(loader);
    let response = await fetch(url);
    let companies = await response.json();
    loader.remove()
    if (companies.length === 0) noResultsFound(searchValue)
    printSearchResults(companies)
}

const printSearchResults = async (companies) => {
    const maxToDisplay = Math.min(companies.length, 10)
    // the line above likely unnecessary but it's good practice/reminder for me so it stays for now
    let fragment = new DocumentFragment();
    for (let i = 0; i < maxToDisplay ; i++) {
        let company = companies[i];
        symbol = company.symbol
        firmName = company.name
        const companyLine = document.createElement("div");
        companyLine.classList.add("company-line");
        companyLine.innerHTML = `<a href="./company.html?symbol=${symbol}">${firmName} (${symbol})</a>`;
        fragment.appendChild(companyLine);
    }
    wrapper.appendChild(fragment);
}

const noResultsFound = (searchValue) => {
        const companyLine = document.createElement("div");
        companyLine.classList.add("company-line");
        companyLine.classList.add("alert");
        companyLine.innerHTML = `<sup> No Results for:</sup>&nbsp&nbsp&nbsp"${searchValue}".&nbsp&nbsp&nbsp<sub> Try Again.`;
        wrapper.appendChild(companyLine);
}

const getCompanyInfo = async () => {
    let currentURL = window.location.href
    const arr = currentURL.split('=')
    let urlFirmSign =  arr.slice(-1)
    //I know you wanted us to use querys, but this was just so simple to do...
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${urlFirmSign}`;
    loader = document.createElement('div');
    loader.classList.add("spinner-grow");
    wrapper.appendChild(loader);
    let response = await fetch(url);
    let firmInfo = await response.json();
    loader.remove()
    displayCompany(firmInfo);
    getStockHistory(urlFirmSign)
    }

const displayCompany = async (firmInfo) => {
    let info = firmInfo.profile
    const companyLine = document.createElement("div");
    companyLine.classList.add("company-line");
    companyLine.classList.add("firm-container");
    let bullOrBear = "green"
    let preColor = info.changesPercentage.slice(0, 1);
    let plus = "+"
    if (preColor === "-") {bullOrBear = "red"; plus = ""}
    let websiteLink = `<p>Company Propaganda: <a target="_blank" href="${info.website}">${info.website}</a></p>`
    if (info.website === '') websiteLink = '';
    companyLine.innerHTML = `<div class="firm-info">
                                <aside>
                                    <img src=" ${info.image}" alt="Trademark">
                                </aside>
                                <h2> ${info.companyName} </h2>  
                                <sub> ${info.price} USD 
                                    <span class="${bullOrBear}"> (${plus}${info.changesPercentage}%)</span>
                                </sub>
                                <h5>About ${info.companyName}: </h5>
                                <div>${info.description}</div>
                                ${websiteLink}
                             </div>`;
    wrapper.appendChild(companyLine);
}

const getStockHistory = async (symbol) => {
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
    loader = document.createElement('div');
    loader.classList.add("spinner-grow");
    document.querySelector(".firm-container").appendChild(loader); 
    let response = await fetch(url);
    let stockHistory = await response.json();
    loader.remove();
    let figures = stockHistory.historical;
    placeChartHTML()
    constructTable(figures)
}

const constructTable = async (arr) => {
    var labels = [];
    var close = [];
    for (let i = 0; i < arr.length; i++) {
        labels.push(arr[i].date)
        close.push(arr[i].close) 
    }
    let data = {
        labels: labels,
        datasets: [{
            label: '',
            backgroundColor: 'green',
            borderColor: 'red',
            data: close,
            }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
        const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

const placeChartHTML = () => {
    const chartHeader = document.createElement('h2');
    chartHeader.classList.add('chart-header');
    chartHeader.innerText = 'Historical Stock Prices'
    const chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-wrapper');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'myChart');
    chartWrapper.appendChild(chartHeader);
    chartWrapper.appendChild(canvas);
    document.querySelector(".firm-container").appendChild(chartWrapper); 
}

//listeners
button.addEventListener('click', performSearch)

searchArea.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
});

if (bodyId==='companyData') getCompanyInfo();

})();


// out-of-scope - WIP - might want it - might remove
// function getEveryNth(arr, nth) {
//     const result = [];
//      for (let i = 0; i < arr.length; i += nth) {
//        result.push(arr[i]);
//      }
//      return result;
// }