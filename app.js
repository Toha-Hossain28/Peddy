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
          class="flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-[312px] h-[105px] border-2 rounded-2xl border=[#0E7A8126] p-6"
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

const allPetURL = "https://openapi.programming-hero.com/api/peddy/pets";

const loadAllPet = async () => {
  const petContainer = document.getElementById("displayDiv");
  const res = await fetch(allPetURL);
  const data = await res.json();
  console.log(data.pets[0]);
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
            <div class="inter font-bold text-[#131313] text-xl mb-2">${element.pet_name}</div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-window-restore"></i>Breed: ${element.breed}
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-calendar-days"></i>Birth: ${element.data_of_birth}
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-mars-and-venus"></i>Gender: ${element.gender}
            </div>
            <div class="flex font-normal text-[#131313B3] text-base mb-2 gap-2 items-center">
              <i class="fa-solid fa-dollar-sign"></i>Price: ${element.price}
            </div>
            <hr class="border-t-2" />
            <div class="mt-4 flex justify-between">
              <button class="border-2 py-2 px-4 rounded-xl text-[#131313B3]" onclick="like('${element.image}')">
                <i class="fa-regular fa-thumbs-up"></i
                ><i class="fa-solid fa-thumbs-up hidden"></i></button
              ><button
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg"
              >
                Adopt</button
              ><button
                class="border-2 py-2 px-4 rounded-xl text-[#0E7A81] font-bold text-lg"
              >
                Details
              </button>
            </div>
          </div>
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
  <img class="rounded-xl w-full" src="${imgUrl}" />
  `;
  likedCol.appendChild(newImg); // Append the image to the liked-col element
};
