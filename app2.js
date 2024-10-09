setTimeout(() => {
  let categoryButton = document.querySelectorAll(".category-item");
  // console.log(categoryButton);

  for (let i = 0; i < categoryButton.length; i++) {
    categoryButton[i].addEventListener("click", () => {
      for (let j = 0; j < categoryButton.length; j++) {
        categoryButton[j].classList =
          "flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-auto h-[105px] border-2 rounded-2xl border=[#0E7A8126] p-6 category-item";
      }
      categoryButton[i].classList =
        "flex justify-center items-center inter font-bold text-2xl text-[#131313] gap-4 w-auto h-[105px] border-2 rounded-full border=[#0E7A8126] p-6 category-item bg-[#0E7A811A]";
    });
  }
}, 2000);

// ****************************
let interval; // Declare the interval variable outside the function

function openModalAndStartCountdown(btn) {
  const modal = document.getElementById("my_modal_1");
  const countDownElement = document.getElementById("countDown");
  let count = 3;

  // Clear the previous interval if it exists
  if (interval) {
    clearInterval(interval);
  }

  // Show the modal
  modal.showModal();

  // Start the countdown
  countDownElement.innerText = count; // Initialize the countdown display
  interval = setInterval(() => {
    count--;
    countDownElement.innerText = count;
    if (count === 0) {
      clearInterval(interval);
      modal.close();
    }
  }, 1000);
}
