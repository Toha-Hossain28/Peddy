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
          class="flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-[312px] h-[105px] border-2 rounded-2xl border=[#0E7A8126] p-6 category-item"
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

// *********************************************************************************************************************************************************************************

const allPetURL = "https://openapi.programming-hero.com/api/peddy/pets";

const loadAllPet = async () => {
  const petContainer = document.getElementById("displayDiv");
  const res = await fetch(allPetURL);
  const data = await res.json();
  // console.log(data.pets[0]);
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
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg"
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
          <dialog id="modal_${element.petId}" class="modal text-left">
      <div class="modal-box w-11/12 max-w-[700px]">
        <div class="">
          <img
            class="w-full rounded-xl"
            src="${element.image}"
            alt=""
            srcset=""
          />
        </div>
        <p class="inter font-bold text-2xl mb-4 mt-6">${element.pet_name}</p>
        <div class="grid grid-cols-2 gap-5 lato">
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-window-restore"></i>Breed: ${
                element.breed ? element.breed : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Gender: ${
                element.gender ? element.gender : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Vaccinated Status: ${
                element.vaccinated_status ? element.vaccinated_status : "N/A"
              }
            </div>
          </div>
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-calendar-days"></i>Birth: ${
                element.date_of_birth ? element.date_of_birth : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-dollar-sign"></i>Price: ${
                element.price ? `${element.price}$` : "N/A"
              }
            </div>
          </div>
        </div>
        <hr class="border-t-2" />
        <div class="inter">
          <p class="font-semibold text-base mt-4">Detail Information</p>
          <div class="text-[#131313B3] text-left">
            ${element.pet_details}
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
    petContainer.append(newCard);
  });
};

loadAllPet();

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

const loadModal = (element) => {
  document.getElementById(`modal_${element}`).showModal();
};

const loadSelectedCategory = async (categoryName) => {
  const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`;
  const petContainer = document.getElementById("displayDiv");
  petContainer.innerHTML = "";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data);
  let newCard;
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
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg"
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
          <dialog id="modal_${element.petId}" class="modal text-left">
      <div class="modal-box w-11/12 max-w-[700px]">
        <div class="">
          <img
            class="w-full rounded-xl"
            src="${element.image}"
            alt=""
            srcset=""
          />
        </div>
        <p class="inter font-bold text-2xl mb-4 mt-6">${element.pet_name}</p>
        <div class="grid grid-cols-2 gap-5 lato">
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-window-restore"></i>Breed: ${
                element.breed ? element.breed : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Gender: ${
                element.gender ? element.gender : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-mars-and-venus"></i>Vaccinated Status: ${
                element.vaccinated_status ? element.vaccinated_status : "N/A"
              }
            </div>
          </div>
          <div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-calendar-days"></i>Birth: ${
                element.date_of_birth ? element.date_of_birth : "N/A"
              }
            </div>
            <div
              class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center"
            >
              <i class="fa-solid fa-dollar-sign"></i>Price: ${
                element.price ? element.price : "N/A"
              } $
            </div>
          </div>
        </div>
        <hr class="border-t-2" />
        <div class="inter">
          <p class="font-semibold text-base mt-4">Detail Information</p>
          <div class="text-[#131313B3] text-left">
            ${element.pet_details}
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
    petContainer.append(newCard);
  });
};
