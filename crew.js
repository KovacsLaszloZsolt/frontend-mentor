fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    setCrew(data.crew);
  });

const setCrew = (crew) => {
  const subNav = document.querySelector(".sub-nav");

  crew.forEach((currentCrewMember) => {
    const crewMember = document.createElement("li");
    crewMember.classList.add("c-list-item");

    crewMember.addEventListener("click", () => {
      setCrewMemberInfo(crewMember, currentCrewMember);
    });

    subNav.appendChild(crewMember);
  });

  setCrewMemberInfo(document.querySelector(".c-list-item"), crew[0]);
};

const setCrewMemberInfo = (listItem, crewMemberInfo) => {
  const activeCrewMember = document.querySelector(".c-active");

  if (activeCrewMember) {
    activeCrewMember.classList.remove("c-active");
  }

  listItem.classList.add("c-active");

  const cImg = document.querySelector(".c-img");
  cImg.setAttribute("src", crewMemberInfo.images.png);
  cImg.setAttribute("alt", crewMemberInfo.name);

  const cRole = document.querySelector(".c-role");
  cRole.innerText = crewMemberInfo.role;

  const cName = document.querySelector(".c-name");
  cName.innerText = crewMemberInfo.name;

  const cBio = document.querySelector(".c-bio");
  cBio.innerText = crewMemberInfo.bio;
};
