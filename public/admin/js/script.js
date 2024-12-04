const formSelect = document.querySelector("[form-link]")
if (formSelect){
  formSelect.addEventListener("submit", (event) => {
    event.preventDefault();
    const categoryId = formSelect.querySelector('select[name="categoryId"]').value;
    const path = formSelect.getAttribute("data-path")
    window.location.href = `${path}/${categoryId}`
  })
}