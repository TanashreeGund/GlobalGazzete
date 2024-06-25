import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  // document.title = `${this.capitalizeFirstLetter(props.category)}-NationNews`;
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults)
    setloading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

  const handleNextClick = async () => {
    //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
    //     console.log("next");
    //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=807124407b4a44348d32b761ebdebaef&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //     this.setState({loading: true});
    //     let data=await fetch(url);
    //     let parsedData=await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //       page:this.state.page+1,
    //       articles:parsedData.articles,
    //       loading: false
    // })
    // }
    //consise the app
    setpage(page+1);
    updateNews();
  }

  const handlePrevClick = async () => {
    //   console.log("prev");
    //   let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=807124407b4a44348d32b761ebdebaef&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //   this.setState({loading: true})
    //   let data=await fetch(url);
    //   let parsedData=await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     loading: false
    // });
    
    setpage(page-1)
    updateNews();
  }


  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    setpage(page+1);
    settotalResults(parsedData.totalResults);
  };


  return (
    <>
      <h1 className="text-center" style={{ margin: '40px', paddingTop: '30px' }}>NationNews-Top {capitalizeFirstLetter(props.category)} Headline</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">

          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  descriptions={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: "general"

}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News
