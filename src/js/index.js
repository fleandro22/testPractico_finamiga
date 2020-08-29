
const $btn_API          =  document.querySelector('#btn_api');
const $btn_localstorage =  document.querySelector('#btn_localstorage');
const $txt_search    = document.getElementById('txt_search');


$btn_API.addEventListener("click", function( event ) {

	Api();
});

$btn_localstorage.addEventListener("click", function( event ) {

	localStorage();
});

Api();

document.getElementById('localstorage').style.display = "none";


async function Api() {

	const $coverSpin          =  document.querySelector('#cover-spin');
	
	document.getElementById('localstorage').style.display = "none";
	$txt_search.style.display = "block";


	async function getApi(url) {

		const response = await fetch(url);
		const data     = await response.json();

	    return data;
  	}

	const $listContainer = document.getElementById('list');
	


	//Evento que realiza la busqueda del input
  	$txt_search.addEventListener('input', async (event) => {

  		$coverSpin.style.display = "block";
	    event.preventDefault();
	    const textInput = txt_search.value;
	    const valueFound = findNameList(textInput);
	    
	    
	    $listContainer.innerHTML = '';

	    //Renderizar la lista
	    valueFound.forEach((items) => {
	    
			const createHTML   = characterTemplate(items)
			const itemTemplate = Template(createHTML);
			$listContainer.append(itemTemplate);
			$coverSpin.style.display = "none";

  		});


  	})

  	function findNameList(wordToMatch) {
        return listAllCharacters.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex);
        });
    }



  	function characterTemplate(items) {
	    return (
	      `<div class="character">
				<div>
					<img src="${items.image}">
				</div>

				<div class="character-info">
					<h2>${items.name}</h2> 
				</div>

				<div class="character-details">
					
					<span>${items.status}</span>
					<span>${items.species}</span>
					<span>${items.gender}</span>
					<span>${items.origin.name}</span>
				</div>
			</div>
	      </div>`
	    )
	}

	function Template(createHTML) {
	    const html = document.implementation.createHTMLDocument();
	    html.body.innerHTML = createHTML;
	    return html.body.children[0];
  	}

  	$coverSpin.style.display = "block";

	const {results:listAllCharacters} = await getApi('https://rickandmortyapi.com/api/character/');

	//Recorrer respuesta API
	listAllCharacters.forEach((items) => {
	    
		const createHTML   =characterTemplate(items)
		const itemTemplate = Template(createHTML);
		$listContainer.append(itemTemplate);

		$coverSpin.style.display = "none";

  	});


}


function localStorage()
{
	const $listContacts = document.getElementById('list-contacts');
	const $btnAdd       =  document.getElementById('btn-add');
	const $formContacts =  document.querySelector('#form-contacts');
	document.getElementById('localstorage').style.display = "block";
	document.getElementById('list').innerHTML = '';
	const listStorage = sessionStorage.getItem("listStorage");

	if(listStorage)
	{
		document.getElementById('list-contacts').innerHTML = '';
		$listContacts.innerHTML += sessionStorage.getItem("listStorage");

	}

	
	$txt_search.style.display = "none";

	$btnAdd.addEventListener("click", function( event ) {

		const data = new FormData($formContacts);
  		const createHTML   = createTemplateContacts(data);

  		if(listStorage)
		{
			document.getElementById('list-contacts').innerHTML = '';
			$listContacts.innerHTML += listStorage+createHTML;
		}
		else
		{

			$listContacts.innerHTML += createHTML;
		}

		

		sessionStorage.setItem("listStorage", $listContacts.innerHTML);

		
	});

	function createTemplateContacts(items){

		return (
	      `
		
					<li>
						<span>1</span>
						<span>${items.get("name")}</span>
						<span>${items.get("phone")}</span>
						<span>${items.get("email")}</span>
						<button>Editar</button>
					</li>

				`
	    )



	}

}

	