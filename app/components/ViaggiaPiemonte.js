import React from 'react'
import { Link } from 'react-router-dom'
import Train from '../images/train.svg'

const ViaggiaPiemonte = () => (<div className="widget_viaggia">
    <h2 className="title-2">Viaggia Piemonte</h2>
    <p>Tutti i treni circolanti nel territorio regionale</p>
    <Link to='/page/viaggiapiemonte'><Train className="imgTrain" /></Link>
    <Link to='/page/viaggiapiemonte' className="btn_link">Maggiori informazioni</Link>
</div>)
export default ViaggiaPiemonte
