let categoryBtn;

function test() {
  setTimeout(() => {
    categoryBtn = document.querySelectorAll(".category-item");
    console.log(categoryBtn);

    // Loop after categoryBtn is populated
    for (let i = 0; i < categoryBtn.length; i++) {
      categoryBtn[i].addEventListener("click", (e) => {
        for (let j = 0; j < categoryBtn.length; j++) {
          categoryBtn[j].classList =
            "flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-[312px] h-[105px] border-2 rounded-2xl border=[#0E7A8126] p-6 category-item";
        }
        e.target.classList =
          "flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-[312px] h-[105px] border-2 rounded-full border=[#0E7A8126] p-6 category-item bg-[#0E7A811A]";
      });
    }
  }, 2000);
}

test();
