import React, {useState} from 'react'
import '../../styles/PuntuacionEstrella.css'
const PuntuacionEstrella = () => {
  const [estrellas, setEstrellas] = useState({
    estrellas:0
  })
console.log(estrellas)
const handleChange=(e)=>{
  setEstrellas({
    [e.target.name]:e.target.value,
  })
}


  return (
    <div>
      <form className='form'>
  <p class="clasificacion">
    <input id="radio1" type="radio" name="estrellas" onChange={handleChange} className='input' value="5"/>
    <label className='label' for="radio1">★</label>
    <input id="radio2" type="radio" name="estrellas" onChange={handleChange} className='input' value="4"/>
    <label className='label' for="radio2">★</label>
    <input id="radio3" type="radio" name="estrellas"  onChange={handleChange} className='input'value="3"/>
    <label className='label' for="radio3">★</label>
    <input id="radio4" type="radio" name="estrellas" onChange={handleChange} className='input' value="2"/>
    <label className='label' for="radio4">★</label>
    <input id="radio5" type="radio" name="estrellas" onChange={handleChange} className='input' value="1"/>
    <label className='label' for="radio5">★</label>
  </p>
</form>
    </div>
  )
}

export default PuntuacionEstrella
