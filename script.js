const artData = [
    { id: 1, title: "Blue Waves", category: "abstract", image: "BreakingWaves-Piha-SamuelEarp-oilpainting.jpg", description: "Vibrant abstract art with flowing blue patterns.", discount: "10%" },
    { id: 2, title: "Mountain Dawn", category: "landscape", image: "jonathan-padilla-dawn-mountains-jpadilla2020.jpg", description: "Serene landscape of mountains at sunrise.", discount: null },
    { id: 3, title: "Portrait Study", category: "portrait", image: "Bacon-Francis-Three-Studies-for-Self-Portrait-901-s001-2.jpg", description: "Detailed portrait with expressive colors.", discount: "15%" },
    { id: 4, title: "Starry Night", category: "abstract", image: "Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", description: "Abstract interpretation of a starry sky.", discount: null },
];

const cardContainer = document.getElementById("card-container");
const categoryFilter = document.getElementById("category");
const subscriptionModal = document.getElementById("subscription-modal");
const adModal = document.getElementById("ad-modal");
const subscribeBtn = document.getElementById("subscribe-btn");
const declineBtn = document.getElementById("decline-btn");
const closeAdBtn = document.getElementById("close-ad-btn");
const countdownEl = document.getElementById("countdown");

function renderCards(category = "all") {
    cardContainer.innerHTML = "";
    const filteredData = category === "all" ? artData : artData.filter(item => item.category === category);

    filteredData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <div style="position: relative;">
        <img src="${item.image}" alt="${item.title}">
        ${item.discount ? `<span class="discount-badge">${item.discount} OFF</span>` : ""}
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
        <div class="description">${item.description}</div>
        <button class="toggle-btn">Show Description</button>
      </div>
    `;
        cardContainer.appendChild(card);

        const toggleBtn = card.querySelector(".toggle-btn");
        const description = card.querySelector(".description");
        toggleBtn.addEventListener("click", () => {
            description.classList.toggle("open");
            toggleBtn.textContent = description.classList.contains("open") ? "Hide Description" : "Show Description";
        });
    });
}

categoryFilter.addEventListener("change", () => renderCards(categoryFilter.value));

// Subscription Modal Logic
if (!localStorage.getItem("subscribed")) {
    setTimeout(() => {
        subscriptionModal.classList.add("show");
    }, 5000);
}

subscribeBtn.addEventListener("click", () => {
    localStorage.setItem("subscribed", "true");
    subscriptionModal.classList.remove("show");
    alert("Thank you for subscribing!");
});

declineBtn.addEventListener("click", () => {
    subscriptionModal.classList.remove("show");
});

// reklama
let adTriggered = false;
function showAdModal() {
    if (!adTriggered) {
        adModal.classList.add("show");
        adTriggered = true;
        let countdown = 5;
        countdownEl.textContent = countdown;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownEl.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                closeAdBtn.disabled = false;
            }
        }, 1000);
    }
}

setTimeout(showAdModal, 10000);
window.addEventListener("scroll", () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 50) showAdModal();
});

closeAdBtn.addEventListener("click", () => {
    adModal.classList.remove("show");
});


renderCards();