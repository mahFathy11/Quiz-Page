let cateogry = document.querySelector(".cateogry");
let quiz = document.querySelector(".quiz");
let catSpan = document.querySelector(".quiz .cat span");
let count = document.querySelector(".quiz .count span");
let container = document.querySelector(".container");
let circle = document.querySelector(".check .circle");
let submit = document.querySelector(".submit");
let time = document.querySelector(".check .time span");
let cor = document.querySelector(".result .true");
let wrong = document.querySelector(".result .false");
let minute = document.querySelector(".time .minute");
let second = document.querySelector(".time .second");

let desiredQuestions = 6;
let reqSeconds = 2;
let reqMinutes = 1;

fetch("quiz.json")
  .then((e) => {
    return e.json();
  })
  .then((arr) => {
    return arr[0];
  })
  .then((myObj) => {
    let keys = Object.keys(myObj);
    // data of categry section
    keys.forEach((e) => {
      let cat = document.createElement("span");
      cat.textContent = e;
      cateogry.append(cat);
    });
    // get selected cateogry
    [...cateogry.children].forEach((cat) => {
      cat.onclick = (e) => {
        // change color and prevent more click
        e.target.style.backgroundColor = "#004D40";
        prventClick(".cateogry span");

        // select quiz data
        let selectedCat = e.target.textContent;
        let questionObj = myObj[selectedCat];
        let questionKeys = Object.keys(questionObj);
        count.innerHTML = desiredQuestions;
        catSpan.textContent = selectedCat;
        quiz.style.display = "block";

        // add data to page based on myObj
        for (i = 0; i < desiredQuestions; i++) {
          // random key the delete it
          let randomInd = Math.floor(Math.random() * questionKeys.length);
          let currentKey = questionKeys[randomInd];
          questionKeys.splice(randomInd, 1);

          // question for every key
          let quest = document.createElement("div");
          quest.classList.add("quest");
          let title = document.createElement("h3");
          title.textContent = currentKey;

          // choosen words == key value
          let choose = document.createElement("div");
          choose.className = "choose";
          let chooseArr = questionObj[currentKey][0];
          let length = chooseArr.length;
          for (j = 0; j < length; j++) {
            // random places
            let randomIndex = Math.floor(Math.random() * chooseArr.length);
            currentChoose = chooseArr[randomIndex];
            chooseArr.splice(randomIndex, 1);

            let item = document.createElement("div");
            item.className = "item";
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("id", `choose-${i}-${j}`);
            input.setAttribute("name", `choose-${i}`);
            let label = document.createElement("label");
            label.setAttribute("for", `choose-${i}-${j}`);
            label.textContent = currentChoose;
            item.append(input, label);
            choose.append(item);
          }
          quest.append(title, choose);

          container.append(quest);

          // circle for evrey key(== question)
          circle.append(document.createElement("span"));
        }
        // add active on first one automatic
        container.firstElementChild.classList.add("active");

        // click on label I make them like that for not change other label in another question in case of click on label
        let quests = document.querySelectorAll(".quest");
        quests.forEach((e) => {
          let items = e.querySelectorAll(".quest .item");
          items.forEach((it) => {
            it.onclick = () => {
              items.forEach((i) => {
                i.classList.remove("active");
              });
              it.classList.add("active");
              it.querySelector("input").setAttribute("checked", true);
            };
          });
        });

        let left = 0; // counter for question answered to know the end
        let tr = 0;
        // function check true or false
        function check() {
          // current key = question(active)
          let curKey = document.querySelector(".quest.active h3").textContent;

          // current correct (from current key value index = 1)
          correct = questionObj[curKey][1];
          select =
            document.querySelector(".quest.active .item.active label") || " "; // " " for not choosen

          // condition for not last question
          if (left < desiredQuestions - 1) {
            let active = document.querySelector(".quest.active");
            active.classList.remove("active");
            active.nextElementSibling.classList.add("active");
          }

          // change color of circle and record correct and false
          if (select.textContent == correct) {
            [...circle.children][left].style.backgroundColor = "#1976D2";
            tr++;
          } else {
            [...circle.children][left].style.backgroundColor = "#F44336";
          }
        }

        function prventClick(ele) {
          document.querySelectorAll(`${ele}`).forEach((e) => {
            e.style.pointerEvents = "none";
          });
        }

        function zero() {
          if (left < desiredQuestions) {
            // not end quest
            check();
            left++;
          }
          if (left == desiredQuestions) {
            // end
            clearInterval(interval);
            prventClick(".item");
            cor.textContent = tr;
            wrong.textContent = desiredQuestions - tr;
            cor.parentElement.style.display = "block";
            container.remove();
            submit.remove();
            circle.parentElement.remove();
          } else {
            // I don't but it above to don't change time for the last question
            baseTime();
            timeData(cloneMinute, cloneSecond);
          }
        }

        // click on submit
        submit.onclick = () => {
          if (
            document.querySelector(".quest.active .item.active label ") !=
            undefined
          ) {
            // condition for don't click if not choose an answer
            zero();
          }
        };

        // time
        // set or back time to its origin==required
        function baseTime() {
          cloneMinute = reqMinutes;
          cloneSecond = reqSeconds;
        }

        // put time to page
        function timeData(min, sec) {
          min < 10
            ? (minute.textContent = `0${min}`)
            : (minute.textContent = `${min}`);

          sec < 10
            ? (second.textContent = `0${sec}`)
            : (second.textContent = `${sec}`);
        }

        baseTime();
        timeData(cloneMinute, cloneSecond);

        let interval = setInterval(() => {
          cloneSecond--;
          if (cloneSecond == -1 && cloneMinute != 0) {
            cloneMinute--;
            cloneSecond = 59;
          }
          // refreach page data every second
          timeData(cloneMinute, cloneSecond);

          if (cloneMinute == 0 && cloneSecond == -1) {
            zero();
          }
        }, 1000);
      };
    });
  });
