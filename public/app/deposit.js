(function(){

	const app={
		step: 0,
		init: ()=>{
			app.call('address/get').then(res=>{
				app.status(res);
				app.startCheck();
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
		startCheck: ()=>{
			let time=+new Date();
			app.call('address/check').then(res=>{
				app.status(res);
				let spent=(+new Date()-time);
				let interval=30000-spent;
				if(interval<10000) interval=10000;
				setTimeout(app.startCheck,interval)
			})
		},
		status: res=>{
			if(res.amount) {
				$(".x-value").html((res.amount/100000000).toFixed(8))
			}
			if(res.tx) {
				$(".x-tx").html(res.tx)
			}
			if(res.status==100) {
				app.step=3;
				$("#loading").addClass("d-none")
				$("#step1").addClass("d-none");
				$("#step2").addClass("d-none");
				$("#step3").removeClass("d-none");
				return;
			}else if(res.tx) {
				if(app.step!=2) {
					app.step=2;
					$("#loading").addClass("d-none")
					$("#step1").addClass("d-none");
					$("#step2").removeClass("d-none");
					$("#step3").addClass("d-none");
				}
				$(".x-confirm").html(res.confirmations+" / 3");
			}else if(app.step==0){
				let text='bitcoin:'+res.address;
				$("#qrcode").qrcode({
					render: 'image',
					ecLevel: 'M',
					size: 250,
					fill: '#000',text: text,radius: 0,quiet: 0,
					mode: 0,
				});
				app.step=1;
				$("#address").val(res.address);
				$("#loading").addClass("d-none")
				$("#step1").removeClass("d-none");
				$("#step2").addClass("d-none");
				$("#step3").addClass("d-none");
			}

		}
		
	};

	$(document).ready(()=>{
		app.init()
	})

})()