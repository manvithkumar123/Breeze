import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./Navbar.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocationSelector } from '../../CustomHooks/useLocationSelector';

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
  const { states, cities, handleStateChange,handleCoordinates } = useLocationSelector();
  return (
    <nav>    
        <div className="icon-location-container">
        <LocationOnIcon />
        <h5>India</h5>
        </div>
        <div className='search-input-navbar'>
        <Autocomplete disablePortal options={states}  getOptionLabel={(option) => option.name} onChange={handleStateChange} className='search-input'  
        renderInput={(params) => <TextField {...params} label="Select State.." />}/>
        <Autocomplete disablePortal options={cities} getOptionLabel={(option) => option.name}   onChange={handleCoordinates} className='search-input'
        renderInput={(params) => <TextField {...params} label="Select City..." />}/>
        </div>
        <div className="weather-info-container">
        <i className="fa-solid fa-sun" style={{color: "#ff7b00"}}  id="weather-info-logo"></i>
        {/* <i className="fa-solid fa-temperature-low" style={{color:"#0e7acd"}} id="weather-info-logo"></i>
        <i className="fa-solid fa-moon" style={{color: "#6d6f74"}} id="weather-info-logo"></i> */}
        </div>
        <i className="fa-solid fa-bars" id='menu-bar-sd' onClick={() => setSidebarOpen(prev => !prev)}>
        </i>
    </nav>
  )
}

export default Navbar
