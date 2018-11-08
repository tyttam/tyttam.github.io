var copy = new Clipboard('.btn-color'); 
copy.on('success', function(e){
    window.setTimeout(function(){e.clearSelection();}, 10);
});
