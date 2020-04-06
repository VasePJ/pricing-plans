import React, { Component } from 'react';
import Cards from './Cards';
import Selectors from './Selectors';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.handleBillingCycleChange = this.handleBillingCycleChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            isLoading: false,
            plans: [],
            selectedCurrency: 'EUR',
            selectedBillingCycle: '12'
        };
    }

    async componentDidMount() {
        await this.handleCurrencyChange(this.state.selectedCurrency);
    }

    async requestPlans(currency) {
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json;charset=utf-8');
        myHeaders.append('x-pm-appversion', 'Other');
        myHeaders.append('x-pm-apiversion', '3');
        myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        const response = await fetch(`https://api.protonmail.ch/payments/plans?Currency=${currency}`, myInit);
        const result = await response.json();

        return result.Plans;
    };

    handleBillingCycleChange(billingCycle) {
        this.setState({
            selectedBillingCycle: billingCycle
        });
    }

    async handleCurrencyChange(currency) {
        if (currency) {
            const plans = await this.requestPlans(currency);
            this.setState({
                isLoaded: true,
                isLoading: false,
                plans: plans,
                selectedCurrency: currency
            });
        }
    }

    render(){
        if (this.state.isLoaded) {
            return (
                <div>
                    <Selectors
                        onBillingCycleChange={this.handleBillingCycleChange}
                        onCurrencyChange={this.handleCurrencyChange} />
                    <Cards 
                        plans={this.state.plans}
                        selectedBillingCycle={this.state.selectedBillingCycle} />
                    <style jsx>{`  
                   
                `}</style>
                </div>
            )
        } else {
            return (
                <div>Loading ...</div>
            )
        }
    }

}
export default Layout;
