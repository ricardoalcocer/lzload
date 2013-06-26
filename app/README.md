# Titanium cross-platform TableView lazy loading 


To implement Lazy Loading, you need to listen to the scroll event and keep track of where the TableView is at, and according to its position decide to load more data. It’s a pretty straight-forward approach, the tricky part is to implement it in a way that works on both iOS and Android.

### Android
Android provides three properties on the Scroll event: firstItemVisible (A), visibleItemCount (B) and totalItemCount (C). By applying a simple formula ( A+B=C ) we can know exactly when to trigger the “loadData” function.

### iOS
The iOS Scroll event gives us the contentOffset (A) object which contains the x,y coordinates of the part of the TableView that is currently visible to the user. We add the currentSize (B) variable to keep track of the total size of the TableView. We then add the overlap (C) variable to represent a bottom margin. This margin is used to trigger the loading of more data just as the user reaches the bottom of the TableView. Finally we keep a variable with the initialTableSize (D). With these values we build the formula (B-C < A+D) which will effectively trigger the right moment to load more data.

```
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
```

More info: [Full blog post](http://developer.appcelerator.com/blog/2013/06/quick-tip-cross-platform-tableview-lazy-loading.html)