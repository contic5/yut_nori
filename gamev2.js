function roll()
{
    totalmoves=0;
    firstmove=true;
    for(let i=0;i<paddles.length;i++)
    {
        paddles[i]=Math.floor(Math.random()*2);
        totalmoves+=paddles[i];
    }

    if(totalmoves==0)
    {
        totalmoves=5;
    }
    //totalmoves=4;
    document.getElementById("turninfo").innerHTML=`Player ${turn+1}'s Turn. ${totalmoves} moves left`;
}

function calcshortcutdistance(endindex,curplayer)
{
    let startindex=0;
    if(curplayer.x==4&&curplayer.y==4)
    {
        return 1000;
    }
    for(let i=0;i<board.length;i++)
    {
        if(board[i].x==curplayer.x&&board[i].y==curplayer.y)
        {
            startindex=i;
            break;
        }
    }
    
    let start=board[startindex];
    let end=board[endindex];
    let visited=new Array(board.length);
    
    if(start.shortcut==false)
    {
        console.log("Cannot make shortcut");
        return 1000;
    }
    
    //console.log(start);
    
    let nodes=[{id:board[startindex].id,connections:board[startindex].connections,dis:0}];
    visited[startindex]=1;

    console.log(nodes[0]);
    while(nodes.length>0)
    {
        let currentnode=nodes.shift();
        console.log(currentnode);
        if(currentnode.connections==null)
        {
            continue;
        }
        for(let i=0;i<currentnode.connections.length;i++)
        {
            let nodeindex=currentnode.connections[i];
            if(!visited[nodeindex])
            {
                let curdis=currentnode.dis+1;
                visited[nodeindex]=true;
                console.log(board[nodeindex]);
                
                let nextnode={id:board[nodeindex].id,connections:board[nodeindex].connections,dis:curdis};
                nodes.push(nextnode);
                if(nodeindex==endindex)
                {
                    console.log(`Reached ${endindex} in ${curdis} moves!`);
                    return curdis;
                }
            }
        }
    }
    console.log("There is no path");
    return 1000;
}

function displayboard()
{
    //console.log(board.length);
    //console.log(boardtds.length);
    for(let i=0;i<board.length;i++)
    {
        boardtds[i].innerHTML="";
    }

    for(let j=0;j<players.length;j++)
    {
        for(let k=0;k<players[j].length;k++)
        {
            //console.log(`P${j}${k} ${players[j][k].x} ${players[j][k].y}`);
            let curelem="board"+players[j][k].x+""+players[j][k].y;
            //console.log("curelem:"+curelem);
            document.getElementById(curelem).innerHTML+="P"+(j+1)+""+(k+1)+"<br>";
            //console.log("InnerHTML="+document.getElementById(curelem).innerHTML);
        }
    }
}
function nextturn()
{
    let next=(turn+1)%2;
    firstmove=true;
    //console.log(players[turn].length);
    for(let i=0;i<players[turn].length;i++)
    {
        //console.log(i+","+players[turn][i]);
        for(let j=0;j<players[next].length;j++)
        {
            if(players[turn][i].x==players[next][j].x&&players[turn][i].y==players[next][j].y)
            {
                players[next][j].x=4;
                players[next][j].y=4;
                players[next][j].spaceon=0;

                displayboard();
            }
        }
    }
    turn=(turn+1)%2;
    document.getElementById("turninfo").innerHTML=`Player ${turn+1}'s Turn`;
    roll();
}
function validshortcut(spaceindex)
{
    console.log(Math.abs(players[turn][0].x-board[spaceindex].x)+","+Math.abs(players[turn][0].y-board[spaceindex].y))
    return Math.abs(players[turn][0].x-board[spaceindex].x)==1&&Math.abs(players[turn][0].y-board[spaceindex].y)==1;
}
function move(spaceindex,curtd)
{
    console.log("attempt move: "+firstmove);
    for(let i=0;i<players[0].length;i++)
    {
        //shortcutmove
        /*if(board[spaceindex].shortcut&&board[spaceindex].connections.includes(players[turn][i].spaceon))*/

       //Shortcut Move 
        if(board[spaceindex].shortcut&&firstmove&&calcshortcutdistance(spaceindex,players[turn][i])<=totalmoves)
        {
            let dis=calcshortcutdistance(spaceindex,players[turn][i]);
            console.log(dis);
            players[turn][i].spaceon=board[spaceindex].space;
            players[turn][i].x=board[spaceindex].x;
            players[turn][i].y=board[spaceindex].y;
            displayboard();
            totalmoves-=dis;

            document.getElementById("turninfo").innerHTML=`Player ${turn+1}'s Turn. ${totalmoves} moves left`;

            //firstmove=false;
            if(players[turn][i].spaceon==16)
            {
                console.log(`${players[turn][i]} finished!`);
                totalmoves=0;
                players[turn].splice(i,1);
                i-=1;
            }
            if(totalmoves==0)
            {
                nextturn();
            }
            
            break;
        }
        
        //Regular Move
        if(board[spaceindex].space-players[turn][i].spaceon<=totalmoves&&players[turn][i].spaceon<board[spaceindex].space)
        {
            console.log("move");
            totalmoves-=(board[spaceindex].space-players[turn][i].spaceon);

            players[turn][i].spaceon=board[spaceindex].space;
            players[turn][i].x=board[spaceindex].x;
            players[turn][i].y=board[spaceindex].y;
            displayboard();

            document.getElementById("turninfo").innerHTML=`Player ${turn+1}'s Turn. ${totalmoves} moves left`;

            firstmove=false;
            if(players[turn][i].spaceon==16)
            {
                console.log(`${players[turn][i]} finished!`);
                totalmoves=0;
                players[turn].splice(i,1);
                i-=1;
            }
            if(totalmoves==0)
            {
                nextturn();
            }
            break;
        }
    }
}
function setup()
{
    console.log(board);
    for(let i=0;i<5;i++)
    {
        let newtr=document.createElement("tr");
        for(let j=0;j<5;j++)
        {
            let newtd=document.createElement("td");
            for(let k=0;k<board.length;k++)
            {
                if(board[k].x==j&&board[k].y==i)
                {
                    newtd.innerHTML=board[k].space;
                    newtd.id="board"+j+""+i;
                    if(board[k].shortcut==true)
                    {
                        newtd.classList.add("shortcut");
                    }
                    else
                    {
                        newtd.classList.add("boardspace");
                    }
                    newtd.onclick=function()
                    {
                        move(k,newtd);
                    }
                    boardtds.push(newtd);
                    break;
                }
            }
            newtr.appendChild(newtd);
        }
        boardtable.appendChild(newtr);
    }

    /*
    for(let i=0;i<board.length;i++)
    {
        for(let j=0;j<board.length;j++)
        {
            if(board[i].x+5*board[i].y>board[j].x+5*board[j].y)
            {
                console.log("Swap");
                board[i],board[j]=board[j],board[i];
                boardtds[i],boardtds[j]=boardtds[j],boardtds[i];
            }
        }
    }
    */
}
let boardtable=document.getElementById("boardtable");
let boardtds=[];
setup();

let players=[[{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0}],[{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0},{x:4,y:4,spaceon:0}]]
let curp=null;
let turn=0;
let pieceon=0;
let totalmoves=0;
let firstmove=true;

let paddles=[0,0,0,0];
roll();