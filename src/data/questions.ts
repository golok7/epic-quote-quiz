export interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  prize: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: '"You have five husbands, go and seek help from them." Who said this to whom?',
    options: [
      { label: "A", text: "Bhishma to Draupadi" },
      { label: "B", text: "Dushasana to Draupadi" },
      { label: "C", text: "Duryodhana to Draupadi" },
      { label: "D", text: "Karna to Draupadi" },
    ],
    correctAnswer: "D",
    prize: "₹1,000",
  },
  {
    id: 2,
    question: '"I shall not fight you, my son." Who said this to whom?',
    options: [
      { label: "A", text: "Drona to Ashwatthama" },
      { label: "B", text: "Karna to Shalya" },
      { label: "C", text: "Bhishma to Karna" },
      { label: "D", text: "Bhishma to Arjuna" },
    ],
    correctAnswer: "D",
    prize: "₹2,000",
  },
  {
    id: 3,
    question: '"Today I will break your Gandiva bow!" Who said this to whom?',
    options: [
      { label: "A", text: "Karna to Arjuna" },
      { label: "B", text: "Duryodhana to Arjuna" },
      { label: "C", text: "Bhishma to Arjuna" },
      { label: "D", text: "Ashwatthama to Arjuna" },
    ],
    correctAnswer: "A",
    prize: "₹5,000",
  },
  {
    id: 4,
    question: '"Give me your divine armour and earrings." Who said this to whom?',
    options: [
      { label: "A", text: "Krishna to Karna" },
      { label: "B", text: "Indra to Karna" },
      { label: "C", text: "Surya to Karna" },
      { label: "D", text: "Bhishma to Karna" },
    ],
    correctAnswer: "B",
    prize: "₹10,000",
  },
  {
    id: 5,
    question: '"Where there is Dharma, there will be victory." Who said this to whom?',
    options: [
      { label: "A", text: "Arjuna to Krishna" },
      { label: "B", text: "Krishna to Arjuna" },
      { label: "C", text: "Yudhishthira to Draupadi" },
      { label: "D", text: "Bhishma to Yudhishthira" },
    ],
    correctAnswer: "B",
    prize: "₹20,000",
  },
  {
    id: 6,
    question: '"Even if the whole world stands against you, I will stand with you." Who said this to whom?',
    options: [
      { label: "A", text: "Lakshmana to Rama" },
      { label: "B", text: "Hanuman to Rama" },
      { label: "C", text: "Bharata to Rama" },
      { label: "D", text: "Arjuna to Yudhishthira" },
    ],
    correctAnswer: "C",
    prize: "₹40,000",
  },
  {
    id: 7,
    question: '"Your anger is your greatest enemy, O Bhima." Who said this to whom?',
    options: [
      { label: "A", text: "Yudhishthira to Bhima" },
      { label: "B", text: "Krishna to Bhima" },
      { label: "C", text: "Arjuna to Bhima" },
      { label: "D", text: "Bhishma to Bhima" },
    ],
    correctAnswer: "A",
    prize: "₹80,000",
  },
  {
    id: 8,
    question: '"Your devotion moves me. Ask for a boon." Who said this to whom?',
    options: [
      { label: "A", text: "Rama to Shabari" },
      { label: "B", text: "Shiva to Ravana" },
      { label: "C", text: "Surya to Karna" },
      { label: "D", text: "Indra to Kunti" },
    ],
    correctAnswer: "A",
    prize: "₹1,60,000",
  },
  {
    id: 9,
    question: '"Even I cannot change what is destined, Gandhari." Who said this to whom?',
    options: [
      { label: "A", text: "Krishna to Gandhari" },
      { label: "B", text: "Vyasa to Gandhari" },
      { label: "C", text: "Vidura to Gandhari" },
      { label: "D", text: "Dhritarashtra to Gandhari" },
    ],
    correctAnswer: "A",
    prize: "₹3,20,000",
  },
  {
    id: 10,
    question: '"In protecting you, I have protected Dharma." Who said this to whom?',
    options: [
      { label: "A", text: "Krishna to Draupadi" },
      { label: "B", text: "Bhishma to Arjuna" },
      { label: "C", text: "Hanuman to Rama" },
      { label: "D", text: "Rama to Vibhishana" },
    ],
    correctAnswer: "A",
    prize: "₹6,40,000",
  },
  {
    id: 11,
    question: '"By abandoning me, you have abandoned Dharma itself." Who said this to whom?',
    options: [
      { label: "A", text: "Mandodari to Ravana" },
      { label: "B", text: "Tara to Vali" },
      { label: "C", text: "Sita to Lakshmana" },
      { label: "D", text: "Draupadi to Yudhishthira" },
    ],
    correctAnswer: "D",
    prize: "₹12,50,000",
  },
  {
    id: 12,
    question: '"I have the power to destroy the three worlds, but I serve Rama alone." Who said this to whom?',
    options: [
      { label: "A", text: "Jambavan to Sugriva" },
      { label: "B", text: "Hanuman to Bhima" },
      { label: "C", text: "Hanuman to Vibhishana" },
      { label: "D", text: "Garuda to Rama" },
    ],
    correctAnswer: "B",
    prize: "₹25,00,000",
  },
  {
    id: 13,
    question: '"Not by strength, but by strategy shall the foe be conquered." Who said this to whom?',
    options: [
      { label: "A", text: "Rama to Sugriva" },
      { label: "B", text: "Krishna to Yudhishthira" },
      { label: "C", text: "Hanuman to Angada" },
      { label: "D", text: "Vidura to Dhritarashtra" },
    ],
    correctAnswer: "D",
    prize: "₹50,00,000",
  },
  {
    id: 14,
    question: '"Go back, Arjuna. Today you shall not pass me." Who said this to whom?',
    options: [
      { label: "A", text: "Bhishma to Arjuna" },
      { label: "B", text: "Karna to Arjuna" },
      { label: "C", text: "Drona to Arjuna" },
      { label: "D", text: "Shalya to Arjuna" },
    ],
    correctAnswer: "C",
    prize: "₹1 Crore",
  },
  {
    id: 15,
    question: '"Arjuna, you have already killed him in your mind; the arrow is only a formality." Who said this to whom?',
    options: [
      { label: "A", text: "Krishna to Arjuna" },
      { label: "B", text: "Vyasa to Arjuna" },
      { label: "C", text: "Bhishma to Arjuna" },
      { label: "D", text: "Yudhishthira to Arjuna" },
    ],
    correctAnswer: "A",
    prize: "₹5 Crore",
  },
];
