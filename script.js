const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

function renderElements(taskList) {
  const ul = document.querySelector(".tasks__list");
  ul.innerHTML = ""; // <— aqui

  taskList.forEach(task => {
    const taskItem = createTaskItem(task);
    ul.appendChild(taskItem);
  });
}

function createTaskItem(task) {
  const li = document.createElement("li");
  li.classList.add("task__item");

  const info = document.createElement("div");
  info.classList.add("task-info__container");

  const badge = document.createElement("span");
  badge.classList.add("task-type");
  badge.classList.add(
    task.type.toLowerCase() === "urgente" ? "span-urgent" :
    task.type.toLowerCase() === "importante" ? "span-important" :
    "span-normal"
  );

  const title = document.createElement("p");
  title.textContent = task.title;

  const btn = document.createElement("button");
  btn.classList.add("task__button--remove-task");
  btn.addEventListener("click", () => {
    const idx = tasks.findIndex(t => t.title === task.title && t.type === task.type);
    if (idx > -1) {
      tasks.splice(idx, 1);
      renderElements(tasks);
    }
  });

  info.append(badge, title);
  li.append(info, btn);
  return li;
}

// Formulário
const form = document.querySelector(".form__container");
const inputTitle = document.getElementById("input_title");
const selectPriority = document.querySelector(".form__input--priority");

form.addEventListener("submit", e => {
  e.preventDefault();
  const title = inputTitle.value.trim();
  const type = selectPriority.value;
  if (!title || !type) {
    return alert("Preencha título e selecione prioridade!");
  }
  tasks.push({ title, type });
  renderElements(tasks);
  inputTitle.value = "";
  selectPriority.selectedIndex = 0;
});

// Inicializa
document.addEventListener("DOMContentLoaded", () => renderElements(tasks));
