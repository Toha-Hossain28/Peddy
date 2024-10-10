const categoryURL = "https://openapi.programming-hero.com/api/peddy/categories";

const loadCategory = async () => {
  const categoryDiv = document.getElementById("category");
  const response = await fetch(categoryURL);
  const data = await response.json();
  // console.log(data.categories);
  let newCategory;
  data.categories.forEach((element) => {
    newCategory = document.createElement("div");
    newCategory.innerHTML = `
    <div
          class="flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-auto  max-h-[105px] border-2 rounded-2xl border=[#0E7A8126] p-6 category-item"
          onclick = "loadSelectedCategory('${element.category}')"
          id="${element.category}"
        >
          <img
            class="w-14 h-14"
            src="${element.category_icon}"
            alt=""
          />
          <p>${element.category}</p>
        </div>
      </div>
    `;
    categoryDiv.append(newCategory);
  });
};

loadCategory();

// *********************************************************************************************************************************************************************************

const petContainer = document.getElementById("displayDiv");

const loader = () => {
  // Show the loader by setting the display to 'block'
  document.querySelector(".loader").style.display = "block";
  petContainer.style.visibility = "hidden";

  // Hide the loader after 2 seconds
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    petContainer.style.visibility = "visible";
  }, 2000);
};

// *********************************************************************************************************************************************************************************

const allPetURL = "https://openapi.programming-hero.com/api/peddy/pets";

const loadAllPet = async (sorted = false) => {
  loader();
  const res = await fetch(allPetURL);
  const data = await res.json();
  // console.log(data.pets);
  if (sorted === true) {
    data.pets.sort((a, b) => {
      if (a.price === null || a.price === undefined) return 1;
      if (b.price === null || b.price === undefined) return -1;
      return b.price - a.price;
    });

    // console.log(pets);
  }
  let newCard;
  data.pets.forEach((element) => {
    newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="border-2 p-5 rounded-xl text-left">
      <img
        class="rounded-xl mb-6 w-[266px] h-[178px]"
        src="${element.image}"
        alt=""
      />
      <div class="inter font-bold text-[#131313] text-xl mb-2">${
        element.pet_name ? element.pet_name : "N/A"
      }
      </div>
      <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
        <i class="fa-solid fa-window-restore"></i>Breed: ${
          element.breed ? element.breed : "N/A"
        }
      </div>
      <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
        <i class="fa-solid fa-calendar-days"></i>Birth: ${
          element.date_of_birth ? element.date_of_birth : "N/A"
        }
      </div>
      <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
        <i class="fa-solid fa-mars-and-venus"></i>Gender: ${
          element.gender ? element.gender : "N/A"
        }
      </div>
      <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
        <i class="fa-solid fa-dollar-sign"></i>Price: ${
          element.price ? `${element.price}$` : "N/A"
        }
      </div>
      <hr class="border-t-2" />
      <div class="mt-4 flex justify-between">
        <button class="border-2 py-2 px-4 rounded-xl text-[#131313B3]" onclick="like('${
          element.image
        }')">
        <i class="fa-regular fa-thumbs-up"></i
        ><i class="fa-solid fa-thumbs-up hidden"></i></button
        ><button
          class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold lg:text-lg text-xs adopt"
        >
        Adopt</button
        ><button
        class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold lg:text-lg text-xs" onclick="loadModal('${
          element.petId
        }')"
        >
        Details
        </button>
        </div>
      </div>
    `;
    petContainer.append(newCard);
  });
  let adoptBtn = document.querySelectorAll(".adopt");
  // console.log(adoptBtn.length);
  for (let i = 0; i < adoptBtn.length; i++) {
    adoptBtn[i].addEventListener("click", () => {
      openModalAndStartCountdown();
      adoptBtn[i].innerText = "Adopted";
    });
  }
};

loadAllPet();

const sort_btn = document.querySelector("#sort_btn");
sort_btn.addEventListener("click", () => {
  petContainer.innerHTML = "";
  loadAllPet(true);
});

const likedCol = document.getElementById("liked-col");
const like = (imgUrl) => {
  let newImg = document.createElement("div");
  newImg.classList.add("row-span-1");
  newImg.innerHTML = `
  <img class="rounded-xl w-full h-full" src="${imgUrl}" />
  `;
  likedCol.appendChild(newImg);
};

const body = document.querySelector("body");
// console.log(body);

const loadModal = async (element) => {
  const details_url =
    `https://openapi.programming-hero.com/api/peddy/pet/` + element;
  const res = await fetch(details_url);
  const details_data = await res.json();
  console.log(details_data.petData);
  // console.log(details_url);
  const modal_div = document.querySelector("#modal");
  modal_div.innerHTML = `
  <dialog id="details_modal" class="modal text-left">
      <div class="modal-box w-11/12 max-w-[700px]">
        <div class="">
          <img
            class="w-full rounded-xl"
            src="${details_data.petData.image}"
            alt=""
            srcset=""
          />
        </div>
        <p class="inter font-bold text-2xl mb-4 mt-6">${
          details_data.petData.pet_name
        }</p>
        <div class="grid grid-cols-2 gap-5 lato">
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-window-restore"></i>Breed: ${
                details_data.petData.breed ? details_data.petData.breed : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Gender: ${
                details_data.petData.gender
                  ? details_data.petData.gender
                  : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Vaccinated Status: ${
                details_data.petData.vaccinated_status
                  ? details_data.petData.vaccinated_status
                  : "N/A"
              }
            </div>
          </div>
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-calendar-days"></i>Birth: ${
                details_data.petData.date_of_birth
                  ? details_data.petData.date_of_birth
                  : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-dollar-sign"></i>Price: ${
                details_data.petData.price
                  ? `${details_data.petData.price}$`
                  : "N/A"
              }
            </div>
          </div>
        </div>
        <hr class="border-t-2" />
        <div class="inter">
          <p class="font-semibold text-base mt-4">Detail Information</p>
          <div class="text-[#131313B3] text-left">
            ${details_data.petData.pet_details}
          </div>
        </div>
        <div class="modal-action w-full">
          <form method="dialog" class="w-full inter">
            <!-- if there is a button, it will close the modal -->
            <button class="btn w-full">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;
  document.querySelector("#details_modal").showModal();
};

const loadSelectedCategory = async (categoryName) => {
  loader();
  const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`;
  const petContainer = document.getElementById("displayDiv");
  petContainer.innerHTML = "";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.length);
  let newCard;
  if (data.data.length > 0) {
    data.data.forEach((element) => {
      newCard = document.createElement("div");
      newCard.innerHTML = `
    <div class="border-2 p-5 rounded-xl text-left">
            <img
              class="rounded-xl mb-6 w-[266px] h-[178px]"
              src="${element.image}"
              alt=""
            />
            <div class="inter font-bold text-[#131313] text-xl mb-2">${
              element.pet_name ? element.pet_name : "N/A"
            }</div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-window-restore"></i>Breed: ${
                element.breed ? element.breed : "N/A"
              }
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-calendar-days"></i>Birth: ${
                element.date_of_birth ? element.date_of_birth : "N/A"
              }
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-mars-and-venus"></i>Gender: ${
                element.gender ? element.gender : "N/A"
              }
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-dollar-sign"></i>Price: ${
                element.price ? `${element.price}$` : "N/A"
              }
            </div>
            <hr class="border-t-2" />
            <div class="mt-4 flex justify-between">
              <button class="border-2 py-2 px-4 rounded-xl text-[#131313B3]" onclick="like('${
                element.image
              }')">
                <i class="fa-regular fa-thumbs-up"></i
                ><i class="fa-solid fa-thumbs-up hidden"></i></button
              ><button
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg adopt"
              >
                Adopt</button
              ><button
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg" onclick="loadModal('${
                  element.petId
                }')"
              >
                Details
              </button>
            </div>
          </div>
          
    `;
      petContainer.append(newCard);
    });
  } else {
    newCard = document.createElement("div");
    newCard.classList.add("col-span-9");
    newCard.innerHTML = `
    <div class="rounded-3xl bg-[#13131308] py-[100px] flex flex-col justify-center items-center">
      <div class="mb-7">
        <img class="w-[155px] h-[145px]"  src="./images/error.webp"/>
      </div>
      <h3 class="inter text-4xl font-bold mb-4">
        No Information Available
      </h3>
      <p class="lato font-normal text-base text-[#131313B3] w-3/4">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
      </p>
    </div>
    `;
    petContainer.append(newCard);
  }
  // Attach the function to your existing button
  adoptBtn = document.querySelectorAll(".adopt");
  // console.log(adoptBtn.length);
  for (let i = 0; i < adoptBtn.length; i++) {
    adoptBtn[i].addEventListener("click", () => {
      openModalAndStartCountdown();
      adoptBtn[i].innerText = "Adopted";
    });
  }
};
