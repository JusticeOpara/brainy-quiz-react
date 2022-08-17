import React from "react"
import { useEffect, useState } from "react"




export default function Game() {
  const [score, setScore] = useState(0)
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    const fetchQuizData = () => {
      setIsLoading(true)
      fetch(`https://the-trivia-api.com/api/questions`)
        .then(res => res.json())
        .then(data => {
          console.log("App - useEffect -- data ->", data);

          handleAnswerShuffle(data);
          setIsLoading(false)
        })
        .catch(() => {
          setErrorMessage("Unable to fetch user list");
          setIsLoading(false);
        })
        // .finally {
        //   console.log("kjdk");
        // }

    };

    fetchQuizData();
    console.log("I FIRED ONCE");

  }, [])




  function handleAnswerShuffle(data) {
    let tempData = [...data];

    for (let index = 0; index < tempData.length; index++) {
      const correctAnswer = tempData[index].correctAnswer;
      const incorrectAnswers = [...tempData[index].incorrectAnswers];
      const allOptionAnswers = [...incorrectAnswers];
      allOptionAnswers.push(correctAnswer);

      const shuffledQuestionAnswers = allOptionAnswers.sort(() => (Math.random() > .5) ? 1 : -1);

      tempData[index].incorrectAnswers = shuffledQuestionAnswers;

    }

    setQuizData(tempData);
  }


  function handleShuffle(responsePayload, index) {
    const notRandomised = [];

    notRandomised.push(responsePayload[index].question)
    notRandomised.push(responsePayload[index].incorrectAnswers[0]);
    notRandomised.push(responsePayload[index].incorrectAnswers[1]);
    notRandomised.push(responsePayload[index].incorrectAnswers[2]);
    notRandomised.push(responsePayload[index].correctAnswer);

    const quesIndex = notRandomised.indexOf(question)
    if (quesIndex !== -1) notRandomised.splice(quesIndex, 1)

    for (let i = notRandomised.length - 1; i > 0; --i) {
      const shufflElement = Math.floor(Math.random() * (i + 1));
      [notRandomised[i], notRandomised[shufflElement], notRandomised[shufflElement],
      notRandomised[shufflElement], notRandomised[shufflElement]]
    }

    if (quesIndex !== -1) notRandomised.unshift(question)

    return notRandomised

  }
  const selectedChoiceOption = (userChoice, currentAnswer) => {

    if (userChoice === currentAnswer) {
      console.log(currentAnswer, "CURRENTANSWER")
    } else {
      console.log(userChoice, "CHOICExx")
    }
  };

  function handleClick() {

    const selectedChoice = event.target.innerHTML

    console.log(selectedChoice, "SelectedChoice")

    const correctAnswer = quiz.correctAnswer

    selectedChoiceOption(selectedChoice, correctAnswer)

    console.log(selectedChoice == correctAnswer, "SELECTED-CHOICE")

    // const styles =
    //   selectedChoice == correctAnswer ? 'correct-answer' : 'incorrect-answer';
    // console.log(classToApply, "CLASS TO APPLY")


  }


  return (
    <>
      {isLoading ? <p>Loading...</p> : <div className="container">

        <div className="flex-center ">
          <div className="progress-bar">
            <div className="question-hub">

              <p><span className="progressText"></span></p>
            </div>

            <div className="progress-score">
              <p className="score-prefix">score</p>
              <h2 className="score">
                {score}
              </h2>
            </div>

          </div>


          <div className="question-answer-section">

            <h1 className="question" >{quizData[currentQuestion].question}</h1> 

            <div className="options">

              <div className="option-container" >
                <p className="option-prefix">A</p>
                <p onClick={handleClick} className="option-text">{quizData[currentQuestion].incorrectAnswers[0]}</p>
              </div>

              <div className="option-container" >
                <p className="option-prefix">B</p>
                <p onClick={handleClick} className="option-text">{quizData[currentQuestion].incorrectAnswers[1]}</p>
              </div>

              <div className="option-container" >
                <p className="option-prefix">C</p>
                <p onClick={handleClick} className="option-text">{quizData[currentQuestion].incorrectAnswers[2]}</p>
              </div>

              <div className="option-container" >
                <p className="option-prefix">D</p>
                <p onClick={handleClick} className="option-text">{quizData[currentQuestion].incorrectAnswers[3]}</p>
              </div>

            </div>


          </div>


        </div>
      </div>}
    </>
    //  <div className="start-game">
    //          <h1 className="heading">welcome to brainy quiz app</h1>
    //          {/* {errorMessage && <div className="error">{errorMessage}</div>} */}
    //          <a className="btn" onClick={fetchQuitData} disable={isLoading}>PLAY</a>
    //      </div>

    //  {
    //    isLoading?(

    //   <div className="spinner-container">
    //       <div className="loading-spinner"></div>
    //  </div>


    //        ): (

  )
}


//    )
//  }

