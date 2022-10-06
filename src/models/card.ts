function cardModel(card: Card | undefined) {
  return {
    toString() {
      if (!card) {
        return "undefined";
      }
      return card.cardType === "actionCard" ? card.action : card.event;
    },
  };
}

export default cardModel;
