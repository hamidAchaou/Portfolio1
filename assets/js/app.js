let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = ""; // Corrected line
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

//====================== circle skills =========================================
let circles = document.querySelectorAll(".circle");
circles.forEach((elem) => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});

// ============= mix it up PORTFOLIO SECTION ============================
var mixer = mixitup(".container");
//modal crards projects
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("projectModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalImage = document.getElementById("modalImage");
  var modalDescription = document.getElementById("modalDescription");
  var closeBtn = document.getElementsByClassName("close")[0];
  var projectLinks = document.querySelectorAll(".project-details");
  projectLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      modalTitle.textContent = this.getAttribute("data-title");
      modalImage.src = this.getAttribute("data-image");
      modalDescription.textContent = this.getAttribute("data-description");
      modal.style.display = "block";
    });
  });
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
document.addEventListener("DOMContentLoaded", function () {
  let projectsData;
  const portfolioGallery = document.querySelector(".portfolio-gallery");
  const modalReport = document.getElementById("modalReport");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const modal = document.getElementById("projectModal");
  const closeBtn = modal.querySelector(".close");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  // Fetch the projects data
  fetch("data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      projectsData = data.projects;
      displayProjects("all");
      setupEventListeners();
      initScrollReveal();
    })
    .catch((error) => console.error("Error loading projects:", error));
  function displayProjects(category) {
    portfolioGallery.innerHTML = "";
    projectsData.forEach((project) => {
      if (category === "all" || project.category === category) {
        const projectElement = createProjectElement(project);
        portfolioGallery.appendChild(projectElement);
      }
    });
    // Re-initialize ScrollReveal for new elements
    initScrollReveal();
  }
  function createProjectElement(project) {
    const projectDiv = document.createElement("div");
    projectDiv.className = `port-box mix ${project.category}`;
    projectDiv.dataset.projectId = project.id;
    projectDiv.innerHTML = `
            <div class="port-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="port-content">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}...</p>
                <a href="#" class="project-details">
                    <i class='bx bx-link-external'></i>
                </a>
            </div>
        `;
    return projectDiv;
  }

  function setupEventListeners() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.dataset.filter;
        displayProjects(category);
      });
    });

    portfolioGallery.addEventListener("click", function (e) {
      if (e.target.closest(".project-details")) {
        e.preventDefault();
        const projectId = e.target.closest(".port-box").dataset.projectId;
        const project = projectsData.find((p) => p.id === projectId);
        if (project) {
          modalTitle.textContent = project.title;
          modalImage.src = project.image;
          modalImage.alt = project.title;
          modalDescription.textContent = project.description;

          // Display technologies
          modalTechnologies.innerHTML = project.technologies
            .map((tech) => `<span class="tech-tag">${tech}</span>`)
            .join("");

          // Set up links (if available)
          if (project.github) {
            modalGithub.href = project.github;
            modalGithub.style.display = "inline-block";
          } else {
            modalGithub.style.display = "none";
          }

          if (project.liveDemo) {
            modalLive.href = project.liveDemo;
            modalLive.style.display = "inline-block";
          } else {
            modalLive.style.display = "none";
          }

          // Add report button if report field is not empty
          if (project.report && project.report !== "") {
            modalReport.href = project.report;
            modalReport.style.display = "inline-block";
          } else {
            modalReport.style.display = "none";
          }

          modal.style.display = "block";
        }
      }
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  function initScrollReveal() {
    ScrollReveal().reveal(".port-box", {
      origin: "left",
      distance: "50px",
      duration: 1500,
      delay: 300,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      interval: 200,
      opacity: 0,
      scale: 0.7,
      cleanup: true,
    });
  }
});

// =============  active menue ===============================
let menuLi = document.querySelectorAll("header  ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// =============  sticky navbar ===============================
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50);
});

// ========== togel icon navbar ===================================
let menuIcon = document.querySelector("#menu-icon");
let navList = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navList.classList.toggle("open");
};

window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navList.classList.remove("open");
};

// ========== paralox ===================================
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry)=> {
//         if(entry.isIntersecting) {
//             entry.target.classList.add("show-items")
//         } else {
//             entry.target.classList.remove("show-items")
//         }
//     })
// });

// const scrollScale = document.querySelectorAll(".scroll-scale");
// scrollScale.forEach((el)=> observer.observe(el));

// const scrollBottom = document.querySelectorAll(".scroll-bottom");
// scrollBottom.forEach((el)=> observer.observe(el));

// const scrollTop = document.querySelectorAll(".scroll-top");
// scrollTop.forEach((el)=> observer.observe(el));

// scrollreveal
// ScrollReveal animations

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// ScrollReveal().reveal('.skill-left, .skill-right', { origin: 'bottom', interval: 200 });
// ScrollReveal().reveal('.img-about, .about-content', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal(".service-box", { origin: "bottom", interval: 200 });
ScrollReveal().reveal(".port-box", { origin: "bottom", interval: 200 });

// skills
// Reveal main text
ScrollReveal().reveal(".skills .main-text", {
  origin: "top",
  distance: "20px",
  duration: 1000,
  delay: 200,
});

// Reveal skill bars
ScrollReveal().reveal(".skill-left .skill-bar", {
  origin: "left",
  distance: "50px",
  duration: 1000,
  interval: 200,
});

// Animate skill bar progress
ScrollReveal().reveal(".skill-left .skill-bar .bar span", {
  origin: "left",
  distance: "100%",
  duration: 1500,
  interval: 200,
  afterReveal: (el) => {
    el.style.transform = "translateX(0)";
  },
});

// Reveal professional skills boxes
ScrollReveal().reveal(".skill-right .box", {
  origin: "right",
  distance: "50px",
  duration: 1000,
  interval: 200,
});

// aboute
// Reveal the image
ScrollReveal().reveal(".img-about", {
  origin: "left",
  distance: "50px",
  duration: 1000,
  delay: 200,
  easing: "ease-in-out",
});

// Reveal the info boxes with a stagger effect
ScrollReveal().reveal(
  ".img-about .info-about1, .img-about .info-about2, .img-about .info-about3",
  {
    origin: "bottom",
    distance: "30px",
    duration: 800,
    interval: 200,
    opacity: 0,
    scale: 0.8,
    easing: "ease-out",
  }
);

// Reveal the about content
ScrollReveal().reveal(".about-content", {
  origin: "right",
  distance: "50px",
  duration: 1000,
  delay: 400,
  easing: "ease-in-out",
});

// Reveal the text elements within about content
ScrollReveal().reveal(
  ".about-content span, .about-content h2, .about-content p",
  {
    origin: "bottom",
    distance: "20px",
    duration: 800,
    interval: 200,
    opacity: 0,
    easing: "ease-out",
  }
);

// =========== download cv ==========================
document.getElementById("download-cv").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "./assets/cv/cv-fr.pdf";
  link.download = "Hamid_AChaou_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
