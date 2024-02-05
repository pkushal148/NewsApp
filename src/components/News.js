import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps={
      country:"in",
      pageSize:8,
      category:"general"
    }

    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }

    constructor(props)
    {
        super(props);
        console.log("helo from news");
        this.state={
            articles:[],
            loading: true,
            page:1,
            totalArticles:0
        }
        document.title=`${this.props.category}-NewsApp`;
    }

    async updateNews(page){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc1125cada5f4b198d5c4903ebcc2cd3&page=${page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        this.props.setProgress(30);
        let data=await fetch(url);
        let parsedData=await data.json();
        this.props.setProgress(70);
        this.setState({
          articles:parsedData.articles,
          totalArticles:parsedData.totalResults,
          loading:false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews(this.state.page);
    }

    handlePrev=async ()=>{
      this.setState({page:this.state.page-1});
      this.updateNews(this.state.page-1);
    }
   
    handleNext=async ()=>{
      this.setState({page:this.state.page+1});
      this.updateNews(this.state.page+1);
    }

    fetchMoreData = async() => {
        this.setState({
          page:this.state.page+1
        });
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc1125cada5f4b198d5c4903ebcc2cd3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
          articles:this.state.articles.concat(parsedData.articles),
          totalArticles:this.state.articles.length
        });

    };
    
    

  render() {
    return (
      <>
          <h2 className='text-center'>NewsAPP - {this.props.category[0].toUpperCase()+this.props.category.slice(1)} Headlines</h2>
          
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalArticles}
            loader={<Spinner/>}
          >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div> 
              })}
            </div>
          </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type='button' className='btn btn-primary' onClick={this.handlePrev}>Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/this.props.pageSize)} type='button' className='btn btn-primary' onClick={this.handleNext}>Next</button>
          </div> */}
        
      </>
    )
  }
}
