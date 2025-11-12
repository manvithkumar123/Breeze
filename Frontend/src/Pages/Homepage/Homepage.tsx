
import "./Homepage.css"
import { WeeklyCard,WeeklyCardLoading } from "../../Components/WeeklyCard/WeeklyCard"
import {HighlightCard,HighlightCardLoading} from "../../Components/HighlightsCard/HighlightCard"
import {NewsCard,NewsCardLoading} from "../../Components/NewsCard/NewsCard"
import MailComponent from "../../Components/MailComponent/MailComponent"
import { useLocationSelector } from "../../CustomHooks/useLocationSelector"
import {CityCard,CityCardLoading} from "../../Components/Citycontainer/CityContainer"
import { useGetNews } from "../../CustomHooks/useGetNews";
const Homepage = () => {
const { weeklydata, isWeeklyLoading, isWeeklyFetching } = useLocationSelector();
 const { NewsData, isLoading, isError } = useGetNews();
  return (
  <div className="homepage-weather">
    <div className="section-1-container">
    <div className="widget-highlights-container">
      <div className="weekly-weather-container">
        <div className="weather-img-text-container">
          <div className="weather-img-bg-homepage">
          <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1761615183/i-1_rr3abv.png" alt="" />
          </div>
          <div className="flex-container-row">
          <label >
          {isWeeklyLoading || isWeeklyFetching ? (<h4>Loading...</h4>) : weeklydata?.city ? (<h4>{weeklydata.city.name}</h4>) : (<h4>Select a city</h4>)}
          <h4 style={{width:"max-content"}}>Partly cloud</h4>
          </label>
          <label id="weather-temp-info" >
            <h1>28°C</h1>
          </label>
          </div>
        </div>
        <div className="weekly-card-container">
          {isWeeklyLoading || isWeeklyFetching ?
          (<WeeklyCardLoading/>)
          :weeklydata?.list && weeklydata.list.length > 0 ? (
            weeklydata.list.map((item: any, index: number) => (
              <WeeklyCard
                key={index}
                Day={new Date(item.date).toLocaleDateString("en-US", { weekday: "long" })}
                Temperature={item.avgTemp}
                WeatherType={item.weather}
                imageUrl={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              />
            ))
          )
          :<WeeklyCard  Day="Select city" Temperature={0} WeatherType="To get data" imageUrl="null" />}
        </div>
      </div>
      <h2 id="Highlight-text">Today's Highlights</h2>
      <div className="homepage-highlights-container">
        {isWeeklyLoading || isWeeklyFetching ?
        <HighlightCardLoading/>
        :weeklydata?.list && weeklydata.list.length > 0 ? (
          weeklydata.list.map((item: any, index: number) => (
            <HighlightCard min_temp={item.temp_min} max_temp={item.temp_max} date={item.date} key={index}/>
          )))
        :<HighlightCard min_temp={0} max_temp={0} date={0}/>}
      </div>
    </div>
    <div className="other-cities-container">
    <div className="city-card-container">
    {weeklydata && weeklydata.list && weeklydata.list.length > 0 ? (
       <CityCard
         CityName={weeklydata.city?.name}
         Population={weeklydata.city?.population}
         Sunrise={weeklydata.city?.sunrise}
         Sunset={weeklydata.city?.sunset}
         Feelslike={weeklydata.list[0].feels_like}
         Groundlevel={weeklydata.list[0].grnd_level}
         Pressure={weeklydata.list[0].pressure}
         Sealevel={weeklydata.list[0].sea_level}
        />
      ):isWeeklyLoading? <CityCardLoading/> :<CityCard/> }
    </div>
    </div>
    </div>
    <div className="latest-news-section">
      <h2>Latest Weather Forecast News</h2>
      <div className="news-section-container">
      {isLoading ? (
                <h1 style={{ textAlign: "center" }}>
                  <NewsCardLoading/>
                </h1>
          ) : isError ? (
                <h1 style={{ textAlign: "center" }}>Failed to load news.</h1>
          ) : NewsData && NewsData.length > 0 ? (
                NewsData.slice(0,3).map((item: any, index: number) => (
                  <NewsCard key={item.id || index} title={item.title} imgUrl={item.imgUrl} uploadDate={new Date(item.date).toLocaleDateString()} newsUrl={item.newsUrl}/>
            ))
          ) : (
                <h1 style={{ textAlign: "center" }}>No News available</h1>
          )}
      </div>
    </div>
    <div className="getupdates-email">
      <div className="email-component-container">
      <MailComponent/>
      </div>
    </div>
  </div>
  )
}

export default Homepage
