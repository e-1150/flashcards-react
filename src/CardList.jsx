import React, { Component } from "react";

export default class CardList extends Component {
  render() {
    return (
      <div>
        <h2>Список карточек</h2>

        <table>
          <thead>
            <tr>
              <th>Лицевая</th>
              <th>Оборотная</th>
              <th>Выучена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cards.map((c) => (
              <tr key={c.id}>
                <td>{c.front}</td>
                <td>{c.back}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={c.learned}
                    onChange={() => this.props.onToggle(c.id)}
                  />
                </td>
                <td>
                  <button onClick={() => this.props.onDelete(c.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
