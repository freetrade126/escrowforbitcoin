(function(){
	var app={
		MONTHLY: 0,
		ANNUALLY: 1,
		FREE: 0,
		BASIC: 1,
		PLUS: 2,
		currentPlan:0,
		validCoupon: 0,
		render: ()=> {
			/* 
			basic_old, basic_price, basic_saving
			plus_old, plus_price, plus_saving

			*/
			var data=JSON.parse($("#data").html());
			var type=$('#plantype').prop('checked')?app.ANNUALLY:app.MONTHLY;
			if(type==app.MONTHLY) {
				$('#basic_old').html('-');
				$('#basic_price').html(data.plan_basic.monthly.toFixed(2));
				$('#basic_saving').html('-');

				$('#plus_old').html('-');
				$('#plus_price').html(data.plan_plus.monthly.toFixed(2));
				$('#plus_saving').html('-');

				if($("#monthly").hasClass('text-muted')) $("#monthly").removeClass('text-muted');
				if(!$("#monthly").hasClass('text-primary')) $("#monthly").addClass('text-primary');
				if(!$("#annually").hasClass('text-muted')) $("#annually").addClass('text-muted');
				if($("#annually").hasClass('text-primary')) $("#annually").removeClass('text-primary');
			}else{
				$('#basic_old').html("$"+data.plan_basic.monthly.toFixed(2));
				$('#basic_price').html((data.plan_basic.annually/12).toFixed(2));

				$('#plus_old').html("$"+data.plan_plus.monthly.toFixed(2));
				$('#plus_price').html((data.plan_plus.annually/12).toFixed(2));
				$('#plus_saving').html('-');

				if(!$("#monthly").hasClass('text-muted')) $("#monthly").addClass('text-muted');
				if($("#monthly").hasClass('text-primary')) $("#monthly").removeClass('text-primary');
				if($("#annually").hasClass('text-muted')) $("#annually").removeClass('text-muted');
				if(!$("#annually").hasClass('text-primary')) $("#annually").addClass('text-primary');
				
			}
			
			switch(app.currentPlan) {
			case app.FREE:
				$("#plan_free").show();
				$("#plan_normal").hide();
				break;
			case app.BASIC:
				var val=type==app.MONTHLY?data.plan_basic.monthly:data.plan_basic.annually;
				if(app.validCoupon) {
					$("#oldbilling").html("$"+val.toFixed(2));
					$("#billing").html("$"+(val-val*0.2).toFixed(2));
				}else{
					$("#oldbilling").html("");
					$("#billing").html("$"+val.toFixed(2));
				}
				$("#plan_free").hide();
				$("#plan_normal").show();
				break;
			case app.PLUS:
				var val=type==app.MONTHLY?data.plan_plus.monthly:data.plan_plus.annually;
				if(app.validCoupon) {
					$("#oldbilling").html("$"+val.toFixed(2));
					$("#billing").html("$"+(val-val*0.2).toFixed(2));
				}else{
					$("#oldbilling").html("");
					$("#billing").html("$"+val.toFixed(2));
				}
				$("#plan_free").hide();
				$("#plan_normal").show();
				break;
			}
		},
		coupon: function() {
			app.validCoupon=1;
		}
	};
	
	function google_sign(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
	}
	$(document).ready(()=>{
		$('.pricing_item').on('click',function(){
			app.current.removeClass('active');
			app.current=$(this);
			app.currentPlan=app.current.attr('data')*1;
			app.current.addClass('active');
			app.render();
		});
		app.current=$('.pricing_item.active');
		app.currentPlan=app.current.attr('data')*1;
		$('#plantype').on('change',function(){
			app.render();
		});

		$("#coupon").on('change',function(){
			app.coupon(this.value);
			app.render();
		});
	});
})();