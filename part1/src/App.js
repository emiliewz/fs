import { useState } from "react";

const Display = props => <div>{props.value}</div>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset' />
      <Button handleClick={() => setToValue(value + 1)} text='increment' />
    </>
  )

}

export default App;
