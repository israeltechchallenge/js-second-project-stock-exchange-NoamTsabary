const placeChartHTML = (figures) => {
    const chartHeader = document.createElement('h2');
    chartHeader.classList.add('chart-header');
    // selectorHTML(chartHeader, figures)
    chartHeader.innerText = 'Historical Stock Prices';
    const chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-wrapper');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'myChart');
    chartWrapper.appendChild(chartHeader);
    chartWrapper.appendChild(canvas);
    document.querySelector(".firm-info").appendChild(chartWrapper);
}
// WIP
// const selectorHTML = (chartHeader, figures) => {
//     const selector = document.createElement('select');
//     selector.classList.add('form-select', 'd-flex')
//     selector.ariaLabel = 'Sort Results by';
//     selector.id = 'sortResults';
//     selector.onchange = () => {test(figures)}
//     const optionDisabled = document.createElement('option');
//     optionDisabled.setAttribute('disabled', 'disabled');
//     optionDisabled.innerText = 'Select:';
//     const optionFullData = document.createElement('option');
//     optionFullData.value = 'All';
//     optionFullData.innerText = 'Full Historical Data';
//     const option14days = document.createElement('option');
//     option14days.value = '14';
//     option14days.innerText = 'Last 14 Days';
//     const option100days = document.createElement('option');
//     option100days.value = '100';
//     option100days.innerText = 'Last 100 Days';
//     selector.appendChild(optionDisabled);
//     selector.appendChild(optionFullData);
//     selector.appendChild(option14days);
//     selector.appendChild(option100days);
//     chartHeader.appendChild(selector);

// }

const constructTable = async (arr) => {
    var labels = [];
    var close = [];
    let daysDisplayed = arr.length
    for (let i = 0; i < daysDisplayed; i++) {
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
        type: 'bar',
        data: data,
        options: {}
    };
        const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

// async function test() {
//     let option = document.querySelector("#sortResults").value
//     daysDisplayed = option
// }
