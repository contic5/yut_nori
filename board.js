let board=[];

//board.push({x:4,y:4,space:0});
board.push({x:3,y:4,space:1});
board.push({x:2,y:4,space:2});
board.push({x:1,y:4,space:3});
board.push({x:0,y:4,space:4,connections:[4],shortcutspace:0,shortcut:true}); //
board.push({x:0,y:3,space:5});
board.push({x:0,y:2,space:6});
board.push({x:0,y:1,space:7});
board.push({x:0,y:0,space:8,connections:[8],shortcutspace:0,shortcut:true}); //
board.push({x:1,y:0,space:9});
board.push({x:2,y:0,space:10});
board.push({x:3,y:0,space:11});
board.push({x:4,y:0,space:12,connections:[12],shortcutspace:0,shortcut:true}); //
board.push({x:4,y:1,space:13});
board.push({x:4,y:2,space:14});
board.push({x:4,y:3,space:15});
board.push({x:4,y:4,space:16,connections:[16],shortcutspace:0,shortcut:true}); //

board.push({x:1,y:3,space:4,connections:[4,0],shortcutspace:1,shortcut:true});
board.push({x:2,y:2,space:0,connections:[4,8,12,16],shortcutspace:2,shortcut:true});
board.push({x:1,y:1,space:8,connections:[8,0],shortcutspace:1,shortcut:true});
board.push({x:3,y:1,space:12,connections:[12,0],shortcutspace:1,shortcut:true});
board.push({x:3,y:3,space:16,connections:[16,0],shortcutspace:1,shortcut:true});