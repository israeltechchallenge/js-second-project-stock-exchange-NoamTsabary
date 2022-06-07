(() => {
//creations+declarations
const wrapper = document.createElement('div');
const topBar = document.createElement('div');
const searchArea = document.createElement('input');
const button = document.createElement('button');
const body = document.querySelector('body');
const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`
let bodyId = document.body.id
var queryUrls = [];
let fragmentForList = new DocumentFragment();


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


//main function 
const performSearch = async () =>  {
    await cleanSlate();
    const searchValue = document.querySelector('.form-control').value;
    if (searchValue.length === 0) {return}
    saveQueryUrls(searchValue)
    const url = `${baseUrl}search?query=${searchValue}&amp;limit=10&amp;exchange=NASDAQ`;
    loading(wrapper);
    let response = await fetch(url);
    let companies = await response.json();
    loader.remove();
    if (companies.length === 0) noResultsFound(searchValue)
    else printSearchResults(companies);
    console.log(queryUrls);
}

const cleanSlate = async () =>  {
    let listCheck = document.querySelectorAll(".company-line");
    if (listCheck) {for (const eachLine of listCheck) eachLine.remove()};
    let loader = document.querySelector('.loading');
    if (loader) loader.remove();
}

const printSearchResults = async (companies) => {
    const maxToDisplay = 10;
    for (let i = 0; i < maxToDisplay ; i++) {
        let company = companies[i];
        symbol = company.symbol;
        firmName = company.name;
        await cleanSlate();
        getImageAndStockChange(symbol);
    }
    wrapper.appendChild(fragmentForList);
}

const getImageAndStockChange = async (symbol) => {
    const url = `${baseUrl}company/profile/${symbol}`;
    let response = await fetch(url);
    let firmInfo = await response.json();
    let info = firmInfo.profile
    let bullOrBear = "green"
    let preColor = info.changesPercentage.slice(0, 1);
    let plus = "+"
    if (preColor === "-") {bullOrBear = "red"; plus = ""}
    printLine(info, symbol, bullOrBear, plus)
}

const printLine = async (info, symbol, bullOrBear, plus) => {
    const companyLine = document.createElement("div");
    companyLine.classList.add("company-line");
    companyLine.innerHTML = `<a href="./company.html?symbol=${symbol}">
                            <img src=" ${info.image}" alt="Trademark">
                            ${firmName} (${symbol})
                            <span class="${bullOrBear}"> (${plus}${info.changesPercentage}%)</span>
                            </a>`;
    fragmentForList.appendChild(companyLine);
}

const loading = (location) => {
    loader = document.createElement('div');
    loader.classList.add("loading");
    let fragment = new DocumentFragment();
        for (let i = 0; i <5; ++i) {
        dot = document.createElement('div');
        dot.classList.add("dot")
        fragment.appendChild(dot)
        }
    loader.appendChild(fragment);
    location.appendChild(loader);
}

const noResultsFound = (searchValue) => {
        const companyLine = document.createElement("div");
        companyLine.classList.add("company-line");
        companyLine.classList.add("alert");
        companyLine.innerHTML = `<sup> No Results for:</sup>&nbsp&nbsp&nbsp"${searchValue}".&nbsp&nbsp&nbsp<sub> Try Again.`;
        wrapper.appendChild(companyLine);
}

const getCompanyInfo = async () => {
    var urlParams = new URLSearchParams(window.location.search);
    let urlFirmSign = urlParams.get('symbol');
    const url = `${baseUrl}company/profile/${urlFirmSign}`;
    loading(wrapper);
    let response = await fetch(url);
    let firmInfo = await response.json();
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
    const url = `${baseUrl}historical-price-full/${symbol}?serietype=line`;
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
    document.querySelector(".firm-info").appendChild(chartWrapper); 
}

const saveQueryUrls = (text) => {
    return queryUrls.push(`http://localhost:8080/index.html?query=${text}`)
}


const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
}
const processChanges = debounce(() => performSearch());

//listeners
button.addEventListener('click', performSearch)

searchArea.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
});

searchArea.addEventListener('input', processChanges)
 

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