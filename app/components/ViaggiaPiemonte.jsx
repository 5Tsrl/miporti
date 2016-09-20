import React from 'react'
import { Link } from 'react-router'

export default () =>(

    <div className="widget_viaggia">
        <h2 className="title-2">Viaggia Piemonte</h2>
        <p>Tutti i treni circolanti nel territorio regionale</p>
        <Link to='/page/viaggiapiemonte'><span  className="img_viaggia" alt="biglietto bip" ></span></Link>
        <Link to='/page/viaggiapiemonte' className="btn_link">Maggiori informazioni</Link>
    </div>

)
