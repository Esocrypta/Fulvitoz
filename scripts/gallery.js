/* gallery.js */

const galleryRoot = document.getElementById("gallery-container");
const categorias = ["design", "illustration", "motion"];

categorias.forEach(categoria => {
  fetch(`/assets/galeria/${categoria}/`)
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const links = [...temp.querySelectorAll("a")]
        .map(a => a.getAttribute("href"))
        .filter(href => href && !href.startsWith("../") && href.endsWith("/"));

      links.forEach(pasta => {
        const nomeProjeto = pasta.replace(/\/$/, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const imgPath = `/assets/galeria/${categoria}/${pasta}capa.png`;

        const card = document.createElement("div");
        card.className = "card fadeInUp";
        card.innerHTML = `
          <img src="${imgPath}" alt="${nomeProjeto}">
          <div class="info">
            <h3>${nomeProjeto}</h3>
            <p>${categoria}</p>
          </div>
        `;

        galleryRoot.appendChild(card);
      });
    })
    .catch(err => console.error(`Erro ao carregar ${categoria}:`, err));
});

// ----------------------------
// Modo Claro / Escuro
// ----------------------------
const toggleThemeBtn = document.createElement("button");
toggleThemeBtn.setAttribute("aria-label", "Alternar tema");
toggleThemeBtn.innerHTML = `<span class="material-symbols-rounded">dark_mode</span>`;
toggleThemeBtn.className = "fixed bottom-6 right-6 z-50 bg-white text-black dark:bg-black dark:text-white p-3 rounded-full shadow-xl transition-all duration-300";
document.body.appendChild(toggleThemeBtn);

// Define estado inicial com base no localStorage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  toggleThemeBtn.innerHTML = `<span class="material-symbols-rounded">light_mode</span>`;
}

// Alternar tema ao clicar
toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  toggleThemeBtn.innerHTML = `<span class="material-symbols-rounded">${isDark ? "light_mode" : "dark_mode"}</span>`;
  localStorage.setItem("theme", isDark ? "dark" : "light");
});