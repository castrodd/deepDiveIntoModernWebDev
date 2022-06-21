import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const Display = (props) => <div>{props.text}</div>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const Header = (props) => <h1>{props.text}</h1>

const App = () => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))

  const setRandomInt = () => setSelected(Math.floor(Math.random() * 6) + 1)
  const updateVotes = () => {
    const copy = [...voted]
    copy[selected] += 1
    setVoted(copy)
  }
  const highestVote = () => voted.reduce((p, v) => p > v ? p : v)
  let highestVoteIndex = voted.indexOf(highestVote())

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display text={anecdotes[selected]}/>
      <Display text={`has ${voted[selected]} votes`} />
      <Button onClick={updateVotes} text="vote" />
      <Button onClick={setRandomInt} text="next selection"/>

      <Header text="Anecdote with most votes" />
      <Display text={anecdotes[highestVoteIndex]} />
      <Display text={`has ${voted[highestVoteIndex]} votes`} />
    </div>
  )
}

export default App