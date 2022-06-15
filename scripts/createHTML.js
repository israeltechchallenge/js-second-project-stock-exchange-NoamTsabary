const wrapper = document.createElement('div');
const topBar = document.createElement('div');

const marqueeDiv = document.createElement('div');
const innerMarquee = document.createElement('div');

marqueeDiv.classList.add("marquee");
innerMarquee.classList.add("marquee__inner");
innerMarquee.ariaHidden = true;
wrapper.classList.add("wrapper")

topBar.classList.add('top-bar')

marqueeDiv.appendChild(innerMarquee);
body.appendChild(wrapper);
wrapper.appendChild(marqueeDiv);
wrapper.appendChild(topBar);
