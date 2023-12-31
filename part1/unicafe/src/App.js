import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>
const Display = ({text}) => <>{text}</>
const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props;
  
  if (all === 0) {
    return (
      <>
        <Display text='No feedback given'></Display>
      </>
    );
  }
  return (
    <table>
      <tbody> 
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        <StatisticsLine text='all' value={all}/>
        <StatisticsLine text='average' value={average}/>
        <StatisticsLine text='positive' value={positive}/>
      </tbody>
    </table>
  );
  
};


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const GoodFeedback = () => {
    setGood(good+1)
    setAll(all+1)
    const updatedGood = good +1
    const updatedAll = all +1
    setAverage((updatedGood-bad)/updatedAll)
    const positiveFeedbackPercentage = PositivePercentage({good: updatedGood, all: updatedAll})
    setPositive(positiveFeedbackPercentage)

  }

  const NeutralFeedback = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    const updatedAll = all +1
    const positiveFeedbackPercentage = PositivePercentage({good: good, all: updatedAll})
    setPositive(positiveFeedbackPercentage)
  }  
  
  const BadFeedback = () => {
    setBad(bad+1)
    setAll(all+1)
    const updatedBad = bad+1
    const updatedAll = all +1
    setAverage((good-updatedBad)/updatedAll)
    const positiveFeedbackPercentage = PositivePercentage({good: good, all: updatedAll})
    setPositive(positiveFeedbackPercentage)
  }

  const PositivePercentage = ({ good, all }) => {
    const positive_percentage = (good/all)*100
    const positive_percentage_string = (positive_percentage.toString()+'%')
    return positive_percentage_string
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button 
        handleClick={GoodFeedback}
        text='good'
      />
      <Button 
        handleClick={NeutralFeedback}
        text='neutral'
      />
      <Button 
        handleClick={BadFeedback}
        text='bad'
      />
      <Header text='statistics'/>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}></Statistics>
    </div>
  )
}

export default App