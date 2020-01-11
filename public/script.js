let cache = localStorage.getItem('fireDayHasInstalled')

if(!cache){
	setTimeout(()=>{
		let install = document.querySelector('.install').style
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

/* Isso é só uma tentativa */
/* let logo = document.querySelector("[alt='www.000webhost.com']")
if(logo){
	logo.style.display = "none"
} */
