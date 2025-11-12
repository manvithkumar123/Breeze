import "./NewsCard.css"
import Skeleton from '@mui/material/Skeleton';

interface NewsCard{
    imgUrl:string;
    title:string;
    uploadDate:string;
    newsUrl:string;
}
const NewsCard = ({imgUrl,title,uploadDate,newsUrl}:NewsCard) => {
  return (
        <div className="news-card">
            <div className="news-card-img">
                <img src={imgUrl} alt="" />
            </div>
            <div className="news-tittle-text">
            <h3>{title}</h3>
            </div>
            <div className="date-news-container">
             <label id="date-calender">
             <i className="fa-solid fa-calendar-days"></i>
             <p>{uploadDate}</p>
             </label>
             <button onClick={() => window.location.href = newsUrl}>Read More <i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
  )
}
const NewsCardLoading =()=> {
  return (
        <div className="news-card">
            <div className="news-card-img">
            <Skeleton variant="rectangular" style={{height:"100%",width:"100%"}}/>
            </div>
            <div className="news-tittle-text">
            <Skeleton variant="rectangular" style={{height:"30px",width:"50%"}}/>
            </div>
            <div className="date-news-container">
             <label id="date-calender">
             <Skeleton variant="rectangular" style={{height:"30px",width:"120px"}}/>
             </label>
             <button style={{backgroundColor:"transparent"}}> <Skeleton variant="rectangular" style={{height:"100%",width:"100%"}}/></button>
            </div>
        </div>
  )
}

export {NewsCard,NewsCardLoading}
