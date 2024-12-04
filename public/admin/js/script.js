const formSelect = document.querySelector("[form-link]")
if (formSelect){
  formSelect.addEventListener("submit", (event) => {
    event.preventDefault();
    const categoryId = formSelect.querySelector('select[name="categoryId"]').value;
    const path = formSelect.getAttribute("data-path")
    console.log(path)
    if (categoryId == "all"){
      window.location.href = `${path}`
    }
    else window.location.href = `${path}/${categoryId}`
  })
}