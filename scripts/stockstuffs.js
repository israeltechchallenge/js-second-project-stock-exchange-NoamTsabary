( async () =>  {


const getCompanyInfo = async () => {
    var urlParams = new URLSearchParams(window.location.search);
    let urlFirmSign = urlParams.get('symbol');
    const url = `${baseUrl}company/profile/${urlFirmSign}`;
    loading(wrapper);
    try {
        let response = await fetch(url);
        let firmInfo = await response.json();
        if (await checkObject(firmInfo))
            {console.error("missing object in getCompanyInfo");
            firmInfo = "unavailable";}
        displayCompany(firmInfo, urlFirmSign);
        getStockHistory(urlFirmSign)
    } catch (error) {
        console.error(error);
    }
}

const displayCompany = async (firmInfo, urlFirmSign) => {
    const companyLine = document.createElement("div");
    companyLine.classList.add("company-line");
    companyLine.classList.add("firm-container");
    let info = firmInfo.profile
    if(firmInfo === "unavailable") {
        companyLine.innerHTML = `<div class="firm-info">
                                    <h5>Information About Company Symbol ${urlFirmSign} is currently unavailable </h5>
                                </div>`;
    } else {
        let bullOrBear = "green"
        let preColor = info.changesPercentage.slice(0, 1);
        let plus = "+"
        if (preColor === "-") {bullOrBear = "red"; plus = ""}
        let websiteLink = `<p>Company Propaganda: <a target="_blank" href="${info.website}">${info.website}</a></p>`
        if (info.website === '') websiteLink = '';
        companyLine.innerHTML = `<div class="firm-info">
                                <aside>
                                    <img src=" ${info.image}" alt="TM">
                                </aside>
                                <h2> ${info.companyName} </h2>  
                                <sub> ${info.price} USD 
                                    <span class="${bullOrBear}"> (${plus}${info.changesPercentage}%)</span>
                                </sub>
                                <h5>About ${info.companyName}: </h5>
                                <div>${info.description}</div>
                                ${websiteLink}
                            </div>`;
    }
    wrapper.appendChild(companyLine);
}

const getStockHistory = async (symbol) => {
    const url = `${baseUrl}historical-price-full/${symbol}?serietype=line`;
    try {
        let response = await fetch(url);
        let stockHistory = await response.json();
        loader.remove();
        let figures = stockHistory.historical;
        placeChartHTML(figures);
        constructTable(figures);
    } catch (error) {
        console.error(error);
    }
}

marquee.load();

//listeners


if (bodyId==='companyData') getCompanyInfo();

})();

//cookie experiments...

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     let expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }

//   function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
