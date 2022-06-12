class MarqueeItem {
    constructor(symbol, price, place) {
        this.symbol = symbol;
        this.price = price;
        this.place = place;
        this.createMarqueeSlot();
        this.appendMarqueeSlot();
    }
    createMarqueeSlot() {
        const marqueeSlot = document.createElement('span');
        marqueeSlot.innerHTML = `<strong>${this.symbol}:&nbsp</strong>${this.price}`
        this.marqueeSlot = marqueeSlot; 
    }
    appendMarqueeSlot() {
        this.place.appendChild(this.marqueeSlot)
    }
}

const marquee = async (baseUrl)  => {
    let url = `${baseUrl}etf/list`
    let response = await fetch(url);
    let data = await response.json();
    let fragmentForMarquee = new DocumentFragment();
    let marqueeItems = data.length
    document.querySelector(".marquee__inner").style.animationDuration = `${marqueeItems/2}s`
    // ^ to account marquee running-speed for possible changes in API list length ^
    for (let i = 0; i < marqueeItems; ++i) {
        let company = data[i] 
        const Marquee_I = new MarqueeItem(company.symbol, company.price, fragmentForMarquee);
        Marquee_I.createMarqueeSlot();
        Marquee_I.appendMarqueeSlot();
        }
   document.querySelector(".marquee__inner").appendChild(fragmentForMarquee);
}
