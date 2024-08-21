document.addEventListener("DOMContentLoaded", () => {
  const mazeContainer = document.getElementById('maze');
  const ball = document.getElementById('ball');
  let ballPosition = { x: 2.2, y: 2.1 };
  let canMove = true;  // 공이 움직일 수 있는지 여부를 결정하는 플래그
  const quizImages = {
      1: {image:'question1.jpg', answer: 'no'},
      2: {image: 'question2.jpg', answer: 'no'},
      3: {image: 'question3.jpg', answer: 'no'},
      4: {image: 'question4.jpg', answer: 'no'},
      5: {image: 'question5.jpg', answer: 'yes'},
      6: {image: 'question6.jpg', answer: 'no'},
      7: {image: 'question7.jpg', answer: 'yes'},
      8: {image: 'question8.jpg', answer: 'yes'},
      9: {image: 'question9.jpg', answer: 'no'},
      10: {image: 'question10.jpg', answer: 'yes'},
      11: {image: 'question11.jpg', answer: 'no'},
      12: {image: 'question12.jpg', answer: 'yes'},
      13: {image: 'question13.jpg', answer: 'no'},
      14: {image: 'question14.jpg', answer: 'yes'},
      15: {image: 'question15.jpg', answer: 'yes'},
      16: {image: 'question16.jpg', answer: 'yes'},
      17: {image: 'question17.jpg', answer: 'yes'},
      18: {image: 'question18.jpg', answer: 'no'},
      19: {image: 'question19.jpg', answer: 'no'},
      20: {image: 'question20.jpg', answer: 'no'},
      21: {image: 'question21.jpg', answer: 'yes'},
      22: {image: 'question22.jpg', answer: 'yes'},
      23: {image: 'question23.jpg', answer: 'yes'},
      24: {image: 'question24.jpg', answer: 'no'}
  };

  // 공을 초기 위치로 설정
  function setBallPosition(x, y) {
    ball.style.left = `${x * 8}px`;
    ball.style.top = `${y * 8}px`;
  }

  setBallPosition(ballPosition.x, ballPosition.y);

  // 키보드 이벤트로 공 움직이기
  document.addEventListener('keydown', (event) => {
    if (!canMove) return; // canMove가 false일 때 공을 움직이지 않음

    const key = event.key;
    let newX = ballPosition.x;
    let newY = ballPosition.y;

    if (key === 'ArrowUp' || key === 'w') {
      newY -= 1;
    } else if (key === 'ArrowDown' || key === 's') {
      newY += 1;
    } else if (key === 'ArrowLeft' || key === 'a') {
      newX -= 1;
    } else if (key === 'ArrowRight' || key === 'd') {
      newX += 1;
    }

    const nextCell = mazeArray[Math.floor(newY)][Math.floor(newX)];

    // 트랩에 도달했는지 확인
    if (typeof nextCell === 'object' && nextCell.hasOwnProperty('trap')) {
        canMove = false;  // 트랩에 도달하면 공의 이동을 막음
        showQuiz(nextCell.trap);
    }

    // 이동 가능한 경우에만 공을 새 위치로 이동시킵니다.
    if (typeof nextCell === 'number' && nextCell !== 1) {
        ballPosition.x = newX;
        ballPosition.y = newY;
        setBallPosition(newX, newY);
    } else if (typeof nextCell === 'object' && !nextCell.hasOwnProperty('wall')) {
        ballPosition.x = newX;
        ballPosition.y = newY;
        setBallPosition(newX, newY);
    }

    // 'bye' 셀에 도달했을 때 처리
    if (typeof nextCell === 'object' && nextCell.hasOwnProperty('bye')) {
        alert('축하합니다! 미로를 탈출했습니다!');
    }
  });

  // 퀴즈를 보여주는 함수
  function showQuiz(trapId) {
    const quizContainer = document.getElementById('quiz-container');
    const quizImage = document.getElementById('quiz-image');

    quizImage.src = quizImages[trapId].image;
    quizContainer.style.display = 'block';

    quizContainer.dataset.correctAnswer = quizImages[trapId].answer;
  }

  const initialPosition = { x: 2.2, y: 2.1 };  // 공의 초기 위치

  // 퀴즈 버튼 이벤트 핸들러
  document.getElementById('yes-button').addEventListener('click', () => {
    const quizContainer = document.getElementById('quiz-container');
    const correctAnswer = quizContainer.dataset.correctAnswer;

    if (correctAnswer === 'yes') {
        alert('정답입니다! 공이 시작지점으로 다시 되돌아 갑니다.');

        ballPosition.x = initialPosition.x;
        ballPosition.y = initialPosition.y;
        setBallPosition(ballPosition.x, ballPosition.y);

        // 다음 스테이지 로직 추가
        hideQuiz();
    } else {
        alert('틀렸습니다! 다시 시도하세요.');
    }
  });

  document.getElementById('no-button').addEventListener('click', () => {
    const quizContainer = document.getElementById('quiz-container');
    const correctAnswer = quizContainer.dataset.correctAnswer;

    if (correctAnswer === 'no') {
        alert('정답입니다! 공이 시작지점으로 다시 되돌아 갑니다.');

        ballPosition.x = initialPosition.x;
        ballPosition.y = initialPosition.y;
        setBallPosition(ballPosition.x, ballPosition.y);

        // 다음 스테이지 로직 추가
        hideQuiz();
    } else {
        alert('틀렸습니다! 다시 시도하세요.');
    }
  });

  // 퀴즈를 숨기는 함수
  function hideQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'none';
    canMove = true;  // 퀴즈가 끝나면 공의 이동을 다시 허용함
  }
});
