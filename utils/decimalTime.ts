// 시간을 소수점 형태로 변환하는 함수
export const convertToDecimalTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};
