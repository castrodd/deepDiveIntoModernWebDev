import React, { useState } from "react";

const Header = props => <h1>{props.text}</h1>

const Display = props => <div>{props.text} {props.value}</div>

const DisplayPercentage = props => <div>{props.text} {props.value} %</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const calculateTotal = (values) => {
  const reducer = (x, y) => x + y
  return values.reduce(reducer)
}

const calculateAverage = (values) => {
  const [good, neutral, bad] = values
  let total = good + neutral + bad;
  let average= (good  - bad)/total;
  if (average) {
    return average
  }
  return 0
}

const calculatePositive = (values) => {
  const [good] = values
  const total = calculateTotal(values)
  return good/total * 100;
}

const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)

  const setGood = (newValue) => setGoodValue(newValue)
  const setNeutral = (newValue) => setNeutralValue(newValue)
  const setBad = (newValue) => setBadValue(newValue)

  let total = [goodValue, neutralValue, badValue]

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(goodValue + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutralValue + 1)} text="neutral" />
      <Button handleClick={() => setBad(badValue + 1)} text="bad" />
   
      <Header text="statistics" />
      <Display text={"good"} value={goodValue} />
      <Display text={"neutral"} value={neutralValue} />
      <Display text={"bad"} value={badValue} />
      <Display text={"all"} value={calculateTotal(total)}/>
      <Display text={"average"} value={calculateAverage(total)} />
      <DisplayPercentage text={"positive"} value={calculatePositive(total)} />
    </div>
  )
}

export default App;
