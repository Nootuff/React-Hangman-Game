import React, { Component } from "react";
import { randomWord } from "../assets/words";
import AlphaButtons from "./AlphaButtons";
import "../styles/Hangman.css";
import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0, //Number of wrong guesses, increases by 1 with each wrong guess. 
      guessed: new Set(), //A Set is a collection of unique values. Each value can only occur once in a Set. A Set can hold any values of any data type. new Set()	Creates a new Set.
      answer: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("") //Turns the word stored in answer state into an array of its letters. 
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")); //Uses map to create a new array, if the user has guessed the correct letter? Add that letter to the array, if not, add the "_" character. At the start this array is just a bunch of _s 
    
  }



  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value; //This finds the letter on the button by looking at the value.
    this.setState(st => ({ //st is state?
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1), //If the answer includes the letter value of the button you clicked on, add 0 to the nWrong state. Ternary operator.
    }));

  }

  /** generateButtons: return array of letter buttons to render, creates all the buttons*/
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <AlphaButtons //For each loop of the map render 1 AlphaButtons component & pass in the props 
      key={Math.random()} //This isn't a prop, react just needs an id
        ltr={ltr} //ltr is the current letter fron the string above you are on.
        function={this.handleGuess} //Pass in the function so it can be used in the button's onclick.
        disabler = {this.state.guessed.has(ltr)} //Button will be disabled if the guessed Set in state includes the current letter map has reached, if the letter is in there, it counts as true & true disables the button. The value, true or false, is passed as a prop.
      />
    ));
  }

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  buttonCheck(){
    let buttonsThere;
    if (this.state.nWrong >= this.props.maxWrong) {
      buttonsThere = <p>"You lose! The answer was: <b>{this.state.answer}</b>"</p>
    } else {
      console.log(this.state.answer)
      console.log(this.guessedWord().join(""))
      if(this.guessedWord().join("") === this.state.answer){ 
        buttonsThere = <p>Congratulations! You Win!</p>
      }
      else{
      buttonsThere = <div className='Hangman-letter-btns '> {this.generateButtons()} </div> /*The buttons, generated by the function up above.*/
      }
    }
    return buttonsThere;
  }

  /** render: render game */
  render() {
   
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img alt={this.state.nWrong + " wrong guesses"} src={this.props.images[this.state.nWrong]} /> {/*nWrong is the number of wrong guesses. As it increases, a new image corresponding to that number is rendered. nWrong acts as the index number.*/}
        <p className='Hangman-word Hangman-wrong'>Wrong guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p> {/*This element contains the array created by guessedWord() up above*/}
        {this.buttonCheck()}
        <br />
        <button onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Hangman;