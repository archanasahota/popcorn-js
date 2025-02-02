// PLUGIN: IDENTICA

(function ( Popcorn ) {
  var scriptLoading = false;

  /**
   * Identica popcorn plug-in
   * Appends a Identica widget to an element on the page.
   * Options parameter will need a start, end, target and source.
   * Optional parameters are height and width.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * Src is the hash tag or identica user to get microblogs
   * Target is the id of the document element that the images are
   * appended to, this target element must exist on the DOM
   * Height is the height of the widget, defaults to 200
   * Width is the width of the widget, defaults to 250
   *
   * @param {Object} options
   *
   * Example:
     var p = Popcorn('#video')
        .identica({
          start:          5,                // seconds, mandatory
          end:            15,               // seconds, mandatory
          src:            '@einfeldt',     // mandatory, also accepts hash tags
          height:         200,              // optional
          width:          250,              // optional
          target:         'identicadiv'      // mandatory
        } )
   *
   */

  Popcorn.plugin( "identica" , {

      manifest: {
        about: {
          name: "Popcorn Identica Plugin",
          version: "0.1",
          author: "Archana Sahota",
          website: "http://archanasahota.com/"
        },
        options:{
          start: {
            elem: "input",
            type: "number",
            label: "In"
          },
          end: {
            elem: "input",
            type: "number",
            label: "Out"
          },
          src: {
            elem: "input",
            type: "text",
            label: "Source"
          },
          target: "identica-container",
          height: {
            elem: "input",
            type: "number",
            label: "Height"
          },
          width: {
            elem: "input",
            type: "number",
            label: "Width"
          }
        }
      },

      _setup: function( options ) {

        if ( !window.TWTR && !scriptLoading ) {
          scriptLoading = true;
        //Popcorn.getScript( "http://widgets.twimg.com/j/2/widget.js" );
	Popcorn.getScript( "http://kentbrewster.com/js/identica-badge-real.js" );
        }

        var target = document.getElementById( options.target );
        // create the div to store the widget
        // setup widget div that is unique per track
        options.container = document.createElement( "div" );
        // use this id to connect it to the widget
        options.container.setAttribute( "id", Popcorn.guid() );
        // display none by default
        options.container.style.display = "none";

        if ( !target && Popcorn.plugin.debug ) {
          throw new Error( "target container doesn't exist" );
        }
         // add the widget's div to the target div
        target && target.appendChild( options.container );

        // setup info for the widget
        var src = options.src || "",
            width = options.width || 250,
            height = options.height || 200,
            profile = /^@/.test( src ),
            hash = /^#/.test( src ),
            widgetOptions = {
              version: 2,
              // use this id to connect it to the div
              id: options.container.getAttribute( "id" ),
              rpp: 30,
              width: width,
              height: height,
              interval: 6000,
              theme: {
                shell: {
                  background: "#ffffff",
                  color: "#000000"
                },
                tweets: {
                  background: "#ffffff",
                  color: "#444444",
                  links: "#1985b5"
                }
              },
              features: {
                loop: true,
                timestamp: true,
                avatars: true,
                hashtags: true,
                toptweets: true,
                live: true,
                scrollbar: false,
                behavior: 'default'
              }
            };

        // create widget
        var isReady = function( that ) {
          if ( window.TWTR ) {
            if ( profile ) {

              widgetOptions.type = "profile";

              new TWTR.Widget( widgetOptions ).render().setUser( src ).start();

            } else if ( hash ) {

              widgetOptions.type = "search";
              widgetOptions.search = src;
              widgetOptions.subject = src;

              new TWTR.Widget( widgetOptions ).render().start();

            }
          } else {
            setTimeout( function() {
              isReady( that );
            }, 1);
          }
        };

        isReady( this );
      },

      /**
       * @member Identica
       * The start function will be executed when the currentTime
       * of the video  reaches the start time provided by the
       * options variable
       */
      start: function( event, options ) {
        options.container.style.display = "inline";
      },

      /**
       * @member Identica
       * The end function will be executed when the currentTime
       * of the video  reaches the end time provided by the
       * options variable
       */
      end: function( event, options ) {
        options.container.style.display = "none";
      },
      _teardown: function( options ) {

        document.getElementById( options.target ) && document.getElementById( options.target ).removeChild( options.container );
      }
    });

})( Popcorn );
