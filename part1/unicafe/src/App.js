import React, { useState } from "react";

const Header = props => <h1>{props.text}</h1>

const StatisticsLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

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
  return `${good/total * 100} %`;
}

const Statistics = (props) => {
  let total = [props.good, props.neutral, props.bad]

  if (total.length > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={props.good} />
          <StatisticsLine text={"neutral"} value={props.neutral} />
          <StatisticsLine text={"bad"} value={props.bad} />
          <StatisticsLine text={"all"} value={calculateTotal(total)}/>
          <StatisticsLine text={"average"} value={calculateAverage(total)} />
          <StatisticsLine text={"positive"} value={calculatePositive(total)} />
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>
  )

}

const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)

  const setGood = (newValue) => setGoodValue(newValue)
  const setNeutral = (newValue) => setNeutralValue(newValue)
  const setBad = (newValue) => setBadValue(newValue)

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(goodValue + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutralValue + 1)} text="neutral" />
      <Button handleClick={() => setBad(badValue + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={goodValue} neutral={neutralValue} bad={badValue} />
    </div>
  )
}

export default App;
