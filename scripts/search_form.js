class SearchForm {
    constructor() {
        this.create()
        this.bind()
    }

    create = () => {
        const searchArea = document.createElement('input');
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-dark');
        button.setAttribute('type', 'button');
        button.innerText = 'Search'
        searchArea.classList.add('form-control');
        topBar.appendChild(searchArea);
        topBar.appendChild(button);

        this.button = button;
        this.searchArea = searchArea;
    }

    bind = () => {
        this.button.addEventListener('click', this.getData);
        this.searchArea.addEventListener('input', debounce(this.getData));
        this.searchArea.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              this.button.click();
            }
          });
    }

    getData = () => {
        cleanSlate();
        const searchValue = this.searchArea.value;
        if (searchValue.length === 0) {return}
        const url = `${baseUrl}search?query=${searchValue}&amp;limit=10&amp;exchange=NASDAQ`;
        loading(wrapper);

        this.searchValue = searchValue;
        this.url = url;
        this.fetchData();
    }

    fetchData = async () => {
        //would have liked to place an aborter here,
        // but a bit tricky for me atm with the time I have :)
        try {
            let response = await fetch(this.url);
            let companies = await response.json();
            if (response.ok && companies.length === 0) noResultsFound(this.searchValue, wrapper)
            else results.printSearchResults(companies);
        } catch (error) {
            console.error(error);
        }
    }
}

const form = new SearchForm;
