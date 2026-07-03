// Centralized translations for the entire app — 3 languages: kk, ru, en
export type Lang = "kk" | "ru" | "en";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "kk", label: "Қазақша", flag: "🇰🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export type LocalizedString = Record<Lang, string>;

export const t = (s: LocalizedString, lang: Lang) => s[lang] ?? s.en;

export const UI = {
  appName: { kk: "Дүниетану", ru: "Дүниетану", en: "Düniyetanu" } satisfies LocalizedString,
  tagline: {
    kk: "Әлемді ойнап үйрен!",
    ru: "Изучай мир через игру!",
    en: "Discover the world through play!",
  } satisfies LocalizedString,
  start: {
    kk: "Сабақты бастау",
    ru: "Начать обучение",
    en: "Start Learning",
  } satisfies LocalizedString,
  continue: { kk: "Жалғастыру", ru: "Продолжить", en: "Continue" } satisfies LocalizedString,
  chapters: { kk: "Бөлімдер", ru: "Разделы", en: "Chapters" } satisfies LocalizedString,
  lessons: { kk: "Сабақтар", ru: "Уроки", en: "Lessons" } satisfies LocalizedString,
  home: { kk: "Басты бет", ru: "Главная", en: "Home" } satisfies LocalizedString,
  profile: { kk: "Профиль", ru: "Профиль", en: "Profile" } satisfies LocalizedString,
  progress: { kk: "Жетістік", ru: "Прогресс", en: "Progress" } satisfies LocalizedString,
  achievements: { kk: "Марапаттар", ru: "Награды", en: "Achievements" } satisfies LocalizedString,
  next: { kk: "Келесі", ru: "Далее", en: "Next" } satisfies LocalizedString,
  prev: { kk: "Артқа", ru: "Назад", en: "Back" } satisfies LocalizedString,
  finish: { kk: "Аяқтау", ru: "Завершить", en: "Finish" } satisfies LocalizedString,
  quiz: { kk: "Викторина", ru: "Викторина", en: "Quiz" } satisfies LocalizedString,
  correct: { kk: "Дұрыс! 🎉", ru: "Верно! 🎉", en: "Correct! 🎉" } satisfies LocalizedString,
  wrong: { kk: "Қайталап көр", ru: "Попробуй ещё", en: "Try again" } satisfies LocalizedString,
  check: { kk: "Тексеру", ru: "Проверить", en: "Check" } satisfies LocalizedString,
  completed: { kk: "Аяқталды", ru: "Завершено", en: "Completed" } satisfies LocalizedString,
  ofLessons: { kk: "сабақтан", ru: "из", en: "of" } satisfies LocalizedString,
  exploreChapter: {
    kk: "Бөлімді ашу",
    ru: "Открыть раздел",
    en: "Open chapter",
  } satisfies LocalizedString,
  startLesson: { kk: "Бастау", ru: "Начать", en: "Start" } satisfies LocalizedString,
  intro: { kk: "Кіріспе", ru: "Введение", en: "Introduction" } satisfies LocalizedString,
  learn: { kk: "Үйрену", ru: "Учим", en: "Learn" } satisfies LocalizedString,
  practice: { kk: "Жаттығу", ru: "Практика", en: "Practice" } satisfies LocalizedString,
  matchPairs: {
    kk: "Жұптарды табыңыз",
    ru: "Найди пары",
    en: "Match the pairs",
  } satisfies LocalizedString,
  dragWords: {
    kk: "Сөздерді сүйреп апарыңыз",
    ru: "Перетащи слова",
    en: "Drag the words",
  } satisfies LocalizedString,
  yourScore: {
    kk: "Сіздің ұпайыңыз",
    ru: "Твой результат",
    en: "Your score",
  } satisfies LocalizedString,
  stars: { kk: "жұлдыз", ru: "звёзд", en: "stars" } satisfies LocalizedString,
  backToChapters: {
    kk: "Бөлімдерге қайту",
    ru: "К разделам",
    en: "Back to chapters",
  } satisfies LocalizedString,
  lesson: { kk: "Сабақ", ru: "Урок", en: "Lesson" } satisfies LocalizedString,
  totalLessons: { kk: "сабақ", ru: "уроков", en: "lessons" } satisfies LocalizedString,
  heroLine1: {
    kk: "Табиғатты, ғарышты және әлемді ашыңыз",
    ru: "Открой природу, космос и весь мир",
    en: "Discover nature, space and the whole world",
  } satisfies LocalizedString,
  heroLine2: {
    kk: "34 қызықты сабақ · 8 бөлім · ойындар мен викториналар",
    ru: "34 увлекательных урока · 8 разделов · игры и викторины",
    en: "34 fun lessons · 8 chapters · games & quizzes",
  } satisfies LocalizedString,
  mute: { kk: "Дыбысты өшіру", ru: "Без звука", en: "Mute" } satisfies LocalizedString,
  unmute: { kk: "Дыбысты қосу", ru: "Звук", en: "Sound" } satisfies LocalizedString,
  page: { kk: "Бет", ru: "Стр.", en: "Page" } satisfies LocalizedString,
  goals: { kk: "Сабақтың мақсаты", ru: "Цели урока", en: "Lesson goals" } satisfies LocalizedString,
  keyWords: { kk: "Тірек сөздер", ru: "Ключевые слова", en: "Key words" } satisfies LocalizedString,
  questions: { kk: "Сұрақтар", ru: "Вопросы", en: "Questions" } satisfies LocalizedString,
  task: { kk: "Тапсырма", ru: "Задание", en: "Task" } satisfies LocalizedString,
  watchVideo: {
    kk: "Бейнені қара",
    ru: "Посмотри видео",
    en: "Watch the video",
  } satisfies LocalizedString,
  dragHere: {
    kk: "Осы жерге апарып қой",
    ru: "Перетащи сюда",
    en: "Drop here",
  } satisfies LocalizedString,
  checkAnswer: {
    kk: "Жауапты тексеру",
    ru: "Проверить ответ",
    en: "Check answer",
  } satisfies LocalizedString,
  tryAgain: { kk: "Қайталап көр", ru: "Попробуй ещё", en: "Try again" } satisfies LocalizedString,
  greatJob: { kk: "Жарайсың!", ru: "Молодец!", en: "Great job!" } satisfies LocalizedString,
};
