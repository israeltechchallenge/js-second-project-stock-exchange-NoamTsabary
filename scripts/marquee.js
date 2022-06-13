class Marquee {
    constructor(fragment, symbol, price,) {
        this.symbol = symbol;
        this.price = price;
        this.fragment = fragment;
    }

    async load() {
        let response = await fetch(`${baseUrl}/etf/list`);
        let data = await response.json();
        let marqueeItems = data.length
        
        this.marqueeItems = marqueeItems;
        this.data = data;
        
        marquee.handleData()
        marquee.setRunningSpeed()
        marquee.printMarquee()
    }

    handleData() {
        for (let i = 0; i < this.marqueeItems; ++i) {
            let company = this.data[i] 
            const MarqueeItem = new Marquee(this.fragment, company.symbol, company.price);
            MarqueeItem.createMarqueeSlot();
            MarqueeItem.appendMarqueeSlot();
            }
    } 

    createMarqueeSlot() {
        const marqueeSlot = document.createElement('span');
        marqueeSlot.innerHTML = `<strong>${this.symbol}:&nbsp</strong>${this.price}`
        this.marqueeSlot = marqueeSlot; 
    }
    appendMarqueeSlot() {
        this.fragment.appendChild(this.marqueeSlot);
    }

    setRunningSpeed() {
        document.querySelector(".marquee__inner").style.animationDuration = `${this.marqueeItems/2}s`
    }
    printMarquee() {
        document.querySelector(".marquee__inner").appendChild(this.fragment)
    }
}

const marquee = new Marquee (fragmentForMarquee);