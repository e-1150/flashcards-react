import React, { Component } from "react";

export default class DeckManager extends Component {
  state = { name: "" };

  render() {
    const { decks, currentDeckId, onCreate, onDelete, onSelect } = this.props;

    return (
      <div>
        <h2>Колоды</h2>

        <input
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="Название колоды"
        />

        <button
          onClick={() => {
            if (!this.state.name.trim()) return;
            onCreate(this.state.name);
            this.setState({ name: "" });
          }}
        >
          Создать
        </button>

        <select
          value={currentDeckId || ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          {decks.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <button onClick={onDelete}>Удалить</button>
      </div>
    );
  }
}
