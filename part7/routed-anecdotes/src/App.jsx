import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { useField } from './hooks'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom"



const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create_new' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  return (
    <div>
      <p>{anecdote.name}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
}
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdote/${anecdote.id}`} >{anecdote.name}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, and at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const name = props.name
  const author = props.author
  const info = props.info


  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = props.name.value;
    const newAuthor = props.author.value;
    const newInfo = props.info.value;

    props.addNew({
      name: newName,
      author: newAuthor,
      info: newInfo,
      votes: 0,
    });
    navigate('/')

    props.setNotification(`a new anecdote ${newName} created!`)
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
  }

  const handleReset = () => {
    props.name.onReset()
    props.author.onReset()
    props.info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input {...name} />
        </div>
        <div>
          author
          <input {...author}/>
        </div>
        <div>
          url for more info
          <input {...info}/>
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}



const App = () => {
  const name = useField('text')
  const author = useField('text')
  const info = useField('text')

  const [anecdotes, setAnecdotes] = useState([
    {
      name: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      name: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('') 



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <p>{notification}</p>} {/* Use a ternary conditional here */}
        <Routes>
          <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create_new" element={<CreateNew 
                                                addNew={addNew}
                                                setNotification={setNotification}
                                                name={name}
                                                author={author}
                                                info={info}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
