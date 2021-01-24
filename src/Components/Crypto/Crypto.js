import React, { Component } from "react";
import axios from "axios";
import CryptoList from "./CryptoList/CryptoList";

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cryptoData: [],
            currencyList: [],
            staticCurrencyList: [],
        };
    }

    getCrypto = () => {
        return (
            axios
                .get("https://blockchain.info/pl/ticker")
                .then((response) => {
                    const cryptoRes = response.data;
                    let cryptoArr = [];

                    cryptoArr = Object.keys(cryptoRes).map((key) => {
                        return {
                            currency: key,
                            buy: cryptoRes[key].buy,
                            sell: cryptoRes[key].sell,
                            symbol: cryptoRes[key].symbol,
                            lastRate: cryptoRes[key].last,
                        };
                    });
                    // console.log(cryptoArr);

                    this.setState({
                        cryptoData: cryptoArr,
                        currencyList: Object.keys(cryptoRes),
                    });
                })
                // .catch((err) => console.log(`Error: ${err}`))
                .then(console.log(this.state.cryptoData))
        );
    };

    componentDidMount() {
        // Call this function so that it fetch first time right after mounting the component
        this.getCrypto();
        // set Interval - set to 30s
        this.interval = setInterval(this.getCrypto, 30000);
    }

    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }

    render() {
        const currencyList = this.state.currencyList.join(" ");

        return (
            <div>
                <h1>BitCoin Rates</h1>
                <p>Tracked currencies: {currencyList}</p>
                <CryptoList rates={this.state.cryptoData} />
            </div>
        );
    }
}

export default Crypto;
