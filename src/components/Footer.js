import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Footer()
{
  return (
      <footer>
          <div className="footer-links">
            <NavLink to="/">Who we are?</NavLink>
            <NavLink to="/sudoku">Sudoku solver</NavLink>
            <NavLink to="/subscribe">Weekly Sudoku</NavLink>
          </div>
          <div className="footer-copyright">Sudoku © Copyright 2022</div>
      </footer>
  );
}
