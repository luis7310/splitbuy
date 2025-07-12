import "../estilos/gastosItem.css"

export default function ItemGasto({titulo, descripcion, funClick}){

    return(
        <div id="container-item" onClick={funClick}>
            <h2>{titulo?titulo:"Gasto"}</h2>
            <p>{descripcion}</p>
        </div>
    )
}