import { Comentarios } from './features/comments/Comment';
import './App.css';
import { React, useEffect } from "react";
import { GetComments } from './services/comments';


export const App = () => {
  return (
    <div className="App">
      <Comentarios />
    </div>
  );
}
