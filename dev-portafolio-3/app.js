// /dev-portafolio-3/app.js
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card-dev");
  const githubLink = document.querySelector("a.github");

  if (!card) return;

  // Animación de entrada
  card.classList.add("reveal");
  requestAnimationFrame(() => card.classList.add("is-visible"));

  // 1) Convertir servicios (li) en badges visuales sin tocar tu HTML
  const serviciosTitle = [...card.querySelectorAll("h3")].find(h => h.textContent.trim().toLowerCase() === "servicios");
  const serviciosList = serviciosTitle?.nextElementSibling?.tagName === "UL" ? serviciosTitle.nextElementSibling : null;

  if (serviciosList) {
    const items = [...serviciosList.querySelectorAll("li")].map(li => li.textContent.trim()).filter(Boolean);

    if (items.length) {
      const badgesWrap = document.createElement("div");
      badgesWrap.className = "tecnologias"; // reutiliza estilo chip
      badgesWrap.style.marginTop = "10px";

      items.forEach(text => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = text;
        badgesWrap.appendChild(badge);
      });

      // Oculta la lista y muestra los badges
      serviciosList.style.display = "none";
      serviciosTitle.insertAdjacentElement("afterend", badgesWrap);
    }
  }

  // 2) Mejorar el botón de GitHub: ícono + texto si no lo tiene
  if (githubLink) {
    if (!githubLink.dataset.enhanced) {
      githubLink.dataset.enhanced = "1";
      githubLink.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.73.5.75 5.7.75 12.1c0 5.14 3.44 9.5 8.2 11.04.6.12.82-.27.82-.58 0-.29-.01-1.05-.02-2.06-3.34.75-4.04-1.66-4.04-1.66-.55-1.44-1.35-1.83-1.35-1.83-1.1-.77.09-.75.09-.75 1.22.09 1.86 1.29 1.86 1.29 1.08 1.9 2.83 1.35 3.52 1.03.11-.8.42-1.35.76-1.66-2.66-.31-5.46-1.37-5.46-6.08 0-1.34.46-2.43 1.22-3.29-.12-.31-.53-1.56.12-3.26 0 0 1-.33 3.3 1.26.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.3-1.6 3.3-1.26 3.3-1.26.65 1.7.24 2.95.12 3.26.76.86 1.22 1.95 1.22 3.29 0 4.72-2.8 5.76-5.47 6.07.43.38.81 1.12.81 2.26 0 1.63-.02 2.95-.02 3.35 0 .32.22.7.83.58 4.76-1.54 8.2-5.9 8.2-11.04C23.25 5.7 18.27.5 12 .5z"/>
        </svg>
        Ver GitHub
      `;
    }

    // 3) Botón "Copiar GitHub"
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn-secondary";
    copyBtn.type = "button";
    copyBtn.textContent = "Copiar enlace de GitHub";

    githubLink.insertAdjacentElement("afterend", copyBtn);

    // Toast
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Enlace copiado ✅";
    document.body.appendChild(toast);

    const showToast = (msg) => {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1600);
    };

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(githubLink.href);
        showToast("Enlace copiado ✅");
      } catch {
        // fallback antiguo
        const temp = document.createElement("input");
        temp.value = githubLink.href;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
        showToast("Enlace copiado ✅");
      }
    });
  }

  // 4) Suavizar el texto si quedó muy largo: recorta y agrega "Leer más"
  const desc = card.querySelector(".descripcion");
  if (desc) {
    const full = desc.textContent.trim();
    const max = 170;

    if (full.length > max) {
      const short = full.slice(0, max).trim() + "… ";
      desc.textContent = short;

      const more = document.createElement("button");
      more.className = "btn-secondary";
      more.type = "button";
      more.textContent = "Leer más";

      desc.insertAdjacentElement("afterend", more);

      let expanded = false;
      more.addEventListener("click", () => {
        expanded = !expanded;
        desc.textContent = expanded ? full : short;
        more.textContent = expanded ? "Ver menos" : "Leer más";
      });
    }
  }
});