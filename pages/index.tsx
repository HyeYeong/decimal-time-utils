import { useState } from "react";
import { convertToDecimalTime } from "../utils/decimalTime";

export default function Home() {
  // 시작 시간과 종료 시간 상태
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [calculatedTime, setCalculatedTime] = useState<number | null>(null);

  // 시간 차이를 계산하는 함수
  const handleCalculate = () => {
    const startDecimal = convertToDecimalTime(startTime);
    const endDecimal = convertToDecimalTime(endTime);
    const difference = endDecimal - startDecimal;

    // 음수가 나오지 않도록 처리
    setCalculatedTime(Math.max(difference, 0));
  };

  const handleReset = () => {
    setStartTime("");
    setEndTime("");
    setCalculatedTime(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>時間差計算/시간 차이 계산기(２４時間を小数点で計算)</h1>

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
        <button onClick={handleCalculate}>時間を計算</button>
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
