const wrapper = document.createElement('div');
const topBar = document.createElement('div');
const searchArea = document.createElement('input');
const button = document.createElement('button');
const marqueeDiv = document.createElement('div');
const innerMarquee = document.createElement('div');

marqueeDiv.classList.add("marquee");
innerMarquee.classList.add("marquee__inner");
innerMarquee.ariaHidden = true;
wrapper.classList.add("wrapper")
button.classList.add('btn', 'btn-dark');
button.setAttribute('type', 'button');
button.innerText = 'Search'
searchArea.classList.add('form-control');
topBar.classList.add('top-bar')

marqueeDiv.appendChild(innerMarquee);
body.appendChild(wrapper);
wrapper.appendChild(marqueeDiv);
wrapper.appendChild(topBar);
topBar.appendChild(searchArea);
topBar.appendChild(button);