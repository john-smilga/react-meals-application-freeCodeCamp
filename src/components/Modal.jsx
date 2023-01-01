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