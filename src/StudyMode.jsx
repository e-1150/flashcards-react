import React, { Component } from "react";

export default class StudyMode extends Component {
  state = {
    index: 0,
    flipped: false,
    mode: "all",
  };

  getCards = () => {
    const { cards } = this.props;

    if (this.state.mode === "unlearned") {
      return cards.filter((c) => !c.learned);
    }

    return cards;
  };

  render() {
    const cards = this.getCards();

    if (cards.length === 0) {
      return <div>Нет карточек</div>;
    }

    const card = cards[this.state.index];

    return (
      <div>
        <h2>Режим изучения</h2>

        <select
          value={this.state.mode}
          onChange={(e) => this.setState({ mode: e.target.value, index: 0 })}
        >
          <option value="all">Все</option>
          <option value="unlearned">Невыученные</option>
        </select>

        <div className="study-card">
          {this.state.flipped ? card.back : card.front}
        </div>

        <div className="controls">
          <button
            onClick={() =>
              this.setState((s) => ({
                index: Math.max(0, s.index - 1),
                flipped: false,
              }))
            }
          >
            Назад
          </button>

          <button
            onClick={() => this.setState((s) => ({ flipped: !s.flipped }))}
          >
            Перевернуть
          </button>

          <button
            onClick={() =>
              this.setState((s) => ({
                index: Math.min(cards.length - 1, s.index + 1),
                flipped: false,
              }))
            }
          >
            Вперёд
          </button>
        </div>

        <div>
          {this.state.index + 1} / {cards.length}
        </div>
      </div>
    );
  }
}
