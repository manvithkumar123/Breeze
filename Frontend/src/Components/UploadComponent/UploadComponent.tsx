
import type React from "react";
import { useUploadNews } from "../../CustomHooks/useUploadNews";

const UploadComponent = ({ setPopup }: { setPopup: (value: boolean) => void }) => {
  const {isPending,UploadNews,setImageUrl,
    setNewsTitle,setNewsUrl,imageUrl,newsTitle,newsUrl}=useUploadNews();

  const handleUploadNews=async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
      await UploadNews();
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="Login-page" onSubmit={handleUploadNews}>
    <form className="form">
    <div className="cancel-svg" style={{marginLeft:"auto"}} onClick={() => setPopup(false)}>
      <i className="fa-solid fa-xmark"></i>
    </div>
      <p className="form-title">Upload News</p>
      <div className="input-container">
        <input placeholder="Enter Title" type="text" value={newsTitle} onChange={(e)=>setNewsTitle(e.target.value)}/>
      </div>
      
      <div className="input-container">
        <input placeholder=" Enter Cover Url" type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
      </div>

      <div className="input-container">
        <input placeholder="Enter News Url" type="text" value={newsUrl} onChange={(e)=>setNewsUrl(e.target.value)}  />
      </div>
      {isPending ?
          <button className="submit-disabled" type="submit" disabled >
          Uploading
          </button>
          :<button className="submit" type="submit">
           Upload Now
          </button>
      }
    </form>
    </div>
  );
};

export default UploadComponent;