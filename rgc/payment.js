window.addEventListener('load', function() {
	const urlParams = new URLSearchParams(window.location.search);
	const amount = urlParams.get('amount');
	const comment = urlParams.get('comment');
	
	const encodedComment = encodeURIComponent(comment)
	  .replace(/[^a-zA-Z0-9\s]/g, function (char) { // замена всех других символов на соответствующие коды Unicode
		const code = char.charCodeAt(0).toString(16);
		return '%%' + code.padStart(4, '0');
	  })
	  .replace(/%C0%CE%CF%80|%C0%CE%CF%81|%C0%CE%CF%82|%C0%CE%CF%83|%C0%CE%CF%84|%C0%CE%CF%85|%C0%CE%CF%86|%C0%CE%CF%87|%C0%CE%CF%88|%C0%CE%CF%89|%C0%CE%CF%8A|%C0%CE%CF %C0 %CE %CF %86|%%25/g, '%C3 %C1 %C8 %5E') // замена кириллических букв на соответствующие коды Unicode
	  .replace(/ /g, '%20'); // замена пробелов на %20
	const baseUrl = 'https://oplata.qiwi.com/create?publicKey=XXXXXXXX';
	const updatedUrl = baseUrl + '&amount=' + amount + '&comment=' + encodedComment;
	
	window.location = updatedUrl;
});


