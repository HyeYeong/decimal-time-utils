import { useState, useEffect } from "react";
import { Noto_Sans_KR, Roboto } from "next/font/google";
import { convertToDecimalTime } from "./../utils/decimalTime";

const notoSans = Noto_Sans_KR({ weight: ["300", "700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["300", "700"], subsets: ["latin"] });

export default function Home() {
  // 시작 시간과 종료 시간 상태
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [calculatedTime, setCalculatedTime] = useState<number | null>(null);

  // 현재 날짜 및 시간 상태
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const weekdays = [
    "일요일 (日)",
    "월요일 (月)",
    "화요일 (火)",
    "수요일 (水)",
    "목요일 (木)",
    "금요일 (金)",
    "토요일 (土)",
  ];

  // 날짜 및 시간 업데이트 함수
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString(); // YYYY/MM/DD 형식
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }); // HH:MM:SS
      const day = weekdays[now.getDay()]; // 요일 표시

      setCurrentDate(`${date}, ${day}`);
      setCurrentTime(time);
    };

    updateDateTime(); // 초기 실행
    const timer = setInterval(updateDateTime, 1000); // 1초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
  }, []);

  // 시간 차이를 계산하는 함수
  useEffect(() => {
    if (startTime && endTime) {
      const startDecimal = convertToDecimalTime(startTime);
      const endDecimal = convertToDecimalTime(endTime);
      const difference = endDecimal - startDecimal;

      setCalculatedTime(Math.max(difference, 0));
    } else {
      setCalculatedTime(null); // 둘 다 입력되지 않았을 때 결과 초기화
    }
  }, [startTime, endTime]);

  const handleReset = () => {
    setStartTime("");
    setEndTime("");
    setCalculatedTime(null);
  };

  return (
    <div
      className={`${notoSans.className} ${roboto.className}`}
      style={{ padding: "1rem", color: "3e3e3e" }}
    >
      <h1>
        時間差計算
        <br />
        시간 차이 계산기
        <br />
      </h1>
      <p>(２４時間を小数点で計算)</p>
      <h2
        style={{
          marginBottom: "1rem",
          fontWeight: "bold",
          letterSpacing: "3px",
        }}
      >
        📅 {currentDate} <br />⏰ {currentTime}
      </h2>

      <div>
        <label>
          開始時間 (HH:MM):{" "}
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="開始時間"
          />
        </label>
      </div>

      <div>
        <label>
          終了時間 (HH:MM):{" "}
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="終了時間"
          />
        </label>
      </div>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        <button onClick={handleReset}>RESET</button>
      </div>

      {calculatedTime !== null && (
        <div style={{ marginTop: "1rem" }}>
          <h2>結果: {calculatedTime.toFixed(2)} 시간</h2>
        </div>
      )}
    </div>
  );
}
