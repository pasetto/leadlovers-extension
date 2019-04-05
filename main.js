!(function(){
	var ___gmail, ___addButton;
	
	function ___GOFaddButton() {
		var $ = __jq;
		if ($("#leadlovers-button").length) {
			return;
		}
		
		var el = ___gmail.dom.toolbar().find("div:nth-child(2)").first();
		if (!el.is(':visible')) {
			return;
		}
		
		var customCss = '';
		if ($('.apj').length) {
			customCss = ' style="margin-left: 12px !important; margin-top: -1px; padding-right: 0;"';
		}
		
		el.after(
			'<div class="G-Ni J-J5-Ji"' + customCss + '>' +
			'<div class="T-I J-J5-Ji T-I-ax7" id="leadlovers-button" role="button" tabindex="0" ' +
			'data-tooltip="Enviar email de orçamento" aria-label="Enviar email de orçamento" style="user-select: none;">' +
			'<div class="asa"><div class="T-I-J3 J-J5-Ji" style="width: 21px; height: 21px;' +
			"background:url(https://app.leadlovers.com/content/images/svg/llv2.svg) no-repeat center; " +
			'background-size: contain;"></div></div></div></div>'
			);
			
			$("#leadlovers-button").click(function() {
				var c = null;
				
				try {
					c = ___gmail.get.displayed_email_data();
					if (!c) {
						c = __gmx.get.email_data(__gmx.get.thread_id());
					}
				} catch(e) {
					c = __gmx.get.email_data(__gmx.get.thread_id());
				}
				
				
				var leadName = prompt("Confirme o nome: (caso cancele o usará o nome já atribuido no leadlovers)", c.people_involved[0][0]);
				var leadMail = prompt("Confirme o email: (caso cancele o envio será cancelado)", c.people_involved[0][1]);
				console.log(leadMail);
				// var s = c.subject || "Reply to email";
				// var n = "";
				// n += "People involved: ";
				// var xx = [];
				// To add all peoples
				
				// for (var i in c.people_involved) {
				//   var pp = c.people_involved[i];
				//   console.log(pp);
				//   xx.push(pp[0] || pp[1]);
				
				//   var txt;
				//   var leadName = prompt("Confirme o nome: (caso cancele o usará o nome já atribuido no leadlovers)", pp[0]);
				//   var leadMail = prompt("Confirme o email: (caso cancele o envio será cancelado)", pp[1]);
				// }
				// n += xx.join(", ");
				// n += "\n\n";
				// n += "https://mail.google.com/mail/u/0/#inbox/" + c.thread_id;
				
				if (leadMail == null || leadMail == "") {
					return false;
				}

				var machineId = 263100;
				var pId = 9797101;

				var sentJson = {
					"id": machineId,
					"pid": pId,
					"list_id": machineId,
					"provider": 'leadlovers',
					"email": leadMail
				}
				
				var params = serialize(sentJson) ;
				if( leadName.length !== 0 )
					sentJson.name = leadName;
				
				var http = new XMLHttpRequest();
				var url = 'https://paginas.rocks/Pages/Index/' + machineId;
				console.log('params', params);
				http.open('POST', url, true);
				
				//Send the proper header information along with the request
				http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				
				http.onreadystatechange = function() {//Call a function when the state changes.
					if(http.readyState == 4 && http.status == 200) {
						console.log('enviado');
					}
				}
				http.send(params);
			});
		}
		function serialize(obj) {
			var str = [];
			for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
		}
		
		function ___GOFmain() {
			if (!("Gmail" in window)) {
				setTimeout(___GOFmain, 10);
				return;
			}
			
			___gmail = new Gmail();
			window.__gmx = ___gmail;
			if (___gmail.get.current_page() === "email") {
				___GOFaddButton();
			}
			___gmail.observe.on("view_thread", function() {
				setTimeout(function() {
					___GOFaddButton();
				}, 5);
			});
		}
		
		___GOFmain();
	}());
	