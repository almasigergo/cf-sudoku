import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Nav()
{
  return (
      <nav>
          <NavLink to="/">Who we are?</NavLink>
          <NavLink to="/sudoku">Sudoku solver</NavLink>
          <NavLink to="/subscribe">Weekly Sudoku</NavLink>
      </nav>
  );
}
