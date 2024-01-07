import './App.css';

let Inneritem = ({ title, src, alt, update }) => {
    return (
        <div className="childele">
            <div className='innerbox'>
                <img src={src} alt={alt} />
                <div className="text">
                    <h2>{title}</h2>
                    <p>{update}</p>
                </div>
            </div>
        </div>
    )
}


export default Inneritem;
