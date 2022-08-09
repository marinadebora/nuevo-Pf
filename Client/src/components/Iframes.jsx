import '../styles/footer.css';
import {Box} from "@mui/material";


export default function Iframes(props){

    const {
        iframeSource = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13162.76238295769!2d-58.54271654378596!3d-34.4346135015353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcaf0259b5a0f7%3A0x666bb8012876d8b6!2sNautical!5e0!3m2!1ses!2sar!4v1660082283229!5m2!1ses!2sar" width="300px" height="150px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
      } = props

    return(/* width="300px" height="150px" */
        <>
        <div className="iframe" dangerouslySetInnerHTML={{__html: iframeSource}}></div>
        
        <h5 className="iframeAdress">URUGUAY 473, TIGRE - BUENOS AIRES - ARGENTINA</h5>
        
        </>
    )


}
 
