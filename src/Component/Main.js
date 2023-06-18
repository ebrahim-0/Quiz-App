import { useEffect, useState } from "react";
import "./Main.css";

function Main() {
  const [start, setStart] = useState(0);
  const [activeQues, setActiveQues] = useState(1);
  const [ques, setQues] = useState([]);
  const [result, setResult] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const choices = ques.length > 0 ? ques[activeQues - 1].choices : null;
  const correctAnswer =
    ques.length > 0 ? ques[activeQues - 1].correctAnswer : null;

  const FetchData = () => {
    fetch("https://my-json-server.typicode.com/ebrahim-0/quiz/db")
      .then((res) => res.json())
      .then((data) => setQues(data.questions));
  };

  const handelActiveQues = () => {
    setActiveQues(activeQues + 1);
    setDisabled(false);
    document.querySelectorAll(".choice").forEach((ele) => {
      ele.classList.remove("selected-answer");
    });
  };

  const handleCorrectAnswer = (e) => {
    if (e.target.innerHTML === correctAnswer) {
      setResult(result + 5);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleSelectedAnswer = (e) => {
    document.querySelectorAll(".choice").forEach((ele) => {
      ele.classList.remove("selected-answer");
    });
    e.target.classList.add("selected-answer");
  };

  const hasAnswered = (e) => {
    setDisabled(true);
  };
  const handelFinishQuiz = () => {
    document.querySelector(".main").innerHTML = `

    <div style="padding: 20px ">
      <h3 style="text-align: center;font-size: 32px;">Result</h3>
      <p style="font-size: 23px">Total Questions: <span style="color: #800080;">${ques.length}</span></p>
      <p style="font-size: 23px">Total Score: <span style="color: #800080;">${result}</span></p>
      <p style="font-size: 23px">Correct Answer: <span style="color: #800080;">${correctAnswers}</span></p>
      <p style="font-size: 23px">Wrong Answer: <span style="color: #800080;">${wrongAnswers}</span></p>
    </div>
      `;
  };

  const startQuiz = () => {
    setStart(start + 1);
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="main">
      {start > 0 ? (
        <>
          <div>
            <span className="ques-num">{activeQues}</span>
            <span className="ques-nums">/ {ques.length}</span>
          </div>
          <div className="question">
            {ques.length > 0 ? (
              <h2 className="title">{ques[activeQues - 1].question}</h2>
            ) : (
              <h2>No Data</h2>
            )}
            {ques.length > 0 ? (
              choices.map((li, i) => {
                return (
                  <button
                    disabled={disabled}
                    key={i}
                    onClick={(e) => {
                      handleSelectedAnswer(e);
                      handleCorrectAnswer(e);
                      hasAnswered(e);
                    }}
                    className="choice"
                  >
                    {li}
                  </button>
                );
              })
            ) : (
              <h1>No Data22</h1>
            )}
          </div>

          {activeQues < ques.length ? (
            <button onClick={handelActiveQues} className="button">
              Next
            </button>
          ) : (
            <button onClick={handelFinishQuiz} className="button">
              Finish
            </button>
          )}
        </>
      ) : (
        <div className="start">
          <h3>JavaScrip Quiz</h3>
          <button className="button start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
