import React, { Component } from 'react'
import Search from './Search.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center mt-3'>
            <img src={Search} alt="loading"/>
      </div>
    )
  }
}
