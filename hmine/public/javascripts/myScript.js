function buildHTML(user){
	return `
    <tr class="uk-text-left">
                    <td>${user.id}</td>
                    <td>${user.id}</td>
                    <td>${user.id}</td>
                    <td>${user.id}</td>
                    <td>${user.id}</td>
                    <td>
                      <a href="#" class="uk-icon-link uk-flex-center" uk-icon="trash"></a>
                    </td>
                    <td>
                      <a href="#" class="uk-icon-link" uk-icon="pencil"></a>
                    </td>
                </tr>`
    
}

async function getAllUsers(){
	// empty the table
	var reponse = await fetch(URL, { method:'GET', headers:{ 'Accept':'application/json', 'Content-Type': 'application/json' }});
	if (reponse.ok){
		var data = await reponse.json();
	    data.forEach(user => {
			console.log(user)
			// buildHTML(user)
			document.getElementById('tab').innerHTML += buildHTML(user);
		})
	}
}
	