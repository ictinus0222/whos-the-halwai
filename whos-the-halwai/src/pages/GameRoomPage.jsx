import { useLocation } from 'react-router-dom';


export default function GamePage() {
  const { state } = useLocation();
  const { role, secretWord } = state;


  return (
    <div>
      <h2>You are: {role}</h2>
      {role === 'player' ? (
        <p> Your secret word: <strong>{secretWord}</strong></p>
      ) : (
        <p>You are the Spy! Try to blend in.</p>
      )}
      <p>Discuss with others and vote for the Spy!</p>
    </div>
  );
}