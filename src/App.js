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
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validation = this.validation.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.handleHasTrunfo = this.handleHasTrunfo.bind(this);
  }

  handleHasTrunfo() {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      return true;
    }
    return true;
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      hasTrunfo,
      cardTrunfo,
    } = this.state;

    const cards = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      hasTrunfo,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      cardList: [...prevState.cardList, cards],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      hasTrunfo: this.handleHasTrunfo(),
      cardTrunfo: false,
    }));
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
    // console.log(sumAtrr);
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
      hasTrunfo,
      isSaveButtonDisabled,
      cardList,
    } = this.state;
    return (
      <main>
        <section className="container-main">
          <div>
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              hasTrunfo={ hasTrunfo }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="container-prev">
            <h1>Preview da carta</h1>
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
        </section>
        <section>
          <div className="container-main">
            <h2>Todas as cartas</h2>
            {cardList.map((item, index) => (
              <div className="newCards" key={ index }>
                <div>
                  <h2 data-testid="name-card">
                    { item.cardName }
                  </h2>
                  <img
                    src={ item.cardImage }
                    alt={ item.cardName }
                    data-testid="image-card"
                  />
                  <p data-testid="description-card">{item.cardDescription}</p>
                  <p data-testid="attr1-card">{item.cardAttr1}</p>
                  <p data-testid="attr2-card">{item.cardAttr2}</p>
                  <p data-testid="attr3-card">{item.cardAttr3}</p>
                  <p data-testid="rare-card">{item.cardRare}</p>
                  {cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : ''}
                </div>
              </div>))}
          </div>
        </section>
      </main>
    );
  }
}

export default App;
