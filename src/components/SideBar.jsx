import { Link } from 'react-router-dom';
import Logo from '../static/DFKI.png';
import '../App.css';

import { MdSpaceDashboard } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function SideBar() {
    return (
        <div className='sidebar-container'>
            <div className='sidebar-top'>
                <div className="sidebar-logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="sidebar-content">
                <ul>
                    <li>
                        <Link to='/' >
                            <MdSpaceDashboard />
                            <span>Center</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/power'>
                            <GiElectric />
                            <span>Power</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/device'>
                            <FaGasPump />
                            <span>Device</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <MdWaterDrop />
                            <span>Water</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <FaMoneyCheckAlt />
                            <span>Money</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="sidebar-footer">
                <ul>
                    <li>
                        <Link to='/'>
                            <IoSettings />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}