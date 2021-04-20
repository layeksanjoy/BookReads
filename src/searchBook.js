import React from 'react'
import * as BooksAPI from './BooksAPI'
import ShowBooks from './Book'
import { Link } from 'react-router-dom'

class searchBooks extends React.Component{
    state = {
        query:'',
        searchBooks:[]
    }
    
    handleChange = (event,book,index) => {
        event.preventDefault()
        const shelf = event.target.value
        console.log(event,book,index,shelf)

        this.setState((prevState)=>{
          prevState.searchBooks[index].shelf = shelf
          return prevState
        })
        BooksAPI.update(book,shelf)
      }
    
  updateBook(){
    if(this.state.query !== ""){
      BooksAPI.search(this.state.query).then((books) => {
        this.setState(() => ({searchBooks:books}))
      })
    }else{
      this.setState(() => ({currentState:"all"}))
      this.setState(()=>({searchBooks:[]}))

    }
  }

    updateQuery = (e) => {
        this.setState({query:e.target.value})
        this.updateBook();
    }
    render(){
        return(
            <div>
               
                <input className="search-book" type='text' placeholder="Search Book" value={this.state.query} onChange={(e) => this.updateQuery(e)}></input>
                <Link to="/">Back</Link>
                {(this.state.query !== '') &&
                <ShowBooks books={this.state.searchBooks}  currentState={"all"} handleChange={this.handleChange} />
            }
            </div>
        )
    }
}

export default searchBooks