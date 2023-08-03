import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Display = ({text, value}) => <p>{text} {value}</p>

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodFeedback = () => setGood(good +1)
  const NeutralFeedback = () => setNeutral(neutral +1)
  const BadFeedback = () => setBad(bad +1)


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
      
    </div>
  )
}

export default App