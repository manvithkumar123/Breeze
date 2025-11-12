import { useState } from "react"
import {NewsCard,NewsCardLoading} from "../../Components/NewsCard/NewsCard"
import "./NewsPage.css"
import UploadComponent from "../../Components/UploadComponent/UploadComponent";
import { useGetNews } from "../../CustomHooks/useGetNews";

const NewsPage = () => {
    const [uploadpage,setuploadpage]=useState(false);
    const { NewsData, isLoading, isError } = useGetNews();
  return (
    <div className="News-page-upload">
    {uploadpage && (
      <div className="upload-page-news">
        <UploadComponent setPopup={setuploadpage} />
      </div>
    )}
    <div className="news-page">
        <div className="news-page-nav">
            <button id="upload-news" onClick={() => setuploadpage(true)}>Upload</button>
        </div>
        <div className="news-container-section">
          <div className="grid-news-container">
          {isLoading ? (
                <h1 style={{ textAlign: "center" }}>
                  <NewsCardLoading/>
                </h1>
          ) : isError ? (
                <h1 style={{ textAlign: "center" }}>Failed to load news.</h1>
          ) : NewsData && NewsData.length > 0 ? (
                NewsData.map((item: any, index: number) => (
                  <NewsCard key={item.id || index} title={item.title} imgUrl={item.imgUrl} uploadDate={new Date(item.date).toLocaleDateString()} newsUrl={item.newsUrl}/>
            ))
          ) : (
                <h1 style={{ textAlign: "center" }}>No News available</h1>
          )}
          </div>
          </div>
    </div>
    </div>
  )
}

export default NewsPage
