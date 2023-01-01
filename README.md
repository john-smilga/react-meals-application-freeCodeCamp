# Meals Application

#### Create A New Project in REPLIT

- login/register
- in the dashboard click "create"
- find react template
- click run
- change title in index.html


#### Get Assets 

- copy styles from /src/App.css
- copy README.md

#### Global Styles Info

#### Setup Structure

- create /src/components
- Favorites.jsx, Meals.jsx, Modal.jsx, Search.jsx
- create component (arrow function)
- setup basic return (component name)
- or my personal favorite "shake and bake"
- export default


```js
const Search = () => {
  return <h1>Dude, where is my car<h1>
}
export default Search
```

- import all of them in App.js
- setup following structure

```js

import './App.css'



import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'

export default function App() {

  return (
    <main>
      <Search />
      <Favorites/>
      <Meals />
      <Modal />
    </main>
  )
}

```
- comment out Search, Favorites, Modal

```js
export default function App() {

  return (
    <main>
      {/* <Search /> */}  
      {/* <Favorites/>*/}  
      <Meals />
      {/*  <Modal /> */}  
    </main>
  )
}

```

#### App Level State

- in App.js
- Context API
- 3rd Party State Management Library
- Redux, Redux-Toolkit,.......


#### Context API

##### Provider

[Context API](https://www.freecodecamp.org/news/using-the-react-context-api-getting-started-2018/)

- create context.js in the root


context.jsx
```js

import React, {useContext} from 'react'

const AppContext = React.createContext()


const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider
      value="hello">
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
```
index.jsx
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context'
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <AppProvider>
		<App />
    </AppProvider>
	</React.StrictMode>
)
```

#### Consume Data


/components/Meals.jsx

```js
import {useContext} from 'react'
import {AppContext} from '../context'
const Meals = () => {
  const context = useContext(AppContext);
  console.log(context)
  return <h1>Meals Component</h1>
}

export default Meals

```

#### Custom Hook

context.jsx
```js
export const useGlobalContext = () => {
  return useContext(AppContext)
}
```


```js
import {useGlobalContext} from '../context'
const Meals = () => {
  const context = useGlobalContext()
  console.log(context)
  return <h1>Meals Component</h1>
}

export default Meals

```

#### Data Fetching

- where and how

context.jsx

```js
import React, { useContext,useEffect } from 'react'

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  
  useEffect(()=>{
    console.log('fetch data here')  
  },[])


  
  return <AppContext.Provider value={{name:'john', role:'student'}}>
    {children}
  </AppContext.Provider>
}
```

- fetch data (fetch api or axios), from any url in useEffect cb
- log result

#### Fetch API 

- [Fetch API](https://www.freecodecamp.org/news/how-to-make-api-calls-with-fetch/)
- [random user](https://randomuser.me/api/)

context.jsx
```jsx
const AppProvider = ({ children }) => {
  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json();
        console.log(data)
      } catch (error) {
                console.log(error)
      }
    }
    fetchData()
  },[])
```


#### Meals DB

- utilize search engine "meals db", follow the link
- [Meals DB](https://www.themealdb.com/api.php)
- get familiar with docs
- get two url's
  - Search meal by name
  - Lookup a single random meal
-  (hint the "https://" is missing)
-  setup two variables in context.jsx
-  (allMealsUrl, randomMealUrl) and assign the corresponding values

#### Get Meals By Name (with axios)

[Axios](https://www.freecodecamp.org/news/how-to-use-axios-with-react/)

- install axios
- import in context.jsx
- refactor fetchData
  - change name
  - switch to axios
  - add url parameter
  - switch to allMealsUrl
  - log response


context.jsx
```jsx
import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'




const AppProvider = ({ children }) => {
  
  const fetchMeals = async (url) => {
    
    try {
      const response = await axios(url)
     console.log(response)
   
    }
    catch (e) {
      console.log(e.response)
    }
    
  }


  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])


```

#### State Variable (meals) and render

- import useState hook
- setup state variable (meals)
- set it equal to the meals from api (setMeals)
- pass it down to entire app (value prop)
- destructure meals in the Meals component
- iterate over meals
  - log each meal 
  - render something (anything) on the screen



```jsx
import React, { useState, useContext, useEffect } from 'react'

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  
  const fetchMeals = async (url) => {
   
    try {
      const { data } = await axios.get(url)
      setMeals(data.meals)
    }
    catch (e) {

      console.log(e.response)
    }
    
  }


  useEffect(() => {
   
      fetchMeals(allMealsUrl)
    

  }, [])

  return (
    <AppContext.Provider
      value={{ meals }}
    >
      {children}
    </AppContext.Provider>
  )
}

```


/components/Meals.jsx
```js
import { useGlobalContext } from '../context'

const Meals = () => {
  const { meals } = useGlobalContext();

  

  
  return <section >
    {meals.map((singleMeal) => {
      console.log(singleMeal)
      return <h4>single meal</h4>
        
    })}
  </section>

}

export default Meals
```

#### Meals Component - Display Card

/components/Meals.jsx
```js
import { useGlobalContext } from '../context'

const Meals = () => {
  const { meals } = useGlobalContext();

  
  return <section className="section-center">
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      return <article key={idMeal} className="single-meal" >
        <img src={image} style={{width:'200px'}} className="img"} />
        <footer>
          <h5>{title}</h5>
          <button className='like-btn'>click me</button>
        </footer>
      </article>
    })}
  </section>

}

export default Meals
```

#### Meals CSS

#### React Icons

[React Icons](https://react-icons.github.io/react-icons/)
- install
- import
- set icon in like button

#### Infinite Loop

- Feel free to just watch
1. initial render (we invoke useEffect)
2. inside useEffect cb, we fetch data and change value for meals
3. it triggers re-render
4. we repeat steps 2 and 3



##### Loading

- setup state variable "loading", with default value false
- set loading to true as a first thing in fetchMeals
- set loading to false as a last thing in fetchMeals
- add loading to value prop (pass it down)
- in Meals.jsx set condition for loading
  - it needs to be before current return
  - return <h4>Loading...</h4> if loading is true

context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
        setMeals(data.meals)
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
  }
  return (
    <AppContext.Provider
      value={{ loading, meals }}
    >
      {children}
    </AppContext.Provider>
  )
}

```
/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
  const { loading, meals } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }
}
```

##### No items

- in fetchMeals check if data.meals is truthy
  - returns true
  - basically has some value
- only if data.meals has items set it as meals state value
- otherwise set meals variable as empty array
- in Meals.jsx check if meals length is less than 1
  - if that's the case return <h4>No items</h4>
  - place it between loading and current return (cards)
context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
  }
  return (
    <AppContext.Provider
      value={{ loading, meals }}
    >
      {children}
    </AppContext.Provider>
  )
}

```
/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
  const { loading, meals } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length < 1) {
    return <section className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </section>
  }
}
```

#### Search Component - Structure

- in Search.jsx
- import useState and useGlobalContext
- setup return 
  - header.search-container
    - form
      - input.form-input type="text"
      - button.btn type="submit" 
      - button.btn.btn-hipster type="button" 
 - in App.jsx display Search Component
 
/components/Search.jsx
```js

import { useState } from 'react'
import {useGlobalContext} from '../context' 



const Search = () => {

  return <header className='search-container'>
    <form>
      <input type='text' placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="button" className="btn btn-hipster">suprise me !</button>
    </form>
  </header>
}


export default Search
```

#### Search Component - CSS

#### HandleChange and Handle Submit
- create "text" state variable
- create two functions handleChange and handleSubmit
- in the handleChange, grab e.target.value and set as text value
- add onChange to input and set it equal to handleChange
- in the handleSubmit set e.preventDefault()
- add onSubmit to form element and set it equal to handleSubmit

Search.jsx
```js

import { useState } from 'react'
import {useGlobalContext} from '../context' 



const Search = () => {
  
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
   
  }

  return <header className='search-container'>
    <form onSubmit={handleSubmit} >
      <input type='text' onChange={handleChange} value={text} placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="btn" className="btn btn-hipster">suprise me !</button>
    </form>
  </header>
}


export default Search
```

#### Search Term

- in context.jsx create new state variable "searchTerm" with default value ''
- combine allMealsUrl with searchTerm and pass in the fetchMeals
- add searchTerm to useEffect's dependency array
- add setSearchTerm to value prop (pass it down)
- grab setSearchTerm in Search.jsx
- in the handleSubmit check setup a condition
  - if the "text" has a value set it equal to "searchTerm"

context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
  }


  useEffect(() => {
      fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

 
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}
```
/components/Search.jsx
```js
import { useState } from 'react'
import {useGlobalContext} from '../context' 



const Search = () => {
  const { setSearchTerm } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
    
    }
  }

  return <header className='search-container'>
    <form onSubmit={handleSubmit} >
      <input type='text' onChange={handleChange} value={text} placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="btn" className="btn btn-hipster" >suprise me !</button>
    </form>
  </header>
}


export default Search
```

#### Fetch Random Meal



context.jsx
```js
const AppProvider = ({ children }) => {
  

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal}}
    >
      {children}
    </AppContext.Provider>
  )
}
```

/components/Search.jsx

```js
import { useState } from 'react'
import {useGlobalContext} from '../context' 



const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
      
    }
  }

  return <header className='search-container'>
    <form onSubmit={handleSubmit} >
      <input type='text' onChange={handleChange} value={text} placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="btn" className="btn btn-hipster" onClick={fetchRandomMeal}>suprise me !</button>
    </form>
  </header>
}


export default Search
```


#### Fix Bugs
/components/Search.jsx
```js
import { useState } from 'react'
import { useGlobalContext } from '../context'



const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }

  return <header className='search-container'>
    <form onSubmit={handleSubmit} >
      <input type='text' onChange={handleChange} value={text} placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button type="btn" className="btn btn-hipster" onClick={handleRandomMeal}>suprise me !</button>
    </form>
  </header>
}


export default Search

```



context.jsx
```js
const AppProvider = ({ children }) => {
  


  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])


  
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal}}
    >
      {children}
    </AppContext.Provider>
  )
}
```

#### Modal - Setup

/components/Modal.jsx

```js
import { useGlobalContext } from '../context'

const Modal = () => {
  
  return <aside className='modal-overlay'>
    <div className='modal-container'>
      modal content here
    </div>
  </aside>
}

export default Modal

```

context.jsx


```js
const AppProvider = ({ children }) => {
 

  const [showModal, setShowModal] = useState(false)
 

  
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal }}
    >
      {children}
    </AppContext.Provider>
  )
}
```

App.jsx

```js
import { useGlobalContext } from './context'
import './App.css'



import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
export default function App() {
  const { showModal } = useGlobalContext()

  return (
    <main>

      <Search />
      {/*<Favorites/>*/}

      <Meals />
      {showModal && <Modal />}
    </main>
  )
}


```


#### Modal CSS - Setup

App.css
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: grid;
  place-items: center;
  transition: var(--transition);
 z-index:100;
}
.modal-container{
  width:80vw;
  max-width:800px;
  height:80vh;
  overflow:scroll;
  background:var(--white);
  border-radius:var(--borderRadius);
}
```

#### Display Meal in the Modal

context.jsx

```js
const AppProvider = ({ children }) => {
 
  const [selectedMeal, setSelectedMeal] = useState(null)

 
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    
      meal = meals.find((meal) => meal.idMeal === idMeal);
    
    setSelectedMeal(meal);
    setShowModal(true)
  }
  
  return (
   <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal }}
    >
      {children}
    </AppContext.Provider>
  )
}
```

/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
  const { loading, meals, selectMeal } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length < 1) {
    return <section className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </section>
  }

  return <section className="section-center">
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      return <article key={idMeal} className="single-meal" >
        <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
        <footer>
          <h5>{title}</h5>
          <button className='like-btn'><BsHandThumbsUp /></button>
        </footer>
      </article>
    })}
  </section>

}

export default Meals

```

#### Display Selcted Meal and Close Modal

context.jsx
```js
const AppProvider = ({ children }) => {
  
  const closeModal = () => {
    setShowModal(false)
  }
  
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal}}
    >
      {children}
    </AppContext.Provider>
  )
}
```

/components/Modal.jsx

```js
import { useGlobalContext } from '../context'

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext()

  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal
  return <aside className='modal-overlay'>
    <div className='modal-container'>
      <img src={image} className="img modal-img" />
      <div className='modal-content'>
        <h4>{title}</h4>
        <p>Cooking Instructions</p>
        <p> {text}</p>
        <a href={source} target="_blank">Original Source</a>
        <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
      </div>
    </div>
  </aside>
}

export default Modal

```

#### Modal CSS - Complete

App.css

```css
.modal-img{
 height:15rem;
  border-top-left-radius:var(--borderRadius);
  border-top-right-radius:var(--borderRadius);

}

.modal-content{
  padding:1rem 1.5rem;
}
.modal-content p{
  color:var(--grey-600);
}
.modal-content a{
  display:block;
  color:var(--primary-500);
  margin-bottom:1rem;
  text-decoration:underline;
  transition:var(--transition);
}
.modal-content a:hover{
  
  color:var(--black);
}
.close-btn{
  background:var(--red-dark);
  color:var(--white);
}

```

#### Favorites - Setup


context.jsx

```js
const AppProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState([]);

  
  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
  }
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  )
}
```

/components/Meals.jsx


```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
  const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length < 1) {
    return <section className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </section>
  }

  return <section className="section-center">
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      return <article key={idMeal} className="single-meal" >
        <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
        <footer>
          <h5>{title}</h5>
          <button className='like-btn' onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
        </footer>
      </article>
    })}
  </section>

}

export default Meals




```

#### Render Favorites

App.jsx


```js
import { useGlobalContext } from './context'
import './App.css'



import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
export default function App() {
  const { showModal, favorites } = useGlobalContext()

  return (
    <main>

      <Search />
      {favorites.length > 0 && <Favorites />}

      <Meals />
      {showModal && <Modal />}
    </main>
  )
}

```

/components/Favorites

```js
import { useGlobalContext } from '../context'


const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return <section className="favorites">
    <div className="favorites-content">
      <h5>Favorites</h5>
      <div className="favorites-container">
        {favorites.map((item) => {
          const { idMeal, strMealThumb: image } = item;

          return <div key={idMeal} className="favorite-item" >
            <img src={image} className="favorites-img img" />
            <button className='remove-btn' onClick={() => removeFromFavorites(idMeal)}>remove</button>
          </div>
        })}
      </div>
    </div>
  </section>
}


export default Favorites
```

##### Favorites CSS

App.css

```css
/* Favorites */

.favorites{
  background:var(--black);
  color:var(--white);
  padding:1rem 0;
}

.favorites-content{
  width: var(--view-width);
  max-width: var(--max-width);
  margin:0 auto;
}
.favorites-container{
  display:flex;
  gap:0.5rem;
  flex-wrap:wrap;
}
.favorite-item{
  text-align:center;
}
.favorites-img{
  width:60px;
  border-radius:50%;
  border:5px solid var(--white);
  cursor:pointer;
}
.remove-btn{
  margin-top:0.25rem;
  background:transparent;
  color:var(--white);
  border:transparent;
  cursor:pointer;
  transition:var(--transition);
  font-size:0.5rem;
}
.remove-btn:hover{
  color:var(--red-dark);
}
```

#### SelectMeal Refactor

context.jsx

```js
const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true)
  }
```

/components/Favorites.jsx

```js
import { useGlobalContext } from '../context'


const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return <section className="favorites">
    <div className="favorites-content">
      <h5>Favorites</h5>
      <div className="favorites-container">
        {favorites.map((item) => {
          const { idMeal, strMealThumb: image } = item;

          return <div key={idMeal} className="favorite-item" >
            <img src={image} className="favorites-img img" onClick={() => selectMeal(idMeal, true)} />
            <button className='remove-btn' onClick={() => removeFromFavorites(idMeal)}>remove</button>
          </div>
        })}
      </div>
    </div>
  </section>
}


export default Favorites
```

#### Add Favorites to Local Storage

contex.jsx

```js
const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  
  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  )
}
```

