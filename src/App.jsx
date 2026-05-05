import React, { Component } from "react";
import DeckManager from "./DeckManager";
import CardForm from "./CardForm";
import CardList from "./CardList";
import StudyMode from "./StudyMode";

export default class App extends Component {
  state = {
    decks: [],
    currentDeckId: null,
  };

  componentDidMount() {
    const data = JSON.parse(
      localStorage.getItem("flashcards-app") ||
        '{"decks":[],"currentDeckId":null}',
    );

    if (data.decks.length === 0) {
      const deck = { id: Date.now(), name: "Моя колода", cards: [] };
      data.decks.push(deck);
      data.currentDeckId = deck.id;
    }

    this.setState(data);

    this.interval = setInterval(() => {
      localStorage.setItem("flashcards-app", JSON.stringify(this.state));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCurrentDeck = () => {
    return this.state.decks.find((d) => d.id === this.state.currentDeckId);
  };

  createDeck = (name) => {
    const deck = {
      id: Date.now(),
      name,
      cards: [],
    };

    this.setState((prev) => ({
      decks: [...prev.decks, deck],
      currentDeckId: deck.id,
    }));
  };

  deleteDeck = () => {
    this.setState((prev) => {
      const decks = prev.decks.filter((d) => d.id !== prev.currentDeckId);

      return {
        decks,
        currentDeckId: decks.length ? decks[0].id : null,
      };
    });
  };

  selectDeck = (id) => {
    this.setState({ currentDeckId: Number(id) });
  };

  addCard = (front, back) => {
    this.setState((prev) => ({
      decks: prev.decks.map((d) =>
        d.id === prev.currentDeckId
          ? {
              ...d,
              cards: [
                ...d.cards,
                {
                  id: Date.now(),
                  front,
                  back,
                  learned: false,
                },
              ],
            }
          : d,
      ),
    }));
  };

  deleteCard = (id) => {
    this.setState((prev) => ({
      decks: prev.decks.map((d) =>
        d.id === prev.currentDeckId
          ? {
              ...d,
              cards: d.cards.filter((c) => c.id !== id),
            }
          : d,
      ),
    }));
  };

  toggleLearned = (id) => {
    this.setState((prev) => ({
      decks: prev.decks.map((d) =>
        d.id === prev.currentDeckId
          ? {
              ...d,
              cards: d.cards.map((c) =>
                c.id === id ? { ...c, learned: !c.learned } : c,
              ),
            }
          : d,
      ),
    }));
  };

  render() {
    const currentDeck = this.getCurrentDeck();

    return (
      <div>
        <h1>Flashcards</h1>

        <DeckManager
          decks={this.state.decks}
          currentDeckId={this.state.currentDeckId}
          onCreate={this.createDeck}
          onDelete={this.deleteDeck}
          onSelect={this.selectDeck}
        />

        <CardForm onAdd={this.addCard} />

        <CardList
          cards={currentDeck?.cards || []}
          onDelete={this.deleteCard}
          onToggle={this.toggleLearned}
        />

        <StudyMode cards={currentDeck?.cards || []} />
      </div>
    );
  }
}
