import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


// Spoiler


const Spoiler = ({ header = "+", open, children }) => {
  const [isOpen, setOpen] = useState(open)

  const clickSetOpen = () => {
    setOpen(!isOpen)
  }

  return (
    <div onClick={clickSetOpen} style={{ cursor: "pointer" }}>
      <div>{header}</div>
      {isOpen && children}
    </div>
  )
}


// RangeInput


function RangeInput({ max, min, ...props }) {
  const [width, setWidth] = useState("")

  return (
    <input {...props}
      style={{ borderColor: width.length > max || width.length < min ? "red" : "" }}
      onChange={event => setWidth(event.target.value)}
    />
  )
}


// LoginForm


function LoginForm({ onLogin, className, max, min }) {
  const [stateLogin, setLog] = useState("")
  const [statePassword, setPas] = useState("")

  return (
    <div className={className}>
      <input placeholder="login" type="text" onChange={event => setLog(event.target.value)} />
      <input placeholder="password" type="password" onChange={event => setPas(event.target.value)} />
      <button
        disabled={stateLogin.length < min || statePassword.length < min || stateLogin.length > max || statePassword.length > max || stateLogin.match(/(?=.*[a-z])(?=.*[A-Z])/g) === null || statePassword.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g) === null}
        // onClick ={() => onLogin({login: stateLogin, password: statePassword})}
        onClick={() => onLogin(stateLogin, statePassword)}
      >login</button>
      <Spoiler>
        <p>Логин должен содержать минимум одну заглавную и одну не заглавную буквы, от {min} до {max} символов, <br />
          Пароль должен содержать минимум одну заглавную, одну цифру и одну не заглавную буквы, от {min} до {max} символов
        </p>
      </Spoiler>
    </div>
  )
}


// PasswordConfirm


function PasswordConfirm({ className, min, onValue }) {
  const [statePass, setPass] = useState("")
  const [stateConfirmPass, setConfirmPass] = useState("")

  function redBorder(state1, state2) {
    return { borderColor: state1.length < min || state2.length < min || state1 !== state2 || state1.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g) === null || state2.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g) === null ? "red" : "" }

  }

  return (
    <div className={className}>
      <input type='password' placeholder="password"
        style={redBorder(statePass, stateConfirmPass)}
        onChange={event => setPass(event.target.value)}
      />
      <input type='password' placeholder="confirm password"
        style={redBorder(statePass, stateConfirmPass)}
        onChange={event => setConfirmPass(event.target.value)}
      />
      <button
        disabled={statePass.length < min || stateConfirmPass.length < min || statePass !== stateConfirmPass || statePass.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g) === null || stateConfirmPass.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g) === null}
        onClick={() => onValue(statePass)}
      >Password Confirm</button>
      <Spoiler>
        <p>Пароль должен содержать минимум одну заглавную, одну цифру и одну не заглавную буквы, от {min} символов</p>
      </Spoiler>
    </div>
  )
}


// Carousel


function Carousel({ images }) {
  const [state, setState] = useState(0)
  const maxState = images.length

  return (
    <div className="carousel">
      <div className="carouselImg">
        <span className="arrowLeft"
          onClick={() => {
            setState(state === 0 ? maxState - 1 : state - 1)
          }}
        ></span>
        <img style={{ width: "98vw", height: "27vw", objectFit: "cover" }} src={images[state]} />
        <span className="arrowRight"
          onClick={() => {
            setState(state === maxState - 1 ? 0 : state + 1)
          }}
        ></span>
      </div >
      <Thumbnails images={images} current={state} onChange={setState} />
    </div>
  )
}

function Thumbnails({ images, current, onChange }) {
  return (
    <div className="thumbnails">
      {images.map((image, index) => <img key={image} style={{
        border: current === index && "0.2em solid black"
      }} src={image} onClick={() => onChange(index)} />)}
    </div>
  )
}


// Pagination


const Content = ({page}) => 
<div style={{fontSize: '5em'}}>
    Сторінка №{page}
</div>

const Color = ({page}) =>
<div style={{color: `rgb(${page*16},${page*16},${page*16})`}}>
    {page}
</div>


const Pagination = ({render, max}) => {
  const [page, setPage] = useState(1)

  const Render = render
  const arrPages = []

  for(let i = 1; i <= max; i++) {
    arrPages.push(<button key={i} disabled={page === i} onClick={() => setPage(i)}>{i}</button>)
  }

  return (
    <div className="pagination">
        <Render page={page} />
        <button disabled={page === 1} onClick={() => setPage(1)} >{"<<"}</button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</button>
        {arrPages}
        <button disabled={page === max} onClick={() => setPage(page + 1)} >{">"}</button>
        <button disabled={page === max} onClick={() => setPage(max)}>{">>"}</button>
    </div>
  )
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Carousel</h1>
        <Carousel images={["https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-1.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-2.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-3.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-4.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-5.jpg"]} />
      </header>
      <main>
        <h1>Spoiler</h1>
        <Spoiler header={<h2>Заголовок</h2>} open>
          Контент 1
          <p>
            лорем іпсум тралівалі і тп.
          </p>
        </Spoiler>

        <Spoiler>
          <h2>Контент 2</h2>
          <p>
            лорем іпсум тралівалі і тп.
          </p>
        </Spoiler>
        <h1>Range Input</h1>
        <RangeInput className="inpt" min={2} max={10} placeholder="2-10" type="text" />
        <h1>Login Form</h1>
        {/* <LoginForm className="loginForm" min={4} max={14} onLogin={obj => console.log(obj)}/> */}
        <LoginForm className="loginForm" min={4} max={14} onLogin={(val1, val2) => console.log(val1, val2)} />
        <h1>Password Confirm</h1>
        <PasswordConfirm className="passwordConfirm" min={3} onValue={value => console.log(value)} />
        <h1>Pagination</h1>
        <Pagination max={10} render={Content}/>
        <Pagination max={10} render={Color}/>
      </main>
    </div>
  );
}

export default App;
