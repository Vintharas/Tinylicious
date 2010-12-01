/**
 * @author vintharas
 * @version 1.0.0
 * 
 * http://www.barbarianmeetscoding.com
 *
 */

var Tinylicious = {
	AddBookmark: function(link, text){
		// Adds a list element to the tinylicious widget
		this.AddListElement('<a href="' + link + '" title="' + text + '" >' + text + '</a></li>');
		$('div#tinylicious ol li.hidden-list-element').show('slow');
		$('div#tinylicious ol li.hidden-list-element').removeClass('hidden-list-element');
	},
	AddListElement: function(elementContent){
		// Adds a bookmark to the tinylicious widget
		$('<li class="hidden-list-element">' + elementContent + '</li>').appendTo('div#tinylicious ol');
	},
	AddLoading: function(){
		$('<li class="loading hidden-list-element">loading...</li>').appendTo('div#tinylicious ol');
		$('div#tinylicious ol li.hidden-list-element').show('slow');
		$('div#tinylicious ol li.hidden-list-element').removeClass('hidden-list-element');
	},
	Baseurl : "http://feeds.delicious.com/v2/json/",
	EndLoading: function(){
		$('div#tinylicious ol li.loading').hide('slow');
		$('div#tinylicious ol li.loading').remove();
	},
	MaxNumberOfBookmarks: 15,
	LoadUserBookmarks : function(userName, numberOfBookmarks){
		// initializations
		this.AddLoading();
		var url = this.Baseurl + userName + '?callback=?';
		var tinylicious = this;
		var getBookmarks = numberOfBookmarks > this.MaxNumberOfBookmarks ? this.MaxNumberOfBookmarks : numberOfBookmarks;
		// get JSON feed and add elements to the list
		$.getJSON(url, function(data){
			// Debugging: 
			// console.log(data);
			if (data === null)
			{
				tinylicious.AddListElement('could not connect to delicious');
				return;
			}
			$.each(data, function(index, element){
				if (index <= getBookmarks) {
					tinylicious.AddBookmark(element.u, element.d);
				}
			});
			tinylicious.EndLoading();
		});
	}
};
