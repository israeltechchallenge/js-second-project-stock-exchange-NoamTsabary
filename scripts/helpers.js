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

const noResultsFound = (searchValue, location) => {
    const companyLine = document.createElement("div");
    companyLine.classList.add("company-line");
    companyLine.classList.add("alert");
    companyLine.innerText = `No Results for: "${searchValue}".Try Again.`;
    cleanSlate()
    location.appendChild(companyLine);
}

const cleanSlate = async () =>  {
    let listCheck = document.querySelectorAll(".company-line");
    if (listCheck) {for (const eachLine of listCheck) eachLine.remove()};
    let loader = document.querySelector('.loading');
    if (loader) loader.remove();
}

const checkObject = async (obj) => {
    if (Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype)
        return true
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



