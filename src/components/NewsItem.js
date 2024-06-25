import React from 'react'

const NewsItem =(props)=> {
    let { title, descriptions, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2024/02/sensex_nifty1-1-770x433.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{descriptions}...</p>
            <p className="card-text"><small className='text-muted'>By {!author ? "Unkown" : author} on {new Date(date).toGMTString()}</small></p>

            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
