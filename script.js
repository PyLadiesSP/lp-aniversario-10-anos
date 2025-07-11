document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements where content will be injected
    const mainNavList = document.getElementById('main-nav-list');
    const conductText = document.getElementById('conduct-text');
    const headerRegisterBtn = document.getElementById('header-register-btn');

    const heroTitle = document.getElementById('hero-title');
    const heroDate = document.getElementById('hero-date');
    const heroRegisterBtn = document.getElementById('hero-register-btn');

    const aboutEventTitle = document.getElementById('about-event-title');
    const aboutEventParagraphsDiv = document.getElementById('about-event-paragraphs');
    const aboutEventObjectivesList = document.getElementById('about-event-objectives');

    const agendaTitle = document.getElementById('agenda-title');
    const agendaList = document.getElementById('agenda-list');

    const communityHistoryTitle = document.getElementById('community-history-title');
    const communityHistoryParagraphsDiv = document.getElementById('community-history-paragraphs');

    const codeOfConductTitle = document.getElementById('code-of-conduct-title');
    const codeOfConductSubtitle = document.getElementById('code-of-conduct-subtitle');
    const codeOfConductIntroParagraphsDiv = document.getElementById('code-of-conduct-intro-paragraphs');
    const harassmentTitle = document.getElementById('harassment-title');
    const harassmentDefinitionsList = document.getElementById('harassment-definitions');
    const consequencesIntroP = document.getElementById('consequences-intro');
    const consequencesList = document.getElementById('consequences-list');
    const reportingInstructionsP = document.getElementById('reporting-instructions');
    const adaptationNoteP = document.getElementById('adaptation-note');

    const footerCopyrightP = document.getElementById('footer-copyright');
    const footerLegalNoticeP = document.getElementById('footer-legal-notice');

    // Function to fetch all content data from JSON
    async function fetchContent() {
        try {
            const response = await fetch('data/content.json'); // Path to your combined JSON file
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
            console.error('Erro ao carregar o conteúdo:', error);
            document.body.innerHTML = '<h1>Erro ao carregar o conteúdo do site. Por favor, tente novamente mais tarde.</h1>';
        }
    }

    // --- Population Functions for each section ---

    function populateHeader(data) {
        if (!data) return;

        mainNavList.innerHTML = '';
        data.fixedMenuLinks.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            li.appendChild(a);
            mainNavList.appendChild(li);
        });

        conductText.textContent = data.conductText;
        headerRegisterBtn.textContent = data.registerButtonText;
        // Add event listener for register button if needed (e.g., scroll to form)
        // headerRegisterBtn.addEventListener('click', () => { /* ... */ });
    }

    function populateHero(data) {
        if (!data) return;
        heroTitle.innerHTML = data.title.replace('PyLadies São Paulo', 'PyLadies São Paulo<br>'); // Add break for layout
        heroDate.textContent = data.date;
        heroRegisterBtn.textContent = data.registerButtonText;
        // Add event listener for register button if needed
        // heroRegisterBtn.addEventListener('click', () => { /* ... */ });
    }

    function populateAboutEvent(data) {
        if (!data) return;
        aboutEventTitle.textContent = data.title;

        aboutEventParagraphsDiv.innerHTML = '';
        data.paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            aboutEventParagraphsDiv.appendChild(p);
        });

        aboutEventObjectivesList.innerHTML = '';
        data.objectives.forEach(objective => {
            const li = document.createElement('li');
            li.textContent = objective;
            aboutEventObjectivesList.appendChild(li);
        });
    }

    function populateAgenda(data) {
        if (!data || !data.items || data.items.length === 0) {
            agendaList.innerHTML = '<p>Nenhum item na agenda para exibir.</p>';
            return;
        }

        agendaTitle.textContent = data.title;
        agendaList.innerHTML = ''; // Clear existing content

        data.items.forEach(item => {
            const agendaItemDiv = document.createElement('div');
            agendaItemDiv.classList.add('agenda-item');

            const timeSpan = document.createElement('span');
            timeSpan.classList.add('agenda-time');
            timeSpan.textContent = item.time;
            agendaItemDiv.appendChild(timeSpan);

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('agenda-content');

            const descriptionP = document.createElement('p');
            descriptionP.classList.add('agenda-description');
            descriptionP.textContent = item.description;
            contentDiv.appendChild(descriptionP);

            if (item.speaker) {
                const speakerDiv = document.createElement('div');
                speakerDiv.classList.add('speaker-info');
                speakerDiv.innerHTML = `<strong>${item.speaker.name}</strong><br>${item.speaker.cargo}`;
                contentDiv.appendChild(speakerDiv);
            }

            agendaItemDiv.appendChild(contentDiv);
            agendaList.appendChild(agendaItemDiv);
        });
    }

    function populateCommunityHistory(data) {
        if (!data) return;
        communityHistoryTitle.textContent = data.title;

        communityHistoryParagraphsDiv.innerHTML = '';
        data.paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            communityHistoryParagraphsDiv.appendChild(p);
        });
    }

    function populateCodeOfConduct(data) {
        if (!data) return;
        codeOfConductTitle.textContent = data.title;
        codeOfConductSubtitle.textContent = data.subtitle;

        codeOfConductIntroParagraphsDiv.innerHTML = '';
        data.introParagraphs.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            codeOfConductIntroParagraphsDiv.appendChild(p);
        });

        harassmentTitle.textContent = data.whatIsHarassmentTitle;
        harassmentDefinitionsList.innerHTML = '';
        data.harassmentDefinitions.forEach(def => {
            const li = document.createElement('li');
            li.textContent = def;
            harassmentDefinitionsList.appendChild(li);
        });

        consequencesIntroP.textContent = data.consequencesIntro;
        consequencesList.innerHTML = '';
        data.consequences.forEach(consequence => {
            const li = document.createElement('li');
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
    }

    // Fetch and display all content when the page loads
    fetchContent();
});