// Init number of params
let addedParamCount = 0;

// Get dom element from string
function getElementFromString(string){
	let div = document.createElement('div');
	div.innerHTML = string;
	return div.firstElementChild;
}

// Hide the paramsBox
let paramsBox = document.getElementById('parametersBox');
paramsBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
	document.getElementById('requestJsonBox').style.display = 'none';
	document.getElementById('parametersBox').style.display = 'block';
});

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', function(){
	document.getElementById('parametersBox').style.display = 'none';
	document.getElementById('requestJsonBox').style.display = 'block';
});

// Add more paramBoxes
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
	let params = document.getElementById('params');
	let string = `<div class="form-row">
					<label for="url" class="col-sm-2 col-form-label">${addedParamCount + 2}</label>
					<div class="col-md-4">
						<input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
					</div>
					<div class="col-md-4">
						<input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
					</div>
					<button id="deleteParam" class="btn btn-primary deleteParam">-</button>
				</div>`;
	addedParamCount++;
	// Convert element to dom element
	let paramElement = getElementFromString(string);
	// Add an event listener to remove element
	params.appendChild(paramElement);

	let deleteParam = document.getElementsByClassName('deleteParam');
	for(let item of deleteParam){
		item.addEventListener('click', (e) => {
			e.target.parentElement.remove();
		});
	}	
});

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
	// Show please wait...
	document.getElementById('responsePrism').value = "Please wait...";

	// Fetch all the submit values
	let url = document.getElementById('url').value;
	let requestType = document.querySelector('input[name="requestType"]:checked').value;
	let contentType = document.querySelector('input[name="contentType"]:checked').value;

	console.log(url, requestType, contentType);
	// if user has selected params options
	if(contentType == 'params') {
		data = {};
		for(let i=0; i<addedParamCount+1; i++){
			if(document.getElementById('parameterKey' + (i+1)) != undefined){
			let key = document.getElementById('parameterKey' + (i+1)).value;
			let value = document.getElementById('parameterValue' + (i+1)).value;
			data[key] = value;
		}
	}
		data = JSON.stringify(data);
	}else{
		data = document.getElementById('requestJsonText').value;
		console.log(data);
	}
	if(requestType == 'GET'){ 
		fetch(url, {
			method: 'GET'
		})
		.then(res => res.text())
		.then(text => {
			document.getElementById('responsePrism').innerHTML = text;
			Prism.highlightAll();
		});
	}
	else{ 
		fetch(url, {
			method: 'POST',
			body:data,
			headers:{
				"Content-type":"application/json; charset-UTF-8"
			}
		})
		.then(res => res.text())
		.then(text => {
			document.getElementById('responsePrism').innerHTML = text;
			Prism.highlightAll();
		});
	}
});