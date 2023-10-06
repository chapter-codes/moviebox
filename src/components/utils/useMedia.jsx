import {useEffect} from 'react'

export function useMedia(){
const checkScreenSize= window.matchMedia("max-width:680px")

console.log(checkScreenSize)

	useEffect(()=>{
		console.log('im rendering')
		checkScreenSize.addListener('onchange',  ()=>{
			console.log('screen change')
			console.log(window.screen)
		})
	}) 

return (console.log('hey!, useMedia  '))
}