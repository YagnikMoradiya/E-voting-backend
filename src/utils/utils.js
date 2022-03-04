import bcrypt from "bcrypt";
// import moment from "moment";

export const hashPassword = (password, salt) => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const calculateMinute = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  let diff = (startTime.getTime() - endTime.getTime()) / 1000;

  diff /= 60;
  return Math.abs(Math.round(diff));
};

const getRandomNumber = () => {
  return (Math.floor(Math.random() * 9) + 1).toString();
};

export const generateRandomNumber = () => {
  let str =
    getRandomNumber() +
    getRandomNumber() +
    getRandomNumber() +
    getRandomNumber() +
    getRandomNumber() +
    getRandomNumber();
  return parseInt(str);
};
