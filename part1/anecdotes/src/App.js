import { useState } from 'react'
const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>
const Anecdote = ({text, votes}) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const getVotingDictionary = ({}) => {  
    if (!Array.isArray(anecdotes) || anecdotes.length === 0) {
    return {}; // Return an empty object if the input is not an array or it's an empty array
  }
    const dictionary = {};
    for (let i = 0; i < anecdotes.length; i++) {
      dictionary[i] = 0;
    }
  
    return dictionary;
  };

  const [votingDictionary, setVotingDictionary] = useState(getVotingDictionary(anecdotes))
  
  const Select = () => {
    const selected = Math.floor(Math.random() * anecdotes.length);
    setSelected(selected)
  } 

  const Vote = () => {
    const updatedVotingDictionary = { ...votingDictionary };
    updatedVotingDictionary[selected] = (updatedVotingDictionary[selected] || 0) + 1;
    setVotingDictionary(updatedVotingDictionary);
  };

  function MostPopular() {
    let mostPopular = 0;
    let mostVotes = 0;
  
    for (const key in votingDictionary) {
      if (votingDictionary.hasOwnProperty(key)) {
        const value = votingDictionary[key];
        if (value > mostVotes) {
          mostPopular = key;
          mostVotes = value;
        }
      }
    }
  
    return mostPopular;
  }
  
  return (
    <div>
      <Header text={'Anecdote of the day'}></Header>
      <Anecdote text={anecdotes[selected]} votes={votingDictionary[selected]}></Anecdote>
      <Button
        handleClick={Vote}
        text='vote'
      ></Button>
      <Button
        handleClick={Select}
        text='next anecdote'
      ></Button>
      <Header text={'Anecdote with most votes'}></Header>
      <Anecdote text={anecdotes[MostPopular()]} votes={votingDictionary[MostPopular()]}></Anecdote>
    </div>
  )
}

export default App