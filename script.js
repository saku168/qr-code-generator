const form = document.querySelector("#form");
const input = document.querySelector("#text");
const result = document.querySelector("#result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input?.value.trim();
  if (!value || !result) return;

  result.replaceChildren();
  const status = document.createElement("p");
  status.textContent = "Generating QR code…";
  result.append(status);

  const image = document.createElement("img");
  image.alt = "QR code for the entered text";
  image.width = 200;
  image.height = 200;
  image.loading = "lazy";
  image.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;

  image.addEventListener("load", () => {
    status.remove();
    result.append(image);
  }, { once: true });

  image.addEventListener("error", () => {
    status.textContent = "The QR code could not be loaded. Check your internet connection and try again.";
  }, { once: true });
});