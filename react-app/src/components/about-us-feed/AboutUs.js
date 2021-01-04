import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './AboutUs.css'
import logo from './strabalogo.png';
import google from "./google.png";
import github from "./github.png";



const AboutUs = () => {


    return (
    
            <div className='miniProfile1'>
            
                <img className='logo'src={logo} alt='logo' />
          
            
            <div className='miniInfo1'>
                <div>
                <a href="https://github.com/ethanswe/straba" target="_blank"> 
                    <h6>GitHub</h6>
                    <img className='icons' height='50px' width='50px' src={github} alt='github' />
                    </a>
                </div>
                <div>
                <a href="https://drive.google.com/drive/my-drive" target="_blank"> 
                    <h6>Google</h6>
                    <img className='icons' height='50px' width='50px' src={google} alt='google' />
                    </a>
                </div>
            </div>
            <div className='about-us-text'>
            <h2>About STRABA</h2>
            <p>
            Straba is a web application that allows users to upload their GPX activity data and share their exercises with other users on the site.  Users can follow, comment, and give kudos to other users.  They can upload their unique avatars as well.
            </p>
            <p>
            Straba features an activity feed, activity detail page, as well as a dynamic user profile page with stats, user activity history, and followers.
            </p>
            
            <div>
            <h2>How to use STRABA</h2>
            <ol >
	            <li>Upload your GPX file  from your GPS device to your computer.</li>
	            <li>Make a new map in your Google Drive.</li>
                <li>Upload your GPX file as a new layer in the map.</li>
	            <li>Copy the src url from the embed code into the STRABA New Activity Form with your running data.</li>
                </ol>
            </div>
            </div>
        </div>
    
    )




}

export default AboutUs;