window.addEventListener("load", () => {
  document.querySelectorAll('[data-toggle="show-modal"]').forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelector(e.dataset.target).classList.add("show");
    });
  });
  document.querySelectorAll('[data-toggle="dismiss-modal"]').forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelector(e.dataset.target).classList.remove("show");
    });
  });

  document.querySelectorAll('[type="file"]').forEach((e) => {
    e.addEventListener("change", (e) => {
      const selector = e.target.dataset.target;
      const img = document.querySelector(selector);
      const files = e.target.files;
      if (files && files.length) {
        img.src = URL.createObjectURL(files[0]);
      } else {
        img.src = "src/img/image-placeholder.jpg";
      }
    });
  });
  document.querySelectorAll('[data-toggle="show-picker"]').forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelector(`[data-target="#${e.id}"]`).click();
    });
  });
});
