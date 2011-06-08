// PLUGIN: Slideshow

(function (Popcorn) {
  
  /**
   * Webpages popcorn plug-in 
   * Creates an iframe showing a website specified by the user
   * Options parameter will need a start, end, id, target and src.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing 
   * Id is the id that you want assigned to the iframe
   * Target is the id of the document element that the iframe needs to be attached to, 
   * this target element must exist on the DOM
   * Src is the url of the website that you want the iframe to display
   *
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#video')
        .webpage({
          id: "webpages-a", 
          start: 5, // seconds
          end: 15, // seconds
          src: 'http://www.webmademovies.org',
          target: 'webpagediv'
        } )
   *
   */
  Popcorn.plugin( "slideshow" , {
    manifest: {
      about:{
        name: "Popcorn Slideshow Plugin",
        version: "0.1",
        author: "@dcseifried",
        website: "dseifried.wordpress.com"
      },
      options:{
        id     : {elem:'input', type:'text', label:'Id'},
        start  : {elem:'input', type:'text', label:'In'},
        end    : {elem:'input', type:'text', label:'Out'},
        src    : {elem:'input', type:'text', label:'Src'},
        target : 'iframe-container'
      }
    },
    _setup : function( options ) {

      // PURE SHANANAGINS, MAKE ME MAKE THIS WORK
      var content = "<!DOCTYPE html><html><head><script src='http://html5slides.googlecode.com/svn/trunk/slides.js'></script></head><style></style><body ><section class='slides layout-widescreen'>" + options.innerHTML + "</section></body></html>";
      // make an iframe 
      options._iframe  = document.createElement( 'iframe' );
      options._iframe.id = "asdf";
      options._iframe.setAttribute('width', "100%");
      options._iframe.setAttribute('height', "750px");
      alert(content);
      document.getElementById( "slideshow" ) && document.getElementById( "slideshow" ).appendChild(options._iframe);
      options._iframe.contentDocument.open();
      options._iframe.contentDocument.writeln( content );
      options._iframe.contentDocument.close();
      //options._iframe.contentDocument.head.innerHTML = "";

      //options._iframe.src = "asdf.html";
      options._iframe.style.display = 'none';

      // add the hidden iframe to the DOM

      
    },
    /**
     * @member webpage 
     * The start function will be executed when the currentTime 
     * of the video  reaches the start time provided by the 
     * options variable
     */
    start: function(event, options){
      // make the iframe visible
      options._iframe.style.display = 'inline';
    },
    /**
     * @member webpage 
     * The end function will be executed when the currentTime 
     * of the video  reaches the end time provided by the 
     * options variable
     */
    end: function(event, options){
      // make the iframe invisible
      options._iframe.style.display = 'none';
    },
    _teardown: function( options ) {

      document.getElementById( options.target ) && document.getElementById( options.target ).removeChild( options._iframe );
    }
  });
})( Popcorn );
