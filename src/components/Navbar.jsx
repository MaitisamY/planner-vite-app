import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdGridView, MdFormatListBulleted, MdEditNote, MdSupervisedUserCircle, MdNewReleases } from 'react-icons/md'
import { BsFillHouseDoorFill, BsBookmarkX } from 'react-icons/bs'
import { useToDoFunctions } from '../handlers/useToDoFunctions'
import Login from './Login'
import Signup from './Signup'
import axios from 'axios'

export default function Navbar({ 
    handleFeature, 
    dropdownStatus, 
    close, 
    handler, 
    isLogin, 
    handleIsLogin 
}) {

    const { pathname } = useLocation();

    const {
        views,
        handleViews,
    } = useToDoFunctions();

    const [user, setUser] = useState(null);
    
    axios.get('http://localhost:3000/api/session')
    .then(response => {
        const data = response.data;
        if (data.loggedIn) {
            // User is logged in, update UI accordingly
            const user = data.user;
            setUser(user);
        } else {
            setUser(null);
        }
    })
    .catch(error => {
        console.error('Error fetching session data:', error);
    });

    return (
        <>
            <div className="task-holder-header" onClick={close}>
                <div className="task-holder-header-nav">
                    <Link 
                        title="Home"
                        to={pathname === '/' ? '#' : "/"} 
                        className={ `link ${ pathname === '/' ? 'active' : '' }` }
                    >
                        <BsFillHouseDoorFill /> &nbsp; <i>Home</i>
                    </Link>
                    <Link 
                        title="Trash"
                        className={ `link ${ pathname === '/notes' ? 'active' : '' }` }
                        to="/notes"
                    >
                        <MdEditNote /> &nbsp; <i>Notes</i>
                    </Link>
                    <Link 
                        title="Trash"
                        className={ `link ${ pathname === '/trash' ? 'active' : '' }` }
                        to="/trash"
                    >
                        <BsBookmarkX /> &nbsp; <i>Expired</i>
                    </Link>
                    <Link 
                        title="Features"
                        href="#"
                        onClick={handleFeature} 
                        className="link"
                    >
                        <MdNewReleases /> &nbsp; <i>Features</i>
                    </Link>
                </div>
                <div className="task-holder-header-account">
                    <button 
                        title="Account"
                        onClick={handler}
                    >
                        <MdSupervisedUserCircle /> &nbsp; 
                        {
                            user ? <i>{user.username}</i> : <i>Account</i>
                        }
                    </button>
                    {
                        dropdownStatus &&
                        <div id="account-dropdown" className="account-dropdown">
                            {
                                user && <button onClick={handleAccountDropdown}>Logout</button>
                            }
                            <div className="selection">
                                <button
                                    className={`selector ${isLogin ? 'active' : ''}`}
                                    onClick={handleIsLogin}
                                >
                                    Login
                                </button>
                                <button
                                    className={`selector ${!isLogin ? 'active' : ''}`}
                                    onClick={handleIsLogin}
                                >
                                    Sign Up
                                </button>
                            </div>
                            { isLogin ? <Login /> : <Signup /> }
                        </div>
                    }
                </div>
            </div>
            <div className="task-holder-view-switchers">
                <button 
                    className={views === 0 ? "active" : ""}
                    title="Grid"
                    onClick={() => handleViews(0)}
                >
                    <MdGridView />
                </button>
                <button 
                    className={views === 1 ? "active" : ""}
                    title="List"
                    onClick={() => handleViews(1)}
                >
                    <MdFormatListBulleted />
                </button>
            </div>
        </>
    )
}