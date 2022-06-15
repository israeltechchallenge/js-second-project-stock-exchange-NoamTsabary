class Results {
    constructor() {
        this.printSearchResults
    }

    printSearchResults = async (companies) => {
        const maxToDisplay = Math.min(companies.length, 10);
    for (let i = 0; i < maxToDisplay ; i++) {
        if (companies[i] === undefined || null)
         // sometimes I can't access the companies[i] and it breaks my code.
         // couldn't figure out why, hopefully a server issue and not my code...
         {console.error("companies[i] unreadable [at printSearchResults in performSearch]");}
        else {
            this.symbol = companies[i].symbol;
            this.firmName = companies[i].name
            await this.getImageAndStockChange();
        }
    }
    await cleanSlate()
    wrapper.appendChild(fragmentForList);
    }

    getImageAndStockChange = async () => {
        const url = `${baseUrl}company/profile/${this.symbol}`;
        try {
            let response = await fetch(url);
            let firmInfo = await response.json();
            let info = firmInfo.profile
            if (await checkObject(firmInfo)) {
                console.error("empty object [at getImageAndStockChange in printSearchResults in performSearch");
                await printLine(info = {changesPercentage: "cannot access"}, this.symbol, 'red', '')
                // getting some empty objects... not sure why, but at least this works.
            } else {
                let bullOrBear = "green"
                let preColor = info.changesPercentage.slice(0, 1);
                let plus = "+"
                if (preColor === "-") {bullOrBear = "red"; plus = ""}
                await this.printLine(info, this.symbol, bullOrBear, plus)
            }
        } catch (error) {
            console.error(error);
        }
    }

    printLine = async (info, symbol, bullOrBear, plus) => {
        const companyLine = document.createElement("div");
        companyLine.classList.add("company-line");
        companyLine.innerHTML = `<a href="./company.html?symbol=${symbol}">
                                <img src=" ${info.image}" alt="(TM)">
                                ${this.firmName} (${symbol})
                                <span class="${bullOrBear}"> (${plus}${info.changesPercentage}%)</span>
                                </a>`;
        fragmentForList.appendChild(companyLine);
    }
}

const results = new Results;