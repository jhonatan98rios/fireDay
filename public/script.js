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
			install.height="98vh"
			localStorage.setItem('fireDayHasInstalled', true)
		})
	}, 500)
}
