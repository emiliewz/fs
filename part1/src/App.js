import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => console.log('hello', who)

  return (
    <>
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </>
  )

}

export default App;
