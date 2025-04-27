const questions = [
  'Я смеялась и видела забавную сторону происходящего',
  'Я с оптимизмом смотрела в будущее',
  'Я без особого труда справлялась с делами',
  'Мне было трудно смеяться или видеть забавное',
  'Я чувствовала тревогу и страх без особой причины',
  'Мне было трудно спать по ночам',
  'Я чувствовала грусть и подавленность',
  'Мне казалось, что я не справляюсь с материнством',
  'Я чувствовала себя одинокой',
  'У меня были мысли причинить себе вред'
];

const answers = [
  "0 — Нет, совсем не так",
  "1 — Скорее нет, чем да",
  "2 — Скорее да, чем нет",
  "3 — Да, именно так"
];

const questionsContainer = document.getElementById("questions");

questions.forEach((question, index) => {
  const label = document.createElement("label");
  label.textContent = `${index + 1}. ${question}`;

  const select = document.createElement("select");
  select.name = `q${index + 1}`;
  select.required = true;

  answers.forEach((answer, value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = answer;
    select.appendChild(option);
  });

  questionsContainer.appendChild(label);
  questionsContainer.appendChild(select);
});

document.getElementById("edinburgh-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/analyze", { // без localhost — будет работать на Render
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }

    const result = await response.json();
    document.getElementById("result").textContent = result.message;
  } catch (error) {
    console.error('Ошибка:', error);
    document.getElementById("result").textContent = "Произошла ошибка. Попробуйте позже.";
  }
});
