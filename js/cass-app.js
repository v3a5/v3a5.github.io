async function loadSkills() {

    const container = document.getElementById("skills");
    container.innerHTML = "";

    try {

        const response = await fetch("frameworks/framework.json");
        const data = await response.json();

        data.competencies.forEach(skill => {

            const card = document.createElement("div");
            card.className = "skill-card";

            card.innerHTML =
                "<h3>" + skill.name + "</h3>" +
                "<p>" + skill.description + "</p>";

            container.appendChild(card);

        });

    } catch (error) {

        container.innerHTML = "Error loading framework.";

        console.error(error);

    }

}
