(function (Vue) {
	const STORAGE_KEY = 'item';
	const localstorage ={
		fetch:function(){

			return JSON.parse(
				localStorage.getItem(STORAGE_KEY)||'[]'
			)
		},
		save:function(items){

			localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
		}
	}

	const items=[

	]
	var vm = new Vue({
		el:'#todoapp',
		data:{
			title: 'cyf',
			items:localstorage.fetch(),
			status:'all',
			currentItem:null,
		},

		computed:{
			filter() {
				switch(this.status){
					case 'active':
						return this.items.filter(function(i){
							return i.completed === false
						})
						break;
					case 'completed':
						return this.items.filter(function(i){
							return i.completed === true
						});
						break;
					default:
						return this.items;
						break;
				}
			},

			remain() {
				const unitems = this.items.filter(function(i){
					return i.completed === false;
				});
				return unitems.length;
			}

		},
		methods:{
			add(e) {
				const content = e.target.value.trim();
				if(!content.length){
					return;
				}
				else{
					const id = this.items.length +1;
					this.items.push(
						{
							id:id,
							content:content,
							completed:false,
						}
					)
				}
				e.target.value = ''

			},
			remove(index) {
				this.items.splice(index,1);

			},
			clearItems() {
				this.items = this.items.filter(function(i){
					return i.completed === false;
				})
			},

		},
		watch: {
			items:{
				deep:true,
				handler:function(newItems,oldItems){
					localstorage.save(newItems)
				}
			}
		},

	})
	window.onhashchange = function(){
		const hash = window.location.hash.substr(2)||'all';
		vm.status = hash;
	}
	window.onhashchange();

})(Vue);
