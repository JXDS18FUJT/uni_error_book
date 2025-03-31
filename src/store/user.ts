import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
  actions:{
	  changeName(name:string){
		  this.name = name
	  }
	  
  }
})