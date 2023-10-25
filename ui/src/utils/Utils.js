// Returns the average CMC of of cards in the deck,
// excluding basic lands.
export function AverageCMC({deck}) {
  if (!deck || !deck.mainboard) {
    return 0;
  }
  let i = 0
  let t = 0
  let c = 0
  while (i < deck.mainboard.length) {
    i++
    // Skip basic lands.
    let card = deck.mainboard[i]
    if (card && !IsBasicLand(card)) {
      t += card.cmc
      c++
    }
  }
  return parseFloat(t / c).toFixed(2)
}

// Returns the average CMC of of cards in the deck,
// excluding basic lands.
export function ExtractColors({deck}) {
  if (!deck || !deck.mainboard) {
    return null;
  }
  if (deck.colors) {
    // Decks can override auto-detection by specifying
    // colors explicitly. This is useful if, for example, they only
    // have a single hybrid card and we don't want this deck to count towards that
    // card's colors.
    return deck.colors
  }

  // Calculate the colors based on the card list.
  // Use the basic land types to determine what colors this deck is.
  // This is generally more accurate than basing it off of cards, because oftentimes
  // hybrid cards incorrectly lead the code into thinking a two-color deck is actually three-color.
  let i = 0
  let colors = new Map()
  while (i < deck.mainboard.length) {
    i++
    let card = deck.mainboard[i];
    if (card && IsBasicLand(card)) {
      switch (card.name) {
        case "Forest":
          colors.set("G", true);
          break;
        case "Swamp":
          colors.set("B", true);
          break;
        case "Island":
          colors.set("U", true);
          break;
        case "Plains":
          colors.set("W", true);
          break;
        case "Mountain":
          colors.set("R", true);
          break;
        default:
          console.log("Unexpected basic land: " + card.name)
      }
    }
  }
  return Array.from(colors.keys());
}

// Returns true if the card is a basic land, and false otherwise.
export function IsBasicLand(card) {
  if (card.types && card.types.includes("Basic")) {
    return true
  }
  return false
}

export function SortFunc(a, b) {
  if (a.props.sort > b.props.sort) {
    return -1
  } else if (a.props.sort < b.props.sort) {
    return 1
  }
  return 0
}
