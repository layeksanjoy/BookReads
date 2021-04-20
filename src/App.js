import React from 'react'
import './App.css'
import ShowBooks from './Book'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import Search from './searchBook'
import{Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books :[],
    searchBooks:[],
    query:'',
    // "currentlyReading" , "wantToRead" , "read"
    currentState:"all",
    showSearchPage: false
  }

  handleChange = (event,book,index) => {
    event.preventDefault()
    const shelf = event.target.value
    this.setState((prevState)=>{
      prevState.books[index].shelf = shelf
      return prevState
    })
    BooksAPI.update(book,shelf)
  }


  handleClick = (event) => {
    event.preventDefault();
    event.persist();
    this.setState(() => ({
      currentState:event.target.value
    }))
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(()=>({books:books}))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div>
          <input type="button" value="currentlyReading" onClick={this.handleClick}></input>
          <input type="button" value="wantToRead" onClick={this.handleClick}></input>
          <input type="button" value="read" onClick={this.handleClick}></input>
          <input type="button" value="all" onClick={this.handleClick}></input>
          <Link to='/search'>Search Books</Link>

          <div>
            <ShowBooks books={this.state.books}  currentState={this.state.currentState} handleChange={this.handleChange}/>
          </div>
        </div>
        )}/>
        <Route exact path='/search' render={() => (
            <Search></Search>
        )}/>
      </div>
    )
  }
}

export default BooksApp