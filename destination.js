fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    setDestinationModal(data);
  });

const setDestinationModal = (data) => {
  const subNav = document.querySelector(".sub-nav");

  data.destinations.forEach((currentDestination) => {
    const destination = document.createElement("li");
    destination.classList.add("d-list-item-name");
    destination.setAttribute("data-value", currentDestination.name);
    destination.innerText = currentDestination.name;

    destination.addEventListener("click", () => {
      setDestinationInfo(destination, currentDestination);
    });

    subNav.appendChild(destination);
  });

  setDestinationInfo(
    document.querySelector(".d-list-item-name"),
    data.destinations[0]
  );
};

const setDestinationInfo = (dCtn, destination) => {
  const activeDCtn = document.querySelector(".d-active");

  if (activeDCtn) {
    activeDCtn.classList.remove("d-active");
  }

  dCtn.classList.add("d-active");

  const destImg = document.querySelector(".d-img");
  destImg.setAttribute("src", destination.images.webp);
  destImg.setAttribute("alt", destination.name);

  const destName = document.querySelector(".d-name");
  destName.textContent = destination.name;

  const destDescription = document.querySelector(".d-description");
  destDescription.textContent = destination.description;

  const destDistance = document.querySelector(".d-distance");
  destDistance.textContent = destination.distance;

  const destTravel = document.querySelector(".d-travel");
  destTravel.textContent = destination.travel;
};
