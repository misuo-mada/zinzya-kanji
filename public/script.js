
      /* script.js */


      document.addEventListener("DOMContentLoaded", () => {
        const modal = document.getElementById("modal");
        const modalOk = document.getElementById("modal-ok");
    
        // ゲーム開始前にモーダル表示
        modal.style.display = "flex";
    
        // 「OK」ボタンを押したらモーダルを閉じる
        modalOk.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });
    

      document.addEventListener("DOMContentLoaded", () => {
        const kanjiContainer = document.getElementById("kanji-container");
        const dropZone = document.getElementById("drop-zone");
        const resultText = document.getElementById("result");
        const selectableHyphen = document.getElementById("selectable-hyphen");
        
        const kanjiList = ["機", "思", "不", "度", "械","議"]; // "ー" をリストから削除
        const correctCombinations = ["ー度", "機械","不思議"]; // ３種類の正解組み合わせ
        let solvedCombinations = 0;
        
        kanjiList.forEach(kanji => {
            const kanjiElement = document.createElement("div");
            kanjiElement.classList.add("kanji-item");
            kanjiElement.textContent = kanji;
            kanjiElement.draggable = true;
            kanjiElement.addEventListener("dragstart", (event) => {
                if (!kanjiElement.classList.contains("disabled")) {
                    event.dataTransfer.setData("text", kanji);
                }
            });
            kanjiContainer.appendChild(kanjiElement);
        });
        
        if (selectableHyphen) {
            selectableHyphen.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", "ー");
            });
        }
        
        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        
        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();
            const kanji = event.dataTransfer.getData("text");
            
            if (!kanjiList.includes(kanji) && kanji !== "ー") {
                return;
            }
            
            if (!dropZone.textContent.includes(kanji)) {
                dropZone.textContent += kanji;
                
                const elements = document.querySelectorAll(".kanji-item");
                elements.forEach(element => {
                    if (element.textContent === kanji) {
                        element.classList.add("disabled");
                    }
                });
            }
            
            if (dropZone.textContent.length === 2) {
                let message = "答えは・・・・";
                resultText.textContent = "";
                
                let index = 0;
                const interval = setInterval(() => {
                    if (index < message.length) {
                        resultText.textContent += message[index];
                        index++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            if (correctCombinations.includes(dropZone.textContent)) {
                                solvedCombinations++;
                                resultText.textContent = "正解だよ～！ケケケッ！";
                                dropZone.textContent = "";
                            } else {
                                resultText.textContent = "不正解だ～。";
                                resetGame();
                            }
                            if (solvedCombinations === correctCombinations.length) {
                                resultText.innerHTML = "ケケケッ！全問正解！<br>お礼に今回の事件の重要な手がかりを教えてあげよ！<br>今回の事件は人間同士の殺し合いだよ！<br>ケケケケッ！";   }
                        }, 1000);
                    }
                }, 500);
            }
        });
        
        function resetGame() {
            dropZone.textContent = "";
            solvedCombinations = 0;
            
            const elements = document.querySelectorAll(".kanji-item");
            elements.forEach(element => {
                element.classList.remove("disabled");
            });
        }
        
        document.getElementById("reset").addEventListener("click", () => {
            resetGame();
            resultText.textContent = "";
        });
    });
    