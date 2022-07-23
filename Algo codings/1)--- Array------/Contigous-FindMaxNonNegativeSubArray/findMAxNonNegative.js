module.exports = { 
    //param a : array of integers
    //return a list of integers
	maxset : function(a){
        var maxset = null;
        var maxsum = 0;
        var currsum = 0;
        var start = 0;
        var i;
        for( i = 0; i < a.length; i++ ) {
            a[i] = +a[i];
            if( a[i] > -1 ) {
                currsum += a[i];
               continue;
            }
            
            var end = i;
            if( !maxset || maxsum < currsum ) {
               maxset = a.slice( start, end );
            
                maxsum = currsum;
            }
            
            if( maxsum === currsum ) { 
                if( end-start > maxset.length ) {
                    maxset = a.slice( start, end );
                    maxsum = currsum;
                }
            }
            
            currsum = 0;
            start = end+1;
        }
        
        var end = i;
        //console.log( "hello %d %d %s", maxsum, currsum, maxset );
            if( !maxset || maxsum < currsum ) {
               maxset = a.slice( start, end );
            
                maxsum = currsum;
            }
            
            if( maxsum === currsum ) { 
                if( end-start > maxset.length ) {
                    maxset = a.slice( start, end );
                    maxsum = currsum;
                }
            }
        
        return maxset;
	}
};

