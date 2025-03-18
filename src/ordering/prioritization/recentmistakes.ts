import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter(): CardOrganizer {
  function mostRecentFailureIndex(cardStatus: CardStatus): number {
    const failures = cardStatus.getResults()
      .map((result, index) => ({ result, index }))
      .filter(entry => !entry.result)
      .map(entry => entry.index);

    return failures.length > 0 ? Math.max(...failures) : -Infinity;
  }

  return {
    /**
     * Orders the cards by the index of the most recent incorrect answer.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const sortedCards = cards
        .map(card => ({ card, index: mostRecentFailureIndex(card) })) // Pair with index
        .sort((a, b) => b.index - a.index) // Sort by recent mistake index
        .map(entry => entry.card); // Return original references

      return sortedCards;
    }
  };
};

export { newRecentMistakesFirstSorter };
