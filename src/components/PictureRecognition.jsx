import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import appleImg from "../assets/apple.jpg";
import catImg from "../assets/cat.jpg";
import bookImg from "../assets/book.jpg";
import houseImg from "../assets/house.jpg";
import riceImg from "../assets/rice.jpg";
import teaImg from "../assets/tea.jpg";
import breadImg from "../assets/bread.jpg";
import eggImg from "../assets/egg.jpg";
import fishImg from "../assets/fish.jpg";
import meatImg from "../assets/meat.jpg";
import soupImg from "../assets/soup.jpg";
import cakeImg from "../assets/cake.jpg";
import milkImg from "../assets/milk.jpg";
import fruitImg from "../assets/fruit.jpg";
import noodlesImg from "../assets/noodles.jpg";
import dogImg from "../assets/dog.jpg";
import birdImg from "../assets/bird.jpg";
import grillFishImg from "../assets/grillFish.jpg";
import horseImg from "../assets/horse.jpg";

const vocab = [
  // Food (12 items)
  { word: "apple", translation: "苹果", image: appleImg },
  { word: "rice", translation: "米饭", image: riceImg },
  { word: "tea", translation: "茶", image: teaImg },
  { word: "bread", translation: "面包", image: breadImg },
  { word: "egg", translation: "鸡蛋", image: eggImg },
  // { word: "fish", translation: "鱼", image: grillFishImg },
  { word: "meat", translation: "肉", image: meatImg },
  { word: "soup", translation: "汤", image: soupImg },
  { word: "cake", translation: "蛋糕", image: cakeImg },
  { word: "milk", translation: "牛奶", image: milkImg },
  { word: "fruit", translation: "水果", image: fruitImg },
  { word: "noodles", translation: "面条", image: noodlesImg },

  // Animals (10 items)
  { word: "cat", translation: "猫", image: catImg },
  { word: "dog", translation: "狗", image: dogImg },
  { word: "bird", translation: "鸟", image: birdImg },
  { word: "fish", translation: "鱼", image: fishImg }, // Note: Different image from food "fish"
  { word: "horse", translation: "马", image: horseImg },
  // { word: "cow", translation: "牛", image: "/images/cow.jpg" },
  // { word: "pig", translation: "猪", image: "/images/pig.jpg" },
  // { word: "duck", translation: "鸭", image: "/images/duck.jpg" },
  // { word: "sheep", translation: "羊", image: "/images/sheep.jpg" },
  // { word: "bear", translation: "熊", image: "/images/bear.jpg" },

  // // Household Items (10 items)
  { word: "book", translation: "书", image: bookImg },
  // { word: "pen", translation: "笔", image: "/images/pen.jpg" },
  // { word: "chair", translation: "椅子", image: "/images/chair.jpg" },
  // { word: "table", translation: "桌子", image: "/images/table.jpg" },
  // { word: "lamp", translation: "灯", image: "/images/lamp.jpg" },
  // { word: "bed", translation: "床", image: "/images/bed.jpg" },
  // { word: "cup", translation: "杯子", image: "/images/cup.jpg" },
  // { word: "plate", translation: "盘子", image: "/images/plate.jpg" },
  // { word: "clock", translation: "时钟", image: "/images/clock.jpg" },
  // { word: "door", translation: "门", image: "/images/door.jpg" },

  // // Places (8 items)
  { word: "house", translation: "房子", image: houseImg },
  // { word: "school", translation: "学校", image: "/images/school.jpg" },
  // { word: "park", translation: "公园", image: "/images/park.jpg" },
  // { word: "shop", translation: "商店", image: "/images/shop.jpg" },
  // { word: "car", translation: "汽车", image: "/images/car.jpg" },
  // { word: "bus", translation: "公交车", image: "/images/bus.jpg" },
  // { word: "train", translation: "火车", image: "/images/train.jpg" },
  // { word: "street", translation: "街道", image: "/images/street.jpg" },

  // // Actions/Verbs (5 items)
  // { word: "run", translation: "跑", image: "/images/run.jpg" },
  // { word: "eat", translation: "吃", image: "/images/eat.jpg" },
  // { word: "sleep", translation: "睡觉", image: "/images/sleep.jpg" },
  // { word: "read", translation: "读", image: "/images/read.jpg" },
  // { word: "write", translation: "写", image: "/images/write.jpg" },

  // // Body Parts (5 items)
  // { word: "hand", translation: "手", image: "/images/hand.jpg" },
  // { word: "foot", translation: "脚", image: "/images/foot.jpg" },
  // { word: "head", translation: "头", image: "/images/head.jpg" },
  // { word: "eye", translation: "眼睛", image: "/images/eye.jpg" },
  // { word: "mouth", translation: "嘴", image: "/images/mouth.jpg" },
];

function PictureRecognition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  // Generate random options for the current word
  useEffect(() => {
    if (isFinished) return;
    const currentWord = vocab[currentIndex];
    const otherWords = vocab
      .filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.word);
    const newOptions = [...otherWords, currentWord.word].sort(
      () => Math.random() - 0.5
    );
    setOptions(newOptions);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setImgLoading(true);
  }, [currentIndex, isFinished]);

  // Play pronunciation
  const playPronunciation = () => {
    if (isFinished) return;
    const utterance = new SpeechSynthesisUtterance(vocab[currentIndex].word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === vocab[currentIndex].word) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 127,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Move to next word or finish
  const handleNext = () => {
    if (currentIndex + 1 < vocab.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[var(--color-base-100)] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[var(--color-primary-500)] mb-4">
          Quiz Complete!
        </h1>
        <p className="text-lg text-[var(--color-base-900)] mb-6">
          Your score: {score} / {vocab.length}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded hover:bg-[var(--color-primary-600)] transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-[var(--color-secondary-500)] text-white rounded hover:bg-[var(--color-secondary-600)] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-base-100)] flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-[var(--color-primary-500)] mb-4">
        Picture Recognition
      </h1>
      <p className="text-lg text-[var(--color-base-900)] mb-4">
        Score: {score}/{vocab.length}
      </p>
      <div className="bg-[var(--color-base-200)] p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="w-full h-48 flex items-center justify-center mb-4 relative">
          {imgLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-base-200)]">
              <div className="w-12 h-12 border-4 border-[var(--color-primary-300)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={vocab[currentIndex].image}
            alt="an image"
            className={`w-full h-48 object-cover rounded-md ${
              imgLoading ? "invisible" : ""
            }`}
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
          />
        </div>
        <p className="text-xl text-[var(--color-base-900)] text-center mb-2">
          {vocab[currentIndex].translation}
        </p>
        <button
          onClick={playPronunciation}
          className="w-full px-4 py-2 bg-[var(--color-secondary-500)] text-white rounded hover:bg-[var(--color-secondary-600)] transition-colors mb-4"
        >
          Hear Word
        </button>
        <div className="grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`px-4 py-2 rounded ${
                showFeedback && option === vocab[currentIndex].word
                  ? "bg-[var(--color-success-500)] text-white"
                  : showFeedback &&
                    selectedAnswer === option &&
                    selectedAnswer !== vocab[currentIndex].word
                  ? "bg-[var(--color-warning-500)] text-white"
                  : "bg-[var(--color-primary-100)] text-[var(--color-base-900)] hover:bg-[var(--color-primary-200)]"
              } transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className="mt-4 text-center">
            <p
              className={`text-lg ${
                selectedAnswer === vocab[currentIndex].word
                  ? "text-[var(--color-success-500)]"
                  : "text-[var(--color-warning-500)]"
              }`}
            >
              {selectedAnswer === vocab[currentIndex].word
                ? "Great job! 很好！"
                : "Try again! 再试一次！"}
            </p>
            <button
              onClick={handleNext}
              className="mt-2 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded hover:bg-[var(--color-primary-600)] transition-colors"
            >
              {currentIndex + 1 === vocab.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded hover:bg-[var(--color-primary-600)] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PictureRecognition;
