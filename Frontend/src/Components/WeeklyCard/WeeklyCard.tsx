import "./Weekcard.css"
import Skeleton from '@mui/material/Skeleton';

interface WeeklyCardInfo{
    Day:string;
    Temperature:number;
    WeatherType:string;
    imageUrl:string;
}
const WeeklyCard = ({Day,Temperature,WeatherType,imageUrl}:WeeklyCardInfo) => {
  return (
    <div>
        <div className="weather-card">
            <div className="weather-temp-flex">
                <div className="weather-img-bg">
                    <img src={imageUrl} alt="weather image" />
                </div>
                <h2>{Temperature}°</h2>
            </div>
            <div className="week-day-name">
                <p>{Day}</p>
                <p>{WeatherType}</p>
            </div>
        </div>
    </div>
  )
}
const WeeklyCardLoading=()=>{
    return(
        <div className="weather-card">
            <div className="weather-temp-flex">
                <div className="weather-img-bg">
                <Skeleton variant="rectangular" style={{width:"100%",height:"100%"}} />
                </div>
                <h2><Skeleton variant="rectangular" style={{width:"40px",height:"40px"}} /></h2>
            </div>
            <div className="week-day-name-loading">
                <p><Skeleton variant="rectangular" style={{width:"100%",height:"20px"}} /></p>
                <p><Skeleton variant="rectangular" style={{width:"100%",height:"20px"}} /></p>
            </div>
        </div>
    )
}
export {WeeklyCard,WeeklyCardLoading}
