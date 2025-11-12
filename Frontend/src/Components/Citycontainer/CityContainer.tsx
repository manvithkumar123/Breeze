import "./CityContainer.css"
import Skeleton from '@mui/material/Skeleton';
interface CityCardObj{
    CityName?:string;
    Population?:number | null;
    Sunrise?:number;
    Sunset?:number | string;
    Feelslike?:number;
    Groundlevel?:number;
    Pressure?:number;
    Sealevel?:number;
}
const CityCard = ({CityName,Population,Sunrise,Sunset,Feelslike,Groundlevel,Pressure,Sealevel,}: CityCardObj) => {
  const data = {CityName,Population,Sunrise,Sunset,Feelslike,Groundlevel,Pressure,Sealevel,};

  const formatValue = (key: string, value: any) => {
    if (value == null) return "Select city";
    switch (key) {
      case "Feelslike":
        return `${value}°C`;
      case "Groundlevel":
      case "Pressure":
      case "Sealevel":
        return `${value} hPa`;
      case "Sunrise":
      case "Sunset":
        return new Date(Number(value) * 1000).toLocaleTimeString();
      default:
        return value;
    }
  };

  return (
    <>
      {Object.entries(data).map(([key, value], index) => (
        <div className="city-card" key={index}>
          <h4>{key}</h4>
          <p>{formatValue(key, value)}</p>
        </div>
      ))}
      </>
  );
}
const CityCardLoading=()=>{
    const loadingKeys = ["CityName", "Population", "Sunrise", "Sunset", "Feelslike", "Groundlevel", "Pressure", "Sealevel"];
    return (
    <>
    {loadingKeys.map((item,index)=>(
        <div className="city-card" key={index} id={item}>
            <Skeleton variant="rectangular" style={{width:"100%",height:"100%"}} />
        </div>
    ))}
    </>
)
}
export {CityCard,CityCardLoading}
