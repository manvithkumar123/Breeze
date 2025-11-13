import "./HighlightCard.css"
import Skeleton from '@mui/material/Skeleton';

interface HighlightCard{
    min_temp:number;
    max_temp:number;
    date:string | number;
}
const HighlightCard = ({min_temp,max_temp,date}:HighlightCard) => {
  return (
    <div className="highlight-card">
        <div className="highlight-card-text-container">
            <h5>Min Temp</h5>
            <p>{min_temp}</p>
        </div>
        <div className="highlight-card-text-container">
            <h5>Temp Min</h5>
            <p>{max_temp}</p>
        </div>
        <div className="highlight-card-text-container">
            <h5>Date</h5>
            <p style={{fontSize:"14px"}}>{date}</p>
        </div>
    </div>
  )
}
const HighlightCardLoading =()=>{
    return(
        <>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    <div className="highlight-card">
        <Skeleton variant="rectangular" style={{height:"70px",width:"100%"}}/>
    </div>
    </>
    )
}

export {HighlightCard,HighlightCardLoading}
