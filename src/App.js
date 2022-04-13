/* eslint-disable lines-between-class-members */
import React from 'react';
import './components/style.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      // hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validation = this.validation.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validation());
  }

  validation() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const sumAtrr = parseFloat(cardAttr1) + parseFloat(cardAttr2) + parseFloat(cardAttr3);
    console.log(sumAtrr);
    const valor = 210;
    const max = 90;

    const errorCases = [
      cardName.length !== 0,
      cardDescription.length !== 0,
      cardImage.length !== 0,
      cardRare.length !== 0,
      cardAttr1.length !== 0,
      cardAttr1 <= max,
      cardAttr1 >= 0,
      cardAttr2.length !== 0,
      cardAttr2 <= max,
      cardAttr2 >= 0,
      cardAttr3.length !== 0,
      cardAttr3 <= max,
      cardAttr3 >= 0,
      sumAtrr <= valor,
    ];

    const isDisabled = errorCases.every((err) => err === true);

    this.setState({
      isSaveButtonDisabled: !isDisabled,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      // hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <main className="container-main">
        <div>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            onInputChange={ this.onInputChange }
            isSaveButtonDisabled={ isSaveButtonDisabled }
          />
        </div>
        <div className="container-prev">
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            onInputChange={ this.onInputChange }
          />
        </div>
      </main>
    );
  }
}

export default App;
