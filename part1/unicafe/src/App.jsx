import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
)

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text = {'good'} value = {props.good} />
      <StatisticLine text = {'neutral'} value = {props.neutral} />
      <StatisticLine text = {'bad'} value = {props.bad} />
      <StatisticLine text = {'all'} value = {props.good + props.bad + props.neutral} />
      <StatisticLine text = {'average'} value = {props.average} />
      <StatisticLine text = {'postivie'} value = {props.positive} />
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodValue = () => {
    console.log('value before', good)
    setGood(good + 1)
  }
  const incrementNeutralValue = () => {
    console.log('value before', neutral)
    setNeutral(neutral + 1)
  }
  const incrementBadValue = () => {
    console.log('value before', bad)
    setBad(bad + 1)
  }

  const calculateAverage = () => {
    if ((good + neutral + bad) === 0) {
      return ''
    }
    return ( good - bad ) / (good + neutral + bad)
  }
  const calculatePositive = () => {
    if ((good + neutral + bad) === 0) {
      return ''
    }
    return (good * 100) / (good + bad + neutral) + '%'
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {incrementGoodValue} text = {'good'} />
      <Button handleClick = {incrementNeutralValue} text = {'neutral'} />
      <Button handleClick = {incrementBadValue} text = {'bad'} />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} average = {calculateAverage()} positive = {calculatePositive()} />
    </div>
  )
}

export default App
