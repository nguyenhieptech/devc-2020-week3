import React, { useState } from "react";
import { Text, View } from "react-native";
import { CHOICES } from "./components/Choices";
import Button from "./components/Button";
import ChoiceCard from "./components/ChoiceCard";
import styles from "./components/Styles";

function App() {
  const [gamePrompt, setGamePrompt] = useState("Choose your weapon!");
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});

  const renderButton = () => (
    CHOICES.map((choice) => {
      return <Button key={choice.name} name={choice.name} onPress={buttonPress} />;
    })
  )
  
  const buttonPress = playerChoice => {
    const [result, computerChoice] = getRoundOutcome(playerChoice);
    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === computerChoice);
  
    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
  };

  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;
    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === computerChoice) result = 'Tie game!';

    return [result, computerChoice];
  };

  const randomComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, color: getResultColor() }}>
        {gamePrompt}
      </Text>

      <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={userChoice} />
        <Text style={{ color: "#250902" }}>vs</Text>
        <ChoiceCard player="Computer" choice={computerChoice} />
      </View>

      {renderButton()}
    </View>
  );
}

export default App;