//! Selectors
const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector(".coins");

let coins = [];

//! Search  button on click
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Coin not FOUND!",
    });
    return;
  }
  getCoin();
});

//! functions

const getCoin = async () => {
  const options = {
    header: {
      "Content-Type": "application/json",
      "x-access-token":
        "coinranking1cb05dd7ee8310dcacff3473d3cadeff2694a509ccc0d60d",
    },
  };

  try {
    const response = await fetch(
      `https://api.coinranking.com/v2/coins`,
      options
    );

    const data = await response.json();

    //^ filtered data by the written text at input

    const dataName = data.data.coins;
    coins = dataName.filter((a) =>
      a.name.toLowerCase().startsWith(input.value.toLocaleLowerCase())
    );

    printScreen();
  } catch (error) {}
};

const printScreen = () => {
  coins.forEach((b) => {
    ul.innerHTML += `
    <li class="coin">
        <div class="remove-icon">
          <i class="fas fa-window-close"></i>
        </div>
        <h2 class="coin-name" data-name="Cardano">
          <span class="domName">${b.name}</span>
          <sup>${b.symbol}</sup>
        </h2>
        <div class="coin-temp">$</div>
        <figure>
            <img class="coin-icon" src=${b.iconUrl}>
            <figcaption style="color:green">

              <span>${b.change}%</span>
            </figcaption>
        </figure>
    </li>
    `;
  });

  document.querySelectorAll(".fa-window-close").forEach((del) => {
    del.onclick = () => {
      del.closest("li").remove();
    };
  });
};
