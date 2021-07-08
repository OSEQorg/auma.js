window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

/*
  Handles a click on the down button to slide down the playlist.
*/
document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
  var list = document.getElementById('list');

  list.style.height = ( parseInt( document.getElementById('flat-black-player-container').offsetHeight ) - 135 ) + 'px';

  document.getElementById('list-screen').classList.remove('slide-out-top');
  document.getElementById('list-screen').classList.add('slide-in-top');
  document.getElementById('list-screen').style.display = "block";
});

/*
  Handles a click on the up arrow to hide the list screen.
*/
document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
  document.getElementById('list-screen').classList.remove('slide-in-top');
  document.getElementById('list-screen').classList.add('slide-out-top');
  document.getElementById('list-screen').style.display = "none";
});

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  auma.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

document.querySelector('img[data-auma-song-info="cover_art_url"]').style.height = document.querySelector('img[data-auma-song-info="cover_art_url"]').offsetWidth + 'px';

auma.init({

  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [
{

					"url": "./mp3/fanya.mp3",
  
					"time_callbacks": {
						
				0: function(){
        			auma.setDefaultAlbumArt("img/blank3.png");auma.bindNewElements();
      			},
      			
      			8: function(){
        			auma.setDefaultAlbumArt("img/pythagoras.gif");
        			auma.pause()
        			auma.bindNewElements();
        			document.querySelector('div#player-bottom div#control-container div#play-pause-container').style.display = 'none';
        			document.querySelector('.btn-left').style.display = 'inline';
        			document.querySelector('.btn-right').style.display = 'inline';
        			document.querySelector('.btn-right').setAttribute("onclick", "auma.playSongAtIndex(1)");
      			},
      			
      			20: function(){
        			auma.setDefaultAlbumArt("img/Step-0.jpg");auma.bindNewElements();
      			},
      			53: function(){
        			auma.setDefaultAlbumArt("img/Step-1.jpg");auma.bindNewElements();
      			},
      			79: function(){
        			auma.setDefaultAlbumArt("img/Step-2.jpg");auma.bindNewElements();
      			},

      			97: function(){
        			auma.setDefaultAlbumArt("img/Step-3.jpg");auma.bindNewElements();
      			},
      			
      			
      			122: function(){
        			auma.setDefaultAlbumArt("img/Step-4.jpg");auma.bindNewElements();
      			},
      			
      			
      			158: function(){
        			auma.setDefaultAlbumArt("img/Step-5.jpg");auma.bindNewElements();
      			},
      			
      			      			
      			
      			168: function(){
        			auma.setDefaultAlbumArt("img/Step-6.jpg");auma.bindNewElements();
      			},
      			
      			
    		}
				},
				
				{
					"name": "Maghrebi Darija",
					"artist": "Iza",
					"album": "Maroc",
					"url": "./mp3/iza.mp3",
				
					"time_callbacks": {
						
				0: function(){
        			document.querySelector('div#player-bottom div#control-container div#play-pause-container').style.display = 'block';
      			},

}
},
  ]




});
