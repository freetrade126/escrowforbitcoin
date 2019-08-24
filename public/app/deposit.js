(function(){
	var socket = io(window.location.origin);
	$(document).ready(()=>{
		$.ajax({url: "/api/v1/address/get", success: res=>{
			if(res.status=='ok') {
				
				var address=res.data;
				var amount=res.amount;
				var text='bitcoin:'+address;
				if(amount) text+='?amount='+amount;
				console.log(text)
				$("#qrcode").qrcode({
					// render method: 'canvas', 'image' or 'div'
					render: 'image',
				
					// version range somewhere in 1 .. 40
					minVersion: 1,
					maxVersion: 40,
				
					// error correction level: 'L', 'M', 'Q' or 'H'
					ecLevel: 'M',
				
					// offset in pixel if drawn onto existing canvas
					left: 0,
					top: 0,
				
					// size in pixel
					size: 250,
				
					// code color or image element
					fill: '#000',text: text,radius: 0,quiet: 0,
				
					// modes
					// 0: normal
					// 1: label strip
					// 2: label box
					// 3: image strip
					// 4: image box
					mode: 0,
				
					mSize: 0.1,
					mPosX: 0.5,
					mPosY: 0.5,
				
					label: 'no label',
					fontname: 'sans',
					fontcolor: '#000',
				
					image: null
				});
				$("#address").val(address);
				$("#loading").addClass("d-none")
				$("#step1").removeClass("d-none");
				socket.emit('check',address)
			}
		}});
		
		socket.on('connect', ()=>{

		});
		socket.on('check', data=>{

		});
		socket.on('disconnect', ()=>{

		});
	})
})()