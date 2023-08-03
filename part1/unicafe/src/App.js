import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Display = ({text, value}) => <p>{text} {value}</p>

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
    const positive_percentage = good/updatedAll
    const positive_percentage_string = (positive_percentage.toString()+'%')
    setPositive(positive_percentage_string)
  }  
  
  const BadFeedback = () => {
    setBad(bad+1)
    setAll(all+1)
    const updatedBad = bad+1
    const updatedAll = all +1
    setAverage((good-updatedBad)/updatedAll)
    const positive_percentage = good/updatedAll
    const positive_percentage_string = (positive_percentage.toString()+'%')
    setPositive(positive_percentage_string)
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
      <Display text='good' value= {good}></Display>
      <Display text='neutral' value= {neutral}></Display>
      <Display text='bad' value= {bad}></Display>
      <Display text='all' value= {all}></Display>
      <Display text='average' value= {average}></Display>
      <Display text='positive' value= {positive} ></Display>
    </div>
  )
}

export default App