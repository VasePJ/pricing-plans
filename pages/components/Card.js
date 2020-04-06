import React, { Component } from 'react';
import Button from './Button';

class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { plan } = this.props;
    return ( 
      <div className="card col-md-3">
        <div className="card-container">
          <div className="header">{plan.HeaderText}</div>
          <h4 className="title">{plan.Name}</h4>
          <div className="amount">{plan.CurrencyIndicator}<span className="monthly-amount">{plan.MonthlyAmount}</span>/mo</div>
          <div className="amount-subtext">{plan.BilledAsText}</div>
          <div className="subtitle">{plan.Subtitle}</div>
          <div className="features">
            <p>&rarr; {plan.MaxMembers}</p>
            <p>&rarr; {plan.MaxAddresses}</p>
            <p>&rarr; {plan.MaxSpace}</p>
            <p>&rarr; {plan.MaxDomains}</p>
            {plan.AdditionalFeatures.map((feature) => <p>&rarr; {feature}</p>)}
          </div>
          <div className="footer">
            <Button/>
          </div>
        </div>
        
        <style jsx>{`
        .card {
          padding-left: 40px;
          padding-right: 40px;
          padding-top: 5px;
        }
        .card-container {
          position: relative;
          height: 100%;
        }
        .header {
          height: 40px;
          display: block;
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          color: #97c379;
        }
        .title {
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
        }
        .amount {
          text-align: center;
        }
        .monthly-amount {
          font-size: 36px;
          font-weight: 400;
        }
        .amount-subtext {
          height: 60px;
          display: block;
          text-align: center;
          font-size: 13px;
        }
        .subtitle {
          text-align: center;
          min-height: 90px;
        }
        .features {
          margin-bottom: 150px;
        }
        .footer {
          position: absolute;
          bottom: 50px;
          width: 100%;
          max-height: 60px;
        }
          `}
        </style>
      </div>
  )
  }
}

export default Card;