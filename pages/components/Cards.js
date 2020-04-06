import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
    constructor(props) {
        super(props);
    }

    mapPlusPlan() {
        const filteredPlan = this.props.plans?.filter(x => x.Name === 'plus')[0];
        const currencyIndicator = this.getCurrencyIndicator(filteredPlan.Currency);
        const plan = {
            MonthlyAmount: this.calculateMonthlyAmount(filteredPlan),
            Name: filteredPlan.Name,
            Title: filteredPlan.Title,
            Subtitle: 'Full-featured mailbox with advanced protection',
            HeaderText: 'Most popular',
            BilledAsText: this.getBilledAsText(filteredPlan),
            Currency: filteredPlan.Currency,
            CurrencyIndicator: currencyIndicator,
            MaxMembers: '1 - 5000 Users *',
            MaxAddresses: filteredPlan.MaxAddresses == 1 ? '1 Address *' : filteredPlan.MaxAddresses + ' Addresses *',
            MaxSpace: this.displayMaxSpace(filteredPlan.MaxSpace) + ' storage *',
            MaxDomains: filteredPlan.MaxDomains == 1 ? 'Supports 1 domain *' : 'Supports ' + filteredPlan.MaxDomains + ' domains *',
            AdditionalFeatures: [
                'Supports folders, labels, filters, auto-reply, IMAP/SMTP, and more',
                'ProtonVPN (optional) *'
            ],
        }
        return plan;
    }

    mapProfessionalPlan() {
        const filteredPlan = this.props.plans?.filter(x => x.Name === 'professional')[0];
        const plan = {
            MonthlyAmount: this.calculateMonthlyAmount(filteredPlan),
            Name: filteredPlan.Name,
            Title: filteredPlan.Title,
            Subtitle: 'ProtonMail for professionals and businesses',
            HeaderText: '',
            BilledAsText: this.getBilledAsText(filteredPlan),
            Currency: filteredPlan.Currency,
            CurrencyIndicator: this.getCurrencyIndicator(filteredPlan.Currency),
            MaxMembers: filteredPlan.MaxMembers == 1 ? '1 User *' : filteredPlan.MaxMembers + ' Users *',
            MaxAddresses: filteredPlan.MaxAddresses == 1 ? '1 Address per user *' : filteredPlan.MaxAddresses + ' Addresses per user *',
            MaxSpace: this.displayMaxSpace(filteredPlan.MaxSpace) + ' storage per user *',
            MaxDomains: filteredPlan.MaxDomains == 1 ? 'Supports 1 domain *' : 'Supports ' + filteredPlan.MaxDomains + ' domains *',
            AdditionalFeatures: [
                'Catch all email, multi user management, priority support and more',
                'ProtonVPN (optional) *'
            ],
        }
        return plan;
    }

    mapVisionaryPlan() {
        const filteredPlan = this.props.plans?.filter(x => x.Name === 'visionary')[0];
        const plan = {
            MonthlyAmount: this.calculateMonthlyAmount(filteredPlan),
            Name: filteredPlan.Name,
            Title: filteredPlan.Title,
            Subtitle: 'ProtonMail for families and small businesses',
            HeaderText: '',
            BilledAsText: this.getBilledAsText(filteredPlan),
            Currency: filteredPlan.Currency,
            CurrencyIndicator: this.getCurrencyIndicator(filteredPlan.Currency),
            MaxMembers: filteredPlan.MaxMembers == 1 ? '1 User' : filteredPlan.MaxMembers + ' Users',
            MaxAddresses: filteredPlan.MaxAddresses == 1 ? '1 Address' : filteredPlan.MaxAddresses + ' Addresses',
            MaxSpace: this.displayMaxSpace(filteredPlan.MaxSpace) + ' storage',
            MaxDomains: filteredPlan.MaxDomains == 1 ? 'Supports 1 domain' : 'Supports ' + filteredPlan.MaxDomains + ' domains',
            AdditionalFeatures: [
                'Includes all features',
                'Priority support',
                'Includes ProtonVPN'
            ],
        }
        return plan;
    }

    mapFreePlan() {
        const plan = {
            MonthlyAmount: 0,
            Name: 'free',
            Title: 'Free',
            Subtitle: 'The basics for private and secure communications',
            HeaderText: '',
            Currency: this.props.plans[0]?.Currency,
            CurrencyIndicator: this.getCurrencyIndicator(this.props.plans[0]?.Currency),
            MaxMembers: '1 User',
            MaxAddresses: '1 Address',
            MaxSpace: '500 MB storage',
            MaxDomains: 'No domain support',
            AdditionalFeatures: [ 'ProtonVPN (optional) *' ],
        };
        return plan;
    }

    calculateMonthlyAmount(plan) {
        switch (this.props.selectedBillingCycle) {
            case '1':
                return Math.round(plan.Pricing['1']) / 100;
            case '12':
            default:
                return Math.round(plan.Pricing['12'] / 12) / 100;
            case '24':
                return Math.round(plan.Pricing['24'] / 24) / 100;
        }
    }

    getCurrencyIndicator(currency) {
        switch (currency) {
            case 'EUR':
            default:
                return '€';
            case 'CHF':
                return 'CHF';
            case 'USD':
                return '$';
        }
    }

    getBilledAsText(filteredPlan) {
        switch (this.props.selectedBillingCycle) {
            case '1':
                return '';
            case '12':
            default:
                const pricingOneYear = filteredPlan.Pricing['12'] / 100;
                return `Billed as ${this.getCurrencyIndicator(filteredPlan.Currency)}${pricingOneYear} per year`;
            case '24':
                const pricingTwoYears = filteredPlan.Pricing['24'] / 100;
                return `Billed as ${this.getCurrencyIndicator(filteredPlan.Currency)}${pricingTwoYears} per 2 years`;
        }
    }

    displayMaxSpace(maxSpaceValue) {
        let maxSpaceInt = parseInt(maxSpaceValue);
        if (!maxSpaceInt) {
            return '0 Bytes';
        }
        let measurement = 'Bytes';
        if (maxSpaceInt < 1024) {
            return maxSpaceInt + ' ' + measurement;
        }
        measurement = 'KB';
        maxSpaceInt = Math.floor(maxSpaceInt / 1024);
        if (maxSpaceInt < 1024) {
            return maxSpaceInt + ' ' + measurement;
        }
        measurement = 'MB';
        maxSpaceInt = Math.floor(maxSpaceInt / 1024);
        if (maxSpaceInt < 1024) {
            return maxSpaceInt + ' ' + measurement;
        }
        measurement = 'GB';
        maxSpaceInt = Math.floor(maxSpaceInt / 1024);
        if (maxSpaceInt < 1024) {
            return maxSpaceInt + ' ' + measurement;
        }
        measurement = 'TB';
        maxSpaceInt = Math.floor(maxSpaceInt / 1024);
        return maxSpaceInt + ' ' + measurement;
    }

    render() {
        const plusPlan = this.mapPlusPlan();
        const professionalPlan = this.mapProfessionalPlan();
        const visionaryPlan = this.mapVisionaryPlan();
        const freePlan = this.mapFreePlan();

        return(
            <div className="row cards">
                <Card plan={freePlan}/>
                <Card plan={plusPlan}/>
                <Card plan={professionalPlan}/>
                <Card plan={visionaryPlan}/>
                <style jsx>{`
                .cards {
                    margin-bottom: 20px;
                }
                `}</style>
            </div>
        )       
    }
}

export default Cards;