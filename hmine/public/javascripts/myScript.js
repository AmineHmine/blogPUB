function buildHTML(user){
	return `
    <tr class="uk-text-left">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                      <a id="delete_user" data-user-id="${user.id}" class="uk-icon-link uk-flex-center" uk-icon="trash"></a>
                    </td>
                    <td>
                      <a id="edit_user" data-user-id="${user.id}" data-user-name="${user.username}" data-user-email="${user.email}" data-user-role="${user.role}" class="uk-icon-link" uk-icon="pencil" uk-toggle="target: #modal-example" ></a>
                    </td>
                </tr>`
}

function buildHTMLModal(user){
  return 
  `<input class="uk-input uk-form-width-large uk-margin" type="text" placeholder="username" id="update_username" value="${user.username}">
  <input class="uk-input uk-form-width-large uk-margin" type="text" placeholder="email"  id="update_email" value="${user.email}">
  <input class="uk-input uk-form-width-large uk-margin" type="text" placeholder="role" id="update_role" value="${user.role}">`
}


HTMLElement.prototype.empty = function() {
  var that = this;
  while (that.hasChildNodes()) {
      that.removeChild(that.lastChild);
  }
};

async function getAllUsers(){
	// empty the table
  document.querySelector("#tab").empty()
	var reponse = await fetch("/users", { method:'GET', headers:{ 'Accept':'application/json', 'Content-Type': 'application/json'}});
	if (reponse.ok){
		var data = await reponse.json();
	    data.forEach(user => {
			// console.log(user)
			// buildHTML(user)
			document.getElementById('tab').innerHTML += buildHTML(user);

		})
	}
}


async function deleteUser(id){
	var reponse = await fetch(`/users/${id}`, { method:'DELETE', headers:{ 'Accept':'application/json', 'Content-Type': 'application/json'}});
	if (reponse.ok){
		var data = await reponse.json();
	  console.log("user must be deleted !!")
	}
}

async function updateUser(user){
  console.log("in update user");
  console.log(user)

	var reponse = await fetch(`/users`,{ method:'PUT', headers:{ 'Accept':'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  });
  
	if (reponse.ok){
		var data = await reponse.json();
    console.log(data)
    getAllUsers()
	  console.log("user must be edited !!")
	}
}
async function addUser(user){
  var reponse = await fetch('/users',{ method:'POST', headers:{ 'Accept':'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify(user)
});
if (reponse.ok){
  var data = await reponse.json();
  console.log(data)
  getAllUsers()
  console.log("user must be created !!")
}
}
  




const addEventListenerToNewElements = (selector, event, handler) => {
  document.querySelector('body').addEventListener(event, function(evt) {
          var targetElement = evt.target;
          while (targetElement != null) {
              const element = targetElement.id.split(" ")
              if (element[0] == selector) {
                  handler(element[1], targetElement);
                  return;
              }
              targetElement = targetElement.parentElement;
          }
      },
      true
  );
}

window.addEventListener("DOMContentLoaded", () => {
  getAllUsers();
  addEventListenerToNewElements("delete_user", "click", (_, target) => {
    const userId = target.getAttribute("data-user-id")
    console.log(userId)
    deleteUser(userId);

    getAllUsers();
  })

  addEventListenerToNewElements("edit_user", "click", (_, target) => {
    document.getElementById('modal').style="display: block;"
    console.log("ok display form");
    const userId = target.getAttribute("data-user-id");
    const username = target.getAttribute("data-user-name");
    const useremail = target.getAttribute("data-user-email");
    const userRole = target.getAttribute("data-user-role");
    document.getElementById("update_username").value=username;
    document.getElementById("update_email").value=useremail;
    document.getElementById("update_role").value=userRole;
    
    addEventListenerToNewElements("update_btn","click", (event) => {
      console.log("start update");
      //const userId = target.getAttribute("data-user-id");
      let user = {}
      user.email = document.getElementById("update_email").value
      user.username = document.getElementById("update_username").value;
      user.role = document.getElementById("update_role").value;
      // password
      updateUser(user);
      console.log("end update");
    })
  })


  addEventListenerToNewElements("save_btn", "click", (_, target) => {
    let user = {}
    user.username = document.getElementById('add_username').value;
    user.email = document.getElementById('add_email').value;
    user.password = document.getElementById('add_password').value;
    user.role = document.getElementById('add_role').value;
    
    //console.log(user)
    addUser(user);
  })
})



	