(function(){

	const app={
		init: ()=>{
		},
		call: action=>{
			return new Promise((resolve,reject)=>{
				$.ajax({url: "/api/v1/"+action, success: res=>{
					if(res.status=='ok') {
						resolve(res.data);
					}
				}});
			})
		}
	};

	$(document).ready(()=>{
		app.init()
	})
})()