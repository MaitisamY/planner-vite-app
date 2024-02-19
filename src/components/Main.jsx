/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Welcome from './Welcome'
import Footer from './Footer'
import Navbar from './Navbar'
import HomeContent from '../task/TaskContent'
import NoteContent from '../notes/NoteContent'
import TrashContent from '../trash/TrashContent'
import Popup from './Popup'
import Feature from './Feature'
import { useToDoFunctions } from '../handlers/useToDoFunctions'
import { BsPlusLg } from 'react-icons/bs'

export default function Main() {

    const [popup, setPopup] = useState(false);
    const [features, setFeatures] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleIsLogin = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    }

    const handleAccountDropdown = () => {
        setAccountDropdown(prevAccountDropdown => !prevAccountDropdown);
        console.log('Dropdown is ', !accountDropdown);
    }

    const handlePopup = () => {
        setPopup(prevPopup => !prevPopup);
        console.log('Popup is ', !popup);
    }

    const handleFeature = () => {
      setFeatures(prevFeatures => !prevFeatures);
      console.log('Feature is ', !features);
    }

    const handleOutsidePopupClick = (event) => {
        if (event.target.id === 'popup' && popup) {
          setPopup(false);
        }
    };

    const handleOutsideFeatureClick = (event) => {
      if (event.target.id === 'feature' && features) {
        setFeatures(false);
      }
    }

    const handleOutsideDropdownClick = (event) => {
        const accountDropdown = document.getElementById('account-dropdown');
        if (accountDropdown && !accountDropdown.contains(event.target)) {
            setAccountDropdown(false);
        }
    };

    return (
        <>
            
            {popup && (
                <Popup 
                    closer={handlePopup} 
                    close={handleOutsidePopupClick} 
                    closeDropdown={handleOutsideDropdownClick} 
                />
            )}
            {features && (
                <Feature 
                    closer={handleFeature} 
                    close={handleOutsideFeatureClick} 
                    closeDropdown={handleOutsideDropdownClick} 
                />
            )}
            <main>
                <div className="welcome-holder" onClick={handleOutsideDropdownClick}>
                    <div className="welcome-holder-header">
                        <Header />
                    </div>
                    <div className="welcome-holder-content">
                        <Welcome opener={handlePopup} />
                    </div>
                </div>
                <div className="task-holder" onClick={handleOutsideDropdownClick}>
                    <Navbar 
                        handleFeature={handleFeature} 
                        handler={handleAccountDropdown} 
                        dropdownStatus={accountDropdown} 
                        close={handleOutsideDropdownClick}
                        isLogin={isLogin}
                        handleIsLogin={handleIsLogin}
                    />
                        <Routes>
                            <Route path="/" element={<HomeContent />} />
                            <Route path="/notes" element={<NoteContent />} />
                            <Route path="/trash" element={<TrashContent />} />
                        </Routes>
                </div>
            </main>
            <Footer />
            <a 
                title="Create Task"
                onClick={handlePopup}
                className="create-task-btn-mobile"
            >
                <BsPlusLg />
            </a>
        </>
    );

}