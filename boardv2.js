let board=[];

//board.push({x:4,y:4,space:0});

board.push({id:0,x:3,y:4,space:1});
board.push({id:1,x:2,y:4,space:2});
board.push({id:2,x:1,y:4,space:3});
board.push({id:3,x:0,y:4,space:4,connections:[16],shortcut:true}); //
board.push({id:4,x:0,y:3,space:5});
board.push({id:5,x:0,y:2,space:6});
board.push({id:6,x:0,y:1,space:7});
board.push({id:7,x:0,y:0,space:8,connections:[18],shortcut:true}); //
board.push({id:8,x:1,y:0,space:9});
board.push({id:9,x:2,y:0,space:10});
board.push({id:10,x:3,y:0,space:11});
board.push({id:11,x:4,y:0,space:12,connections:[19],shortcut:true}); //
board.push({id:12,x:4,y:1,space:13});
board.push({id:13,x:4,y:2,space:14});
board.push({id:14,x:4,y:3,space:15});
board.push({id:15,x:4,y:4,space:16,connections:[20],shortcut:true}); //

board.push({id:16,x:1,y:3,space:20,connections:[3,17],shortcut:true});
board.push({id:17,x:2,y:2,space:20,connections:[16,18,19,20],shortcut:true});
board.push({id:18,x:1,y:1,space:20,connections:[7,17],shortcut:true});
board.push({id:19,x:3,y:1,space:20,connections:[11,17],shortcut:true});
board.push({id:20,x:3,y:3,space:20,connections:[15,17],shortcut:true});