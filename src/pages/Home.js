//react
import React from 'react';
import {NavLink} from 'react-router-dom';

//styles
import '../assets/css/home.min.css';

export default function Home()
{

  let imgJpg = require('../assets/img/img-sudoku.jpg');
  let imgWebp = require('../assets/img/img-sudoku.webp');

  let iconEmail = require('../assets/img/icon/icon-email.svg').default;
  let iconCommunity = require('../assets/img/icon/icon-community.svg').default;
  let iconContest = require('../assets/img/icon/icon-contest.svg').default;

  return (
    <>
      <h1 className="page-title">Welcome to Sudoku site!</h1>
      <p className="page-subtitle">You can find all things related to Sudoku here!</p>
      <div className="home-grid">
        <picture>
          <source srcSet={imgWebp} />
          <img src={imgJpg} />
        </picture>
        <div className="grid-column text-container">
          <h3 className="h3">Are you stuck on your Sudoku?</h3>
          <p>
            Solve it with our newest <NavLink to="/sudoku">Sudoku Solver</NavLink>! Sudoku is a logic-based number placement puzzle where the aim is to fill a 9×9 grid with digits so that each column, row and 3×3 box contains all of the numbers from 1 to 9. Each puzzle can be solved a multitude of possible ways, so many that it may seem impossible to solve.
          </p>
          <h4 className="h4">Choose one of our plans for more perks</h4>
          <div className="service-container">
            <NavLink to="/subscribe">
              <img src={iconEmail} />
              <span>Sudoku in your inbox weekly</span>
            </NavLink>
            <NavLink to="/subscribe">
              <img src={iconCommunity} />
              <span>Be part of our Community</span>
            </NavLink>
            <NavLink to="/subscribe">
              <img src={iconContest} />
              <span>Join the Championship</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
