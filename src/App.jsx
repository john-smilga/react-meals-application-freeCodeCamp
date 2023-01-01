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
