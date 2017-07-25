/**
 * Created by Administrator on 2017/5/11 0011.
 */
/**
 * Created by Administrator on 2017/5/11 0011.
 */
/**
 * Created by Taoz on 4/15/2015.
 */

var $ROOTPATH$ = '';

var whiteBackground = {
  'backgroundColor': '#ffffff',
  'borderStyle': 'none'
};


function findElementByName(name, options) {
  var target;
  for( var i in options) {
    var op = options[i];
    if( name == op.name){
      target = op.element;
      break;
    }
  }
  return target
}



