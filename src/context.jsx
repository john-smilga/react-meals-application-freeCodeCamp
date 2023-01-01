import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


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
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

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
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])


  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

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

  const closeModal = () => {
    setShowModal(false)
  }
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
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }