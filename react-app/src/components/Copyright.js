import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import github from './about-us-feed/github.png'
import '../index.css'

function Copyright() {
    return (
      <>
      <Typography variant="body2" color="black" align="center">
        {'Copyright © '}
        <Link color="black" href="https://github.com/ethanswe/straba">
        App Academy Group Project - August Cohort 2020
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        
      </Typography>
      <div className='links'>
      <div>
      <a href="https://github.com/ethanswe/straba" target="_blank" rel="noreferrer"> 
        
          <img className='icons' height='25px' width='25px' src={github} alt='github' />
          </a>
      </div>
      
      </div>
      </>
    );
  }


  export default Copyright