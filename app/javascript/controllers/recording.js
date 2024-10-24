document.addEventListener("turbo:load", init);
document.addEventListener("DOMContentLoaded", init);

function init() {
  const songSelect = document.getElementById("songSelect");
  const lyricsDisplay = document.getElementById("lyricsDisplay");
  const startRecordingButton = document.getElementById("startRecordingButton");
  const stopRecordingButton = document.getElementById("stopRecordingButton");
  const submitRecordingButton = document.getElementById("submitRecordingButton");
  const audioPlayback = document.getElementById("audioPlayback");
  const audioDataInput = document.getElementById("audioDataInput");

  let mediaRecorder;
  let audioChunks = [];

  // 曲に対応する歌詞
  const songLyrics = {
    "Twinkle, Twinkle, Little Star": `
      きらきらひかる<br>
      おそらのほしよ<br>
      まばたきしては<br>
      みんなをみてる<br>
    `,
    "Happy Birthday": `
      ハッピーバースデー トゥー ユー<br>
      ハッピーバースデー トゥー ユー<br>
      ハッピーバースデー ディア [名前]<br>
      ハッピーバースデー トゥー ユー<br>
    `,
    "Row, Row, Row Your Boat": `
      こげよマイケル こげよボートを<br>
      ゆかいに たのしく いのち は たのし<br>
    `,
    "Jingle Bells": `
      ジングルベルジングルベル<br>
      すずが なる<br>
      きょうは たのしい<br>
      クリスマス<br>
    `
  };

  // ドロップダウンで選択された曲に応じて歌詞を表示
  songSelect.addEventListener("change", function() {
    const selectedSong = songSelect.value;
    if (selectedSong && songLyrics[selectedSong]) {
      lyricsDisplay.innerHTML = songLyrics[selectedSong];
      startRecordingButton.disabled = false; // 録音開始ボタンを有効にする
    } else {
      lyricsDisplay.innerHTML = "曲を選択すると、歌詞が表示されます。";
      startRecordingButton.disabled = true; // 曲が選択されていない場合は無効化
    }
  });

  // マイクにアクセスして録音を開始
  startRecordingButton.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayback.src = audioUrl;

        // BlobをBase64に変換してフォームにセット
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          audioDataInput.value = reader.result; // Base64形式の音声データをhiddenフィールドにセット
          submitRecordingButton.disabled = false; // 送信ボタンを有効化
        };
      };

      mediaRecorder.start();
      startRecordingButton.disabled = true; // 録音中は録音開始ボタンを無効化
      stopRecordingButton.disabled = false; // 録音停止ボタンを有効化
    } catch (error) {
      console.error("マイクへのアクセスに失敗しました:", error);
    }
  });

  // 録音を停止
  stopRecordingButton.addEventListener("click", () => {
    mediaRecorder.stop();
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
  });
}
