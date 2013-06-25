// to keep track of content size on iOS
currentSize=0;

// to know when the table is loading		
isLoading=false;	

// for testing purpose.  Remove when using in production
totalLoaded=0;		

// to trigger loading on iOS
overlap = 50;		

// get initial table size for iOS
$.mytable.addEventListener('postlayout', function(){
	initialTableSize = $.mytable.rect.height;
});

function loadData(){
	var newRows=[];

	// for demo purposes, I'm loading 20 rows in a loop
	for (var i=0;i<20;i++){
		var row=Alloy.createController('tablerow',{text:totalLoaded}).getView();
		newRows.push(row);
		totalLoaded++;
		currentSize+=50;
	}
	$.mytable.appendRow(newRows);

	setTimeout(function(){
		// give some time to the previous loop
		// adjust miliseconds according to your data source speed
		isLoading=false;
	},500);
}

// cross-platform event listener for lazy tableview loading
function lazyload(_evt){
	if (OS_IOS){
		if (currentSize - overlap < _evt.contentOffset.y + initialTableSize){
			if (isLoading) return;
			isLoading = true;
			loadData();
		}
	}else{
		if (_evt.firstVisibleItem + _evt.visibleItemCount == _evt.totalItemCount){
			if (isLoading) return;
			isLoading = true;
			loadData();
		}
	}
}

$.index.open();
loadData();
