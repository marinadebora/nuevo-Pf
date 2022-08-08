import React, {useState,useEffect} from 'react'
import '../../styles/PuntuacionEstrella.css'
import { useSelector, useDispatch ,} from 'react-redux'
export default function PuntuacionEstrella (){

  const dispatch = useDispatch()
  const StarFromLocalStorage = JSON.parse(localStorage.getItem("Stars") || "[]");
  const [star /* setCart */] = useState(StarFromLocalStorage);
  const current_starts =StarFromLocalStorage;



 
console.log(current_starts)
/*const handleChange=(e)=>{
  setEstrellas({
    [e.target.name]*/
    const addStars = (valor) =>{
    
      const cart_add = valor
      const actual_card = localStorage.getItem("Stars") 
       //JSON.stringify([...cartFromLocalStorage, cart_add._id, cart_add.producto])
      
      if(StarFromLocalStorage.length) {
       localStorage.setItem(
         "Stars",
         JSON.stringify([...StarFromLocalStorage, cart_add])
       );
     } else {
       localStorage.setItem(
         "Stars",
         JSON.stringify([cart_add])
       )
     }
    }
  
const promedio = StarFromLocalStorage.reduce((a, b) => a + b, 0) / StarFromLocalStorage.length
console.log(promedio)

  useEffect(() => {
    
    localStorage.getItem("Stars")
    localStorage.setItem("Stars", JSON.stringify(current_starts));
    
  }, [dispatch, current_starts]);
   

  return (
    <div>

      <form className='form'>
  <p class="clasificacion">
  <button  onClick={() => addStars(5)} class="pagination-button a">★</button>
  <button  onClick={() => addStars(4)} class="pagination-button a">★</button>
  <button  onClick={() => addStars(3)} class="pagination-button a">★</button>
  <button  onClick={() => addStars(2)} class="pagination-button a">★</button>
  <button  onClick={() => addStars(1)} class="pagination-button a">★</button>
    

  </p>
</form>

    </div>
  )
}


