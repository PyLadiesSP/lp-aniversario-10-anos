document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements where content will be injected
  const mainNavList = document.getElementById("main-nav-list");
  const headerRegisterBtn = document.getElementById("header-register-btn");

  const heroTitle = document.getElementById("hero-title");
  const heroDate = document.getElementById("hero-date");
  const heroRegisterBtn = document.getElementById("hero-register-btn");
  const mapsRegisterBtn = document.getElementById("hero-maps-btn");


  const aboutEventTitle = document.getElementById("about-event-title");
  const aboutEventParagraphsDiv = document.getElementById(
    "about-event-paragraphs"
  );
  const aboutEventObjectivesList = document.getElementById(
    "about-event-objectives"
  );

  const agendaTitle = document.getElementById("agenda-title");
  const agendaList = document.getElementById("agenda-list");

  const communityHistoryTitle = document.getElementById(
    "community-history-title"
  );
  const communityHistoryParagraphsDiv = document.getElementById(
    "community-history-paragraphs"
  );

  const codeOfConductTitle = document.getElementById("code-of-conduct-title");
  const codeOfConductSubtitle = document.getElementById(
    "code-of-conduct-subtitle"
  );
  const codeOfConductIntroParagraphsDiv = document.getElementById(
    "code-of-conduct-intro-paragraphs"
  );
  const harassmentTitle = document.getElementById("harassment-title");
  const harassmentDefinitionsList = document.getElementById(
    "harassment-definitions"
  );
  const consequencesIntroP = document.getElementById("consequences-intro");
  const consequencesList = document.getElementById("consequences-list");
  const reportingInstructionsP = document.getElementById(
    "reporting-instructions"
  );
  const adaptationNoteP = document.getElementById("adaptation-note");

  const footerCopyrightP = document.getElementById("footer-copyright");
  const footerLegalNoticeP = document.getElementById("footer-legal-notice");
  const footerCreateDescription = document.getElementById("footer-create-description");
  const footerCreateMember = document.getElementById("footer-create-member");

  // Select countdown timer elements
  const countdownHeaderElement = document.getElementById("countdown-header"); // NEW
  const countdownTimerElement = document.getElementById("countdown-timer"); // Existing main one

  // Define the event date (September 6, 2025)
  // The date is "6 DE SETEMBRO 2025"
  // Assuming 9 AM, as typical for event starts in Mogi das Cruzes, São Paulo, Brazil (UTC-3).
  const eventDate = new Date("2025-09-06T09:00:00-03:00");

  // Function to calculate and display the countdown for a given element
  function updateCountdown(element) {
    const now = new Date();
    const timeLeft = eventDate - now; // Time difference in milliseconds

    if (timeLeft <= 0) {
      if (element) {
        element.textContent = "O evento começou!";
      }
      // Clear both intervals if they exist
      if (countdownHeaderInterval) clearInterval(countdownHeaderInterval);
      if (countdownMainInterval) clearInterval(countdownMainInterval);
      return;
    }

    if (timeLeft > 0) {
      if (element) {
        element.textContent = "O evento finalizou!";
      }
     
      // Clear both intervals if they exist
      if (countdownHeaderInterval) clearInterval(countdownHeaderInterval);
      if (countdownMainInterval) clearInterval(countdownMainInterval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (element) {
      element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  // Initialize and store intervals for each countdown
  let countdownHeaderInterval;
  if (countdownHeaderElement) {
    updateCountdown(countdownHeaderElement); // Initial call
    countdownHeaderInterval = setInterval(
      () => updateCountdown(countdownHeaderElement),
      1000
    );
  }

  let countdownMainInterval;
  if (countdownTimerElement) {
    updateCountdown(countdownTimerElement); // Initial call
    countdownMainInterval = setInterval(
      () => updateCountdown(countdownTimerElement),
      1000
    );
  }

  // Function to fetch all content data from JSON
  async function fetchContent() {
    try {
      const response = await fetch("data/content.json"); // Path to your combined JSON file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentData = await response.json();
      populateHeader(contentData.header);
      populateHero(contentData.hero);
      populateAboutEvent(contentData.aboutEvent);
      populateAgenda(contentData.agenda);
      populateCommunityHistory(contentData.communityHistory);
      populateCodeOfConduct(contentData.codeOfConduct);
      populateFooter(contentData.footer);
    } catch (error) {
      console.error("Erro ao carregar o conteúdo:", error);
      document.body.innerHTML =
        "<h1>Erro ao carregar o conteúdo do site. Por favor, tente novamente mais tarde.</h1>";
    }
  }

  // --- Population Functions for each section ---

  function populateHeader(data) {
    if (!data) return;

    mainNavList.innerHTML = "";
    data.fixedMenuLinks.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      mainNavList.appendChild(li);
    });

    headerRegisterBtn.textContent = data.registerButtonText;
    // Add event listener for register button if needed (e.g., scroll to form)
    // headerRegisterBtn.addEventListener('click', () => { /* ... */ });
  }

  function populateHero(data) {
    if (!data) return;
    heroTitle.innerHTML = data.title.replace(
      "PyLadies São Paulo",
      "PyLadies São Paulo<br>"
    ); // Add break for layout
    heroDate.textContent = data.date;
    heroRegisterBtn.textContent = data.registerButtonText;
        mapsRegisterBtn.textContent = data.mapsButtonText;
    // Add event listener for register button if needed
    // heroRegisterBtn.addEventListener('click', () => { /* ... */ });
  }

  function populateAboutEvent(data) {
    if (!data) return;
    aboutEventTitle.textContent = data.title;

    aboutEventParagraphsDiv.innerHTML = "";
    data.paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      aboutEventParagraphsDiv.appendChild(p);
    });

    aboutEventObjectivesList.innerHTML = "";
    data.objectives.forEach((objective) => {
      const li = document.createElement("li");
      li.textContent = objective;
      aboutEventObjectivesList.appendChild(li);
    });
  }

  function populateAgenda(data) {
    if (!data || !data.items || data.items.length === 0) {
      agendaList.innerHTML = "<p>Nenhum item na agenda para exibir.</p>";
      return;
    }

    agendaTitle.textContent = data.title;
    agendaList.innerHTML = ""; // Clear existing content

    data.items.forEach((item) => {
      const agendaItemDiv = document.createElement("div");
      agendaItemDiv.classList.add("agenda-item");

      const timeSpan = document.createElement("span");
      timeSpan.classList.add("agenda-time");
      timeSpan.textContent = item.time;
      agendaItemDiv.appendChild(timeSpan);

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("agenda-content");

      const descriptionP = document.createElement("p");
      descriptionP.classList.add("agenda-description");
      descriptionP.textContent = item.description;
      contentDiv.appendChild(descriptionP);

      if (item.speaker) {
        const speakerDiv = document.createElement("div");
        speakerDiv.classList.add("speaker-info");
        speakerDiv.innerHTML = `<img src="${item.speaker.avatar}" alt=foto do palestrante"/><br><div class="title">${item.speaker.name}</div><br>${item.speaker.cargo}`;
        contentDiv.appendChild(speakerDiv);
      }

      agendaItemDiv.appendChild(contentDiv);
      agendaList.appendChild(agendaItemDiv);
    });
  }

  function populateCommunityHistory(data) {
    if (!data) return;
    communityHistoryTitle.textContent = data.title;

    communityHistoryParagraphsDiv.innerHTML = "";
    data.paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      communityHistoryParagraphsDiv.appendChild(p);
    });
  }

  function populateCodeOfConduct(data) {
    if (!data) return;
    codeOfConductTitle.textContent = data.title;
    codeOfConductSubtitle.textContent = data.subtitle;

    codeOfConductIntroParagraphsDiv.innerHTML = "";
    data.introParagraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      codeOfConductIntroParagraphsDiv.appendChild(p);
    });

    harassmentTitle.textContent = data.whatIsHarassmentTitle;
    harassmentDefinitionsList.innerHTML = "";
    data.harassmentDefinitions.forEach((def) => {
      const li = document.createElement("li");
      li.textContent = def;
      harassmentDefinitionsList.appendChild(li);
    });

    consequencesIntroP.textContent = data.consequencesIntro;
    consequencesList.innerHTML = "";
    data.consequences.forEach((consequence) => {
      const li = document.createElement("li");
      li.textContent = consequence;
      consequencesList.appendChild(li);
    });

    reportingInstructionsP.textContent = data.reportingInstructions;
    adaptationNoteP.textContent = data.adaptationNote;
  }

  function populateFooter(data) {
    if (!data) return;
    footerCopyrightP.textContent = `© ${data.copyright}`; // Add the copyright symbol
    footerLegalNoticeP.textContent = data.legalNotice;
    footerCreateDescription.textContent = data.createDescription;
    footerCreateMember.textContent = data.createMember;
  }

  const shareButtons = document.querySelectorAll(".share-btn");

  const eventUrl = window.location.href; // URL atual da página
  const eventTitle = "PyLadies São Paulo - Aniversário de 10 anos!";
  const eventDescription =
    "Participe do Aniversário das PyLadies São Paulo que completa 10 anos!";
  const eventHashtags =
    "PyLadiesSP,PythonBrasil,ComunidadePython, ComunidadeFeminina";

  shareButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const platform = button.dataset.platform;
      let shareUrl = "";

      switch (platform) {
        case "twitter":
          // Limitar a mensagem para caber no Twitter (280 caracteres - URL e hashtags)
          const twitterText = encodeURIComponent(
            `${eventTitle} ${eventDescription}. Saiba mais e inscreva-se: ${eventUrl} #${eventHashtags.replace(
              /,/g,
              " #"
            )}`
          );
          shareUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;
          break;
        case "facebook":
          // Facebook prefere que você apenas forneça a URL, ele puxa o og:tags
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            eventUrl
          )}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            eventUrl
          )}&title=${encodeURIComponent(
            eventTitle
          )}&summary=${encodeURIComponent(
            eventDescription
          )}&source=${encodeURIComponent(window.location.origin)}`;
          break;
        case "whatsapp":
          // WhatsApp usa um esquema de URL diferente para desktop/mobile
          const whatsappText = encodeURIComponent(
            `${eventTitle}\n${eventDescription}\n\nConfira: ${eventUrl}`
          );
          if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Check for mobile devices
            shareUrl = `whatsapp://send?text=${whatsappText}`;
          } else {
            shareUrl = `https://web.whatsapp.com/send?text=${whatsappText}`;
          }
          break;
        default:
          return; // Não faz nada se a plataforma não for reconhecida
      }

      // Abre a janela de compartilhamento em um pop-up
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1"
      );
    });
  });
  // Fetch and display all content when the page loads
  fetchContent();
});
