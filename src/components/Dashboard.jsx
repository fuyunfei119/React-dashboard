import React from 'react';
import NavBar from './NavBar';
import MainBoard from './MainBoard';
import '../App.css';

export default function Dashboard() {
    return (
        <div className='dashboard-container'>
            <NavBar />
            <MainBoard />
        </div>
    )
}