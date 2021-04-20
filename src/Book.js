// import { bool } from 'prop-types';
import React from 'react'
//import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
// import * as BooksAPI from './BooksAPI'

class ShowBooks extends React.Component{
    // static PropTypes = {
    //     books:PropTypes.array.isRequired,
    //     currentState:PropTypes.string.isRequired
    // }

    render(){
        const {books,currentState} = this.props;
        return(
            <div>
                {(books.length > 0) && 
                <ol className='books-list'>
                    {books.map((book,index) => {
                        if((currentState === "all" || currentState === book.shelf) && book.authors) {
                            return(
                            <li key={Math.random()}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: book.imageLinks ?`url(${book.imageLinks.smallThumbnail})` : 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
                                <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf} onChange={(e) => this.props.handleChange(e,book,index)}>
                                        {/* <option  value="move" disabled>Move to...</option> */}
                                        <option  value="currentlyReading">Currently Reading</option>
                                        <option  value="wantToRead">Want to Read</option>
                                        <option  value="read">Read</option>
                                        <option  value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors[0]}</div> 
                                
                            </div>
                            </li>)
                        }
                        return ""
                    })}
                </ol>
                }   
            </div>
        )
    }
}

export default ShowBooks