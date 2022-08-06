import '../styles/footer.css';
import {Box} from "@mui/material";


export default function Iframes(props){

    const {
        iframeSource = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.7281021762237!2d-58.57468088469266!3d-34.433660980503895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32fbf2620b449%3A0xbbff8e3bb7acf2b0!2sN%C3%A1utica%20San%20Fernando!5e0!3m2!1ses!2ses!4v1659797372394!5m2!1ses!2ses" width="300px" height="150px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
      } = props

    return(
        <>
        <div className="iframe" dangerouslySetInnerHTML={{__html: iframeSource}}></div>
        
        <h5 className="iframeAdress">URUGUAY 473, TIGRE - BUENOS AIRES - ARGENTINA</h5>
        
        </>
    )


}
 
