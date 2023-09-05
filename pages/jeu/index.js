import React, { useState, useEffect } from 'react';
import styles from './Game.module.css';


const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function Memory() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [solvedCards, setSolvedCards] = useState([]);

  const symbols = ['🌟', '🍎', '🍕', '🚀', '🎉', '🌈', '🐶', '🐱'];

  useEffect(() => {
    const initialCards = shuffleArray([...symbols, ...symbols]);
    setCards(initialCards);
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || solvedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setSolvedCards([...solvedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
	<div className={styles.centered}>
	  <div className={styles.container}>
		<div className={styles.background}>
			<h1 className={styles.title}>Jeu de Memoire</h1>
				<div className={styles.board}>
					{cards.map((card, index) => (
					<div
						key={index}
						className={`${styles.card} ${flippedCards.includes(index) ? styles.flipped : ''} ${solvedCards.includes(index) ? styles.solved : ''}`}
						onClick={() => handleCardClick(index)}
					>
						{flippedCards.includes(index) || solvedCards.includes(index) ? card : '❓'}
					</div>
					))}
				</div>
			</div>
	  </div>
	</div>
  );
  
}
