(function(){

	const app={
		address: '',
		init: ()=>{
			app.call('address/get').then(address=>{
				app.address=address;
				let text='bitcoin:'+address;
				if(amount) text+='?amount='+amount;
				$("#qrcode").qrcode({
					render: 'image',
					ecLevel: 'M',
					size: 250,
					fill: '#000',text: text,radius: 0,quiet: 0,
					mode: 0,
				});
				$("#address").val(address);
				$("#loading").addClass("d-none")
				$("#step1").removeClass("d-none");
				app.startCheck()
			})
		},
		call: action=>{
			return new Promise((resolve,reject)=>{
				$.ajax({url: "/api/v1/"+action, success: res=>{
					if(res.status=='ok') {
						resolve(res.data);
					}
				}});
			})
		},
		startCheck=()=>{
			let time=+new Date();
			app.call('address/check/'+app.address).then(res=>{
				

				let spent=(+new Date()-time);
				let interval=60000-spent;
				if(interval<10000) interval=10000;
				setTimeout(app.startCheck,interval)
			})
		}
	};

	$(document).ready(()=>{
		
	})

})()