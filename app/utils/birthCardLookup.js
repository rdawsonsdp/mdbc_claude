// Birth card lookup data
const birthCardData = [
  { date: 'December 30', card: 'A♥', cardName: 'Ace of Hearts' },
  { date: 'May 31', card: 'A♣', cardName: 'Ace of Clubs' },
  { date: 'June 29', card: 'A♣', cardName: 'Ace of Clubs' },
  { date: 'January 1', card: 'K♠', cardName: 'King of Spades' },
  { date: 'December 31', card: '🎭', cardName: 'Joker' }
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function getBirthCard(birthdate) {
  const date = new Date(birthdate);
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const dateString = `${month} ${day}`;
  
  // For demo purposes, returning a sample card
  // In production, this would look up from the full data
  const sampleCards = [
    { card: 'K♥', cardName: 'King of Hearts' },
    { card: 'Q♦', cardName: 'Queen of Diamonds' },
    { card: 'J♣', cardName: 'Jack of Clubs' },
    { card: 'A♠', cardName: 'Ace of Spades' },
    { card: '10♥', cardName: 'Ten of Hearts' }
  ];
  
  // Simple hash to consistently return same card for same date
  const hash = (date.getMonth() + date.getDate()) % sampleCards.length;
  return sampleCards[hash];
}