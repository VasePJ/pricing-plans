import Select from 'react-select';
import React, { Component } from 'react';


const billingCycleOptions = [
    { value: '1', label: 'Monthly' },
    { value: '12', label: 'Annually' },
    { value: '24', label: '2 Years' }
];

const currencyOptions = [
    { value: 'EUR', label: '€ Euro' },
    { value: 'CHF', label: 'CHF' },
    { value: 'USD', label: '$ USD' }
];

class Selectors extends Component {
    constructor(props){
        super(props);
        this.handleBillingCycleChange = this.handleBillingCycleChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    }
    handleBillingCycleChange(billingCycle) {
        this.props.onBillingCycleChange(billingCycle?.value);
    }
    handleCurrencyChange(currency) {
        this.props.onCurrencyChange(currency?.value);
    }
    render() {
        return(
            <div className="selectors row justify-content-end">
                <div className="selector billing-cycle float-right">
                    <Select instanceId="billing-cycle-selector"
                        options={billingCycleOptions}
                        defaultValue={billingCycleOptions[1]}
                        onChange={this.handleBillingCycleChange}
                        placeholder="Billing Cycle" />
                </div>
                <div className="selector currency float-right">
                    <Select instanceId="currency-selector"
                        options={currencyOptions}
                        defaultValue={currencyOptions[0]}
                        onChange={this.handleCurrencyChange}
                        placeholder="Currency" />
                </div>
                <style jsx>{`  
                    .selectors {
                        margin-bottom: 15px;
                    }
                    .selector {
                        width: 150px;
                    }
                    .selector.billing-cycle {
                        margin-right: 15px;
                    }
                `}</style>
            </div>
        )       
    }
}



export default Selectors;