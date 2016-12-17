import React, { Component } from 'react'
import { Link } from 'react-router'
import NavLink from '../components/NavLink'

import './styles.scss'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <ul className='nav nav-pills'>
                    <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                    <li><Link to='/admin'>Админка</Link></li>
                    <li><NavLink to='/list'>Список жанров</NavLink></li>
                    <li><Link to='/list' activeClassName='active'>Список жанров</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}