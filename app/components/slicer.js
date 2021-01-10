import React from 'react'
  /*item ids
      mainhand: 96-101,104,106-109,116-119
      off-hand: 112-114
      hat:128
      helmet:129-131
      chest:132-135
      pants:138,139
      boots:146,147
      
  */

 function itemslicer(id){
    
    //returns the height and row of the id
    var x = (id % 16)*32;
    var y;

    if (id>=96 && id <112){
        y = 5*32;
    }
    else if(id >=112 && id<128){
        y=6*32;
    }
    else if(id>=128 && id < 140){
        y=7*32;
    }
    else if(id>=146 && id <148){
        y=8*32;
    }
    var itemcoords = [x,y]
    return itemcoords;

}
