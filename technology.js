fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    setTechnology(data.technology);
  });

const setTechnology = (technology) => {
  const subNav = document.querySelector(".sub-nav");

  technology.forEach((currentTechnology, index) => {
    const technologyNavItem = document.createElement("li");
    technologyNavItem.classList.add("t-list-item");
    technologyNavItem.innerText = index + 1;
    technologyNavItem.addEventListener("click", () => {
      setTechnologyInfo(technologyNavItem, currentTechnology);
    });

    subNav.appendChild(technologyNavItem);
  });

  setTechnologyInfo(document.querySelector(".t-list-item"), technology[0]);
};

const setTechnologyInfo = (listItem, technologyInfo) => {
  const activeTechnologyNavItem = document.querySelector(".t-active");

  if (activeTechnologyNavItem) {
    activeTechnologyNavItem.classList.remove("t-active");
  }

  listItem.classList.add("t-active");

  const tImg = document.querySelector(".t-img");

  const setImg = () => {
    return window.innerWidth < 1200
      ? technologyInfo.images.landscape
      : technologyInfo.images.portrait;
  };
  tImg.setAttribute("src", setImg());
  tImg.setAttribute("alt", technologyInfo.name);

  window.addEventListener("resize", () => {
    tImg.setAttribute("src", setImg());
  });

  const tName = document.querySelector(".t-name");
  tName.innerText = technologyInfo.name;

  const tDescription = document.querySelector(".t-description");
  tDescription.innerText = technologyInfo.description;
};
