import React, { useState } from 'react';
import styles from './Game.module.css';

export default function Game() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(5); // Limite de tentatives
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber(1, 100)); // plage de 1 à 100

  function generateSecretNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleGuess = () => {
    const userGuess = parseInt(guess);

    // Vérifie si l'entrée est un nombre valide et s'il est compris entre 1 et 100
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Veuillez entrer un nombre valide entre 1 et 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === secretNumber) {
      setMessage(`Bravo! Vous avez deviné le nombre ${secretNumber} en ${attempts} tentatives.`);
    } else if (userGuess < secretNumber) {
      setMessage(`Le nombre ${userGuess} est plus petit.`);
    } else {
      setMessage(`Le nombre ${userGuess} est plus grand.`);
    }

    if (attempts >= maxAttempts) {
      setMessage(`Vous avez atteint la limite de tentatives. Le nombre secret était ${secretNumber}.`);
    }
  };

  const handleRestart = () => {
    setGuess('');
    setMessage('');
    setAttempts(0);
    setSecretNumber(generateSecretNumber(1, 100)); // Réinitialiser avec une nouvelle plage de nombres
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jeu de Devinette</h1>
      <p className={styles.subtitle}>Devinez le nombre entre 1 et 100</p>
      <div className={styles.inputContainer}>
        <input
          type="text" // Utilisez un champ texte pour permettre à l'utilisateur de saisir des caractères non numériques
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={styles.input}
          placeholder="Entrez votre supposition"
        />
        <button onClick={handleGuess} className={styles.button}>
          Devinez
        </button>
      </div>
      <p className={styles.message}>{message}</p>
      {attempts > 0 && (
        <button onClick={handleRestart} className={`${styles.button} ${styles.restartButton}`}>
        Réinitialiser
      </button>
      )}
    </div>
  );
}
