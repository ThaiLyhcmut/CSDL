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

const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete){
  buttonDelete.forEach(item => {
    item.addEventListener("click", () => {
      const isComfirm = confirm("Ban co chac muon xoa ban ghi nay ?")
      if(isComfirm){
        const id = item.getAttribute("item-id")
        const path = item.getAttribute("data-path")
        fetch(`${path}/${id}`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE"
        }).then(res => res.json()).then(data => {
          if(data.code == "success"){
            location.reload()
          }
        })
      }
    })
  })
}