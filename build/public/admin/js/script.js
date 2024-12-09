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
          }else{
            document.querySelector("body").insertAdjacentHTML(
              "afterbegin",
              `
                <div class="alert alert-danger" role="alert">
                  ${data.msg}
                </div>
              `
            );
            const alertEror = document.querySelector(".alert.alert-danger");
            if (alertEror) {
              setTimeout(() => {
                if (document.body.contains(alertEror)) {
                  document.body.removeChild(alertEror);
                }
              }, 5000);
            }
          }
        })
      }
    })
  })
}

const listButtonPagination = document.querySelectorAll("[button-pagination]")
if(listButtonPagination.length > 0){
  let url = new URL(location.href);
  listButtonPagination.forEach((button) => {
    button.addEventListener("click", (event) => {
      const page = button.getAttribute("button-pagination")
      if(page){
        url.searchParams.set("page", page)
      }else{
        url.searchParams.delete("page")
      }
      location.href = url.href
    })
  })
}


// Thiết lập giá trị mặc định cho input
