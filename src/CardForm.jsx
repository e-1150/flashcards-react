import React, { Component } from "react";

export default class CardForm extends Component {
  state = { front: "", back: "" };

  render() {
    return (
      <div>
        <h2>Добавить карточку</h2>

        <input
          placeholder="Лицевая сторона"
          value={this.state.front}
          onChange={(e) => this.setState({ front: e.target.value })}
        />

        <input
          placeholder="Оборотная сторона"
          value={this.state.back}
          onChange={(e) => this.setState({ back: e.target.value })}
        />

        <button
          onClick={() => {
            if (!this.state.front || !this.state.back) return;
            this.props.onAdd(this.state.front, this.state.back);
            this.setState({ front: "", back: "" });
          }}
        >
          Добавить
        </button>
      </div>
    );
  }
}
