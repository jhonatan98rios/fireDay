let cache = localStorage.getItem('fireDayHasInstalled')
let install = document.querySelector('.install').style

if(!cache){
	setTimeout(()=>{
		install.display="block"
		install.transform="translateY(0px)"
		document.querySelector("#close").addEventListener('click', ()=>{
			install.display="none"
		})
		document.querySelector("#button").addEventListener('click', ()=>{
			install.height="90vh"
			localStorage.setItem('fireDayHasInstalled', true)
		})
	}, 500)
}

/* document.querySelector('button#closeButton').addEventListener('click', ()=>{
	document.querySelector('.install').style.display="none"
}) */
